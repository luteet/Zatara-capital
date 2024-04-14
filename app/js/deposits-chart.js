export default function depositsChart() {
	
	function getCoords(elem) {
		let box = elem.getBoundingClientRect();
	
		return {
			top: box.top + window.scrollY,
			right: box.right + window.scrollX,
			bottom: box.bottom + window.scrollY,
			left: box.left + window.scrollX
		};
	}

	const getOrCreateTooltip = (chart) => {
		let tooltipEl = document.querySelector(`[data-tooltip-for="${chart.canvas.dataset.id}"]`);
	  
		if (!tooltipEl) {
			tooltipEl = document.createElement('div');
			tooltipEl.classList.add("chart-tooltip")
			tooltipEl.setAttribute(`data-tooltip-for`, chart.canvas.dataset.id)
			/* tooltipEl.style.background = 'rgba(0, 0, 0, 0.7)';
			tooltipEl.style.borderRadius = '3px';
			tooltipEl.style.color = 'white'; */
			tooltipEl.style.opacity = 1;
			/* tooltipEl.style.pointerEvents = 'none';
			tooltipEl.style.position = 'absolute';
			tooltipEl.style.transform = 'translate(-50%, 0)';
			tooltipEl.style.transition = 'all .1s ease'; */
		
			/* const table = document.createElement('table');
			table.style.margin = '0px';
		
			tooltipEl.appendChild(table); */
			document.body.appendChild(tooltipEl);
		}
	  
		return tooltipEl;
	};
	  
	const externalTooltipHandler = (context) => {
		// Tooltip Element
		const {chart, tooltip} = context;
		const tooltipEl = getOrCreateTooltip(chart);
		
		// Hide if no tooltip
		if (tooltip.opacity === 0) {
			tooltipEl.style.opacity = 0;
			return;
		}
		
		// Set Text
		if (tooltip.body) {
			//const titleLines = tooltip.title || [];
			const bodyLines = tooltip.body.map(b => b.lines);
			tooltipEl.innerHTML = "";
			
			/* const tableHead = document.createElement('thead');
		
			titleLines.forEach(title => {
				const tr = document.createElement('tr');
				tr.style.borderWidth = 0;
			
				const th = document.createElement('th');
				th.style.borderWidth = 0;
				const text = document.createTextNode(title);
			
				th.appendChild(text);
				tr.appendChild(th);
				tableHead.appendChild(tr);
			}); */
		
			//const tableBody = document.createElement('tbody');
			bodyLines.forEach((body, index) => {

				if(tooltip.dataPoints[0].raw.metavalue) {
					let style = "", after = "";
					if(tooltip.dataPoints[0].raw.mode == "success") style = " success-color";
					if(tooltip.dataPoints[0].raw.mode == "failure") style = " failure-color";
					if(tooltip.dataPoints[0].raw.mode == "failure") style = " failure-color";
					tooltipEl.insertAdjacentHTML("beforeend", `<div class="chart-tooltip__metavalue${style}">${tooltip.dataPoints[0].raw.metavalue}</div>`)
				}

				tooltipEl.insertAdjacentHTML("beforeend", `
				<div class="chart-tooltip__footer">
					${chart.canvas.closest(".deposits__chart").dataset.tooltipFooter}
					<b>${tooltip.dataPoints[0].formattedValue.toLocaleString("ru")} ${tooltip.dataPoints[0].dataset.after}</b>
				</div>`)

				/* const colors = tooltip.labelColors[i];
			
				const span = document.createElement('span');
				span.style.background = colors.backgroundColor;
				span.style.borderColor = colors.borderColor;
				span.style.borderWidth = '2px';
				span.style.marginRight = '10px';
				span.style.height = '10px';
				span.style.width = '10px';
				span.style.display = 'inline-block';
			
				const tr = document.createElement('tr');
				tr.style.backgroundColor = 'inherit';
				tr.style.borderWidth = 0;
			
				const td = document.createElement('td');
				td.style.borderWidth = 0;
			
				const text = document.createTextNode(body);
			
				td.appendChild(span);
				td.appendChild(text);
				tr.appendChild(td);
				tableBody.appendChild(tr); */
			});
		
			/* const tableRoot = tooltipEl.querySelector('table');
		
			// Remove old children
			while (tableRoot.firstChild) {
				tableRoot.firstChild.remove();
			}
		
			// Add new children
			//tableRoot.appendChild(tableHead);
			tableRoot.appendChild(tableBody); */
		}
		
		const {offsetLeft: positionX, offsetTop: positionY} = chart.canvas;
		
		// Display, position, and set styles for font
		tooltipEl.style.opacity = 1;
		tooltipEl.style.left = getCoords(chart.canvas).left + tooltip.caretX + 'px';
		tooltipEl.style.top = getCoords(chart.canvas).top + tooltip.caretY + 'px';
		tooltipEl.style.font = tooltip.options.bodyFont.string;
		tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
	};

	function getGradient(ctx, chartArea, colorStart, colorEnd) {
		const chartWidth = chartArea.right - chartArea.left;
		const chartHeight = chartArea.bottom - chartArea.top;
		let width, height, gradient;
		if (!gradient || width !== chartWidth || height !== chartHeight) {
			width = chartWidth;
			height = chartHeight;
			gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
			gradient.addColorStop(0, colorStart);
			gradient.addColorStop(1, colorEnd);
		}

		return gradient;
	}

	function chartData(dataObject) {
		let data = [];
		
		dataObject["data"].map(dataItem => data.push({
			label: dataItem["name"],
			data: dataItem["data"],
			fill: true,
			borderColor: 'rgba(75, 192, 192, 0)',
			pointBackgroundColor: dataItem["gradient"][1],
			pointRadius: 0,
			pointHoverRadius: 7,
			pointBorderWidth: 7,
			pointBorderColor: "#FFF",
			hoverBorderWidth: 7,
			hidden: dataItem["hidden"],
			after: dataItem["after"] ? dataItem["after"] : "",
			backgroundColor: function(context) {
				const chart = context.chart;
				const {ctx, chartArea} = chart;

				if (!chartArea) {
					// This case happens on initial chart load
					return;
				}

				return getGradient(ctx, chartArea, dataItem["gradient"][0], dataItem["gradient"][1]);
			},
			tension: 0.5,
		}))
		return {
			labels: dataObject["labels"],
			datasets: data,
		}
	}

	let charts = [];

	document.querySelectorAll(".deposits__chart canvas").forEach((canvas, index) => {
		const ctx = canvas.getContext("2d");

		if(dataObj[index]) {
			const config = {
				type: 'line',
				data: chartData(dataObj[index]),
				options: {
					responsive: true,
					parsing: {
						yAxisKey: 'value',
						xAxisKey: 'value'
					},
					interaction: {
						intersect: false,
					},
					animation: false,
					plugins: {
						tooltip: {
							enabled: false,
							position: 'nearest',
							external: externalTooltipHandler
						},
						legend: {
							display: false,
						}
					},
					scales: {
						x: {
							grid: {
								color: localStorage.getItem("zatara-capital-theme") == "light" ? "#EBEBEB" : "#102140",
							},
						},
						y: {
							//display: false,
							grid: {
								color: localStorage.getItem("zatara-capital-theme") == "light" ? "#EBEBEB" : "#102140",
							},
							ticks: {
								// Include a dollar sign in the ticks
								callback: function(value, index, ticks) {
									return '';
								}
							}
						}
					}
				},
			};
	
			charts.push(new Chart(ctx, config));
		}
		
	})

	document.querySelectorAll(".deposits__legends_button").forEach((button,index) => {
		const buttonsLength = button.parentElement.querySelectorAll(".deposits__legends_button").length;
		button.addEventListener("click", () => {
			if(!button.classList.contains("is-active")) {
				button.parentElement.querySelectorAll(".deposits__legends_button").forEach(button => button.classList.remove("is-active"));
				button.classList.add("is-active");

				charts.map(chart => {
					for(let subIndex = 0; subIndex < buttonsLength; subIndex++) {
						if(subIndex == index) {
							chart.setDatasetVisibility(subIndex, true);
						} else {
							chart.setDatasetVisibility(subIndex, false);
						}
					}
					
					chart.update();
				})

			}
		})
	})

	document.querySelectorAll(".deposits__sort_button").forEach((button,index) => {
		button.addEventListener("click", () => {
			if(!button.classList.contains("is-active")) {
				button.closest(".deposits").querySelector(".deposits__chart_block.is-active").classList.remove("is-active");
				button.closest(".deposits").querySelectorAll(".deposits__chart_block")[index].classList.add("is-active");

				button.parentElement.querySelector(".deposits__sort_button.is-active").classList.remove("is-active");
				button.classList.add("is-active");
			}
		})
	})

	document.documentElement.addEventListener("theme-change", () => {
		charts.map(chart => {
			chart.options.scales.y.grid.color = localStorage.getItem("zatara-capital-theme") == "light" ? "#EBEBEB" : "#102140";
			chart.options.scales.x.grid.color = localStorage.getItem("zatara-capital-theme") == "light" ? "#EBEBEB" : "#102140";
			chart.update();
		})
	})

}