export default function accountChart() {

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
			
			tooltipEl.style.opacity = 1;
			
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
			
			const bodyLines = tooltip.body.map(b => b.lines);
			tooltipEl.innerHTML = "";
			
			bodyLines.forEach((body, index) => {

				tooltipEl.insertAdjacentHTML("beforeend", `
				<div class="chart-tooltip__footer">
					${tooltip.dataPoints[0].formattedValue.toLocaleString("ru")}${tooltip.dataPoints[0].dataset.after}
				</div>`)
				
			});
			
		}
		
		tooltipEl.style.opacity = 1;
		tooltipEl.style.left = chart.canvas.getBoundingClientRect().left + tooltip.caretX + 'px';
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
		let data = [
			{
				label: dataObject["data"]["name"],
				data: dataObject["data"]["values"],
				fill: true,
				borderColor: 'rgba(0, 0, 0, 0)',
				pointBackgroundColor: dataObject["data"]["gradient"][1],
				pointRadius: 0,
				pointHoverRadius: 7,
				pointBorderWidth: 7,
				pointBorderColor: "#FFF",
				hoverBorderWidth: 7,
				after: dataObject["data"]["after"] ? dataObject["data"]["after"] : "",

				backgroundColor: function(context) {
					const chart = context.chart;
					const {ctx, chartArea} = chart;

					if (!chartArea) {
						// This case happens on initial chart load
						return;
					}

					return getGradient(ctx, chartArea, dataObject["data"]["gradient"][0], dataObject["data"]["gradient"][1]);
				},
				tension: 0.5,
			}
		];
		
		return {
			labels: dataObject["labels"],
			datasets: data,
		}
	}

	let charts = [];

	document.querySelectorAll(".chart canvas").forEach((canvas, index) => {
		const ctx = canvas.getContext("2d");

		if(dataObj) {
			const config = {
				type: 'line',
				data: chartData(dataObj),
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
							ticks: {
								color: "#66789A",
							}
						},
						y: {
							//display: false,
							grid: {
								color: localStorage.getItem("zatara-capital-theme") == "light" ? "#EBEBEB" : "#102140",
							},
							
							ticks: {
								color: "#66789A",
								// Include a dollar sign in the ticks
								callback: function(value, index, ticks) {
									return `${dataObj["data"]["after"]}${value}`;
								}
							}
						}
					}
				},
			};
	
			charts.push(new Chart(ctx, config));
		}
		
	})

	document.documentElement.addEventListener("theme-change", () => {
		charts.map(chart => {
			chart.options.scales.y.grid.color = localStorage.getItem("zatara-capital-theme") == "light" ? "#EBEBEB" : "#102140";
			chart.options.scales.x.grid.color = localStorage.getItem("zatara-capital-theme") == "light" ? "#EBEBEB" : "#102140";
			chart.update();
		})
	})

}