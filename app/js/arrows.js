export default function schemeArrows(windowSize) {

	const arrowCanvas = document.querySelectorAll('.arrow-canvas');

	let arrowsData = [];

	function drawArrowIcon(x, y, ctx, dir) {
		arrowsData.push({x,y,ctx,dir});
	}

	function drawStartIcon(x, y, ctx) {
		
	}

	function arrowLabel(text, x, y, canvas, dir, addClass=[]) {
		const label = document.createElement("span");
		label.classList.add("arrow-label");
		if(addClass.length) {
			addClass.map(htmlClass => {
				label.classList.add(htmlClass);
			})
		}
		label.style.left = `${x}px`;
		label.style.top = `${y}px`;
		label.textContent = text;
		if(dir == "bottom-to-top") {
			label.style.transform = `translate(-100%, -50%) rotate(-180deg)`;
		} else if(dir == "top-to-bottom") {
			label.style.transform = `translate(100%, -50%)`;
		} else if(dir == "above") {
			label.style.transform = `translate(0%, -100%)`;
		}
		
		
		setTimeout(() => canvas.parentElement.append(label),0)
	}

	function drawArrow(arg) {

		let canvas = arg.canvas,
			arrowItems = arg.arrowItems;

		if (canvas.getContext) {
	
			let width = canvas.offsetWidth,
				height = canvas.offsetHeight;
	
			let ctx = canvas.getContext('2d');;
	
			ctx.canvas.width = canvas.offsetWidth;
			ctx.canvas.height = canvas.offsetHeight;
			/* ctx2.canvas.width = canvas.offsetWidth;
			ctx2.canvas.height = canvas.offsetHeight; */
	
			let lineWidth = 2/* , 
			angleSize = (arg.angleSize) ? arg.angleSize : 55, outerCircleSize = 20, 
			dashArray = (arg.dashArray) ? arg.dashArray : [10, 10],
			lastLine = (arg.lastLine) ? arg.lastLine : 1 */;
	
			//lastLine = lastLine / 100 * canvas.offsetHeight;
	
			ctx.lineWidth = lineWidth;
			ctx.strokeStyle = '#1C2E50';
			ctx.fillStyle = '#1C2E50';
			//ctx2.fillStyle = '#1C2E50';

			document.querySelectorAll(".arrow-label").forEach(label => label.remove())
	
			arrowItems.forEach(arrowItem => {

				arrowsData = [];
	
				ctx.beginPath();
				//ctx2.beginPath();
	
				const arrowItemCoords = {
					x: arrowItem.offsetLeft,
					y: arrowItem.offsetTop,
					width: arrowItem.offsetWidth,
					height: arrowItem.offsetHeight,
					halfWidth: arrowItem.offsetWidth/2,
					halfHeight: arrowItem.offsetHeight/2,
				};
	
				if(arrowItem.dataset.arrowTo) {

					let arrowToArray = arrowItem.dataset.arrowTo.split('; ');
		
					for (let index = 0; index < arrowToArray.length; index++) {

						arrowToArray[index] = arrowToArray[index].substring(1);
						arrowToArray[index] = arrowToArray[index].slice(0, -1);
						arrowToArray[index] = arrowToArray[index].split(', ');

						const wrapper = arrowItem.closest(".arrows-wrapper");
						const arrowTo = wrapper.querySelector(`[data-arrow-id="${arrowToArray[index][0]}"]`);

						const padding = wrapper.classList.contains("arrows-large-padding") && windowSize >= 992 ? 50 : 25,
						largePadding = 50;

						const arrowToCoords = {
							x: arrowTo.offsetLeft,
							y: arrowTo.offsetTop,
							width: arrowTo.offsetWidth,
							height: arrowTo.offsetHeight,
							halfWidth: arrowTo.offsetWidth/2,
							halfHeight: arrowTo.offsetHeight/2,
						};

						if (arrowToArray[index][1] == 'right') {

							if (arrowToArray[index][2] == 'left' && Math.abs(Math.round((arrowItemCoords['y'] + arrowItemCoords['halfHeight']) - (arrowToCoords['y'] + arrowToCoords['halfHeight']))) <= 1) {

								if (arrowToArray[index][3] == "doubleArrows") {
									ctx.moveTo(arrowItemCoords['x'] + 10 + arrowItemCoords['width'], arrowItemCoords['y'] + arrowItemCoords['halfHeight'])
									ctx.lineTo(arrowItemCoords['x'] + 10 + arrowItemCoords['width'], arrowItemCoords['y'] + arrowItemCoords['halfHeight']);
									ctx.lineTo(arrowToCoords['x'] - 10, arrowItemCoords['y'] + arrowItemCoords['halfHeight']);
									drawArrowIcon(arrowToCoords['x'] - 10, arrowToCoords['y'] + arrowToCoords['halfHeight'], ctx, "right")
									drawArrowIcon(arrowItemCoords['x'] + arrowItemCoords['width'] + 10, arrowItemCoords['y'] + arrowItemCoords['halfHeight'], ctx, "left")
								} else {
									ctx.moveTo(arrowItemCoords['x'] + arrowItemCoords['width'], arrowItemCoords['y'] + arrowItemCoords['halfHeight'])
									ctx.lineTo(arrowItemCoords['x'] + arrowItemCoords['width'], arrowItemCoords['y'] + arrowItemCoords['halfHeight']);
									ctx.lineTo(arrowToCoords['x'] - 10, arrowItemCoords['y'] + arrowItemCoords['halfHeight']);
									drawArrowIcon(arrowToCoords['x'] - 10, arrowToCoords['y'] + arrowToCoords['halfHeight'], ctx, "right")
								}

							} else if(arrowToArray[index][2] == 'left' && arrowItemCoords['y'] < arrowToCoords['y']) {

								ctx.moveTo(arrowItemCoords['x'] + arrowItemCoords['width'], arrowItemCoords['y'] + arrowItemCoords['halfHeight'])
								ctx.lineTo(arrowItemCoords['x'] + arrowItemCoords['width'] + largePadding, arrowItemCoords['y'] + arrowItemCoords['halfHeight']);
								ctx.lineTo(arrowItemCoords['x'] + arrowItemCoords['width'] + largePadding, arrowToCoords['y'] + arrowToCoords['halfHeight']);
								ctx.lineTo(arrowToCoords['x'] - 5, arrowToCoords['y'] + arrowToCoords['halfHeight']);
								drawArrowIcon(arrowToCoords['x'] - 5, arrowToCoords['y'] + arrowToCoords['halfHeight'], ctx, "right")

								if(arrowTo.dataset["successLabel"]) {
									arrowLabel(
										arrowTo.dataset["successLabel"], 
										arrowToCoords['x'] - largePadding - 10, 
										arrowToCoords['y'], 
										canvas, "top-to-bottom", ["success-color"]
									)
								}

							} else if (arrowToArray[index][2] == 'right') {

								ctx.moveTo(arrowItemCoords['x'] + arrowItemCoords['width'], arrowItemCoords['y'] + arrowItemCoords['halfHeight'])
								ctx.lineTo(arrowItemCoords['x'] + arrowItemCoords['width'], arrowItemCoords['y'] + arrowItemCoords['halfHeight']);

								if (arrowItemCoords['y'] < arrowToCoords['y']) {
									
									ctx.lineTo(arrowItemCoords['x'] + arrowItemCoords['width'] + padding, arrowItemCoords['y'] + arrowItemCoords['halfHeight']);
									ctx.lineTo(arrowItemCoords['x'] + arrowItemCoords['width'] + padding, arrowToCoords['y'] + arrowToCoords['halfHeight']);

									ctx.lineTo(arrowToCoords['x'] + arrowToCoords['width'], arrowToCoords['y'] + arrowToCoords['halfHeight']);
									
									//drawArrowIcon(arrowToCoords['x'] + arrowToCoords['width'], arrowToCoords['y'] + arrowToCoords['halfHeight'], ctx, "left")
									if(arrowToArray[index][3] == "centerArrow") {
										//ctx.lineTo(arrowToCoords['x'], (arrowToCoords['y'] + arrowToCoords['halfHeight']) / 2);
										//drawStartIcon(arrowItemCoords['x'], arrowItemCoords['y'] + arrowItemCoords['halfHeight'], ctx)
										if(arrowItem.dataset.arrowLabel) {
											arrowLabel(arrowItem.dataset.arrowLabel, 
												arrowItemCoords['x'] + arrowToCoords['width'] + 15, 
												(arrowItemCoords['y'] + arrowItemCoords['halfHeight'] + arrowToCoords['y'] + arrowToCoords['halfHeight']) / 2 - 5, 
												ctx.canvas,
												"top-to-bottom")
										}

										drawArrowIcon(arrowItemCoords['x'] + arrowToCoords['width'] + 25, (arrowItemCoords['y'] + arrowItemCoords['halfHeight'] + arrowToCoords['y'] + arrowToCoords['halfHeight']) / 2, ctx, "bottom-large")
										
									} else if(arrowToArray[index][3] != "noneArrow") {
										drawArrowIcon(arrowToCoords['x'] + arrowToCoords['width'], arrowToCoords['y'] + arrowToCoords['halfHeight'], ctx, "left")
									}

								} else if (arrowItemCoords['y'] > arrowToCoords['y']) {
									ctx.lineTo(arrowItemCoords['x'] + arrowItemCoords['width'] + padding, arrowItemCoords['y'] + arrowItemCoords['halfHeight']);

									ctx.lineTo(arrowItemCoords['x'] + arrowItemCoords['width'] + padding, arrowToCoords['y'] + arrowToCoords['halfHeight']);

									ctx.lineTo(arrowToCoords['x'] + arrowToCoords['width'], arrowToCoords['y'] + arrowToCoords['halfHeight']);
								}
							}
						} else if (arrowToArray[index][1] == 'left') {

							ctx.moveTo(arrowItemCoords['x'], arrowItemCoords['y'] + arrowItemCoords['halfHeight'])
							ctx.lineTo(arrowItemCoords['x'], arrowItemCoords['y'] + arrowItemCoords['halfHeight']);

							if (arrowToArray[index][2] == 'right' && Math.abs(Math.round((arrowItemCoords['y'] + arrowItemCoords['halfHeight']) - (arrowToCoords['y'] + arrowToCoords['halfHeight']))) <= 1) {
								if (arrowToArray[index][3] == "doubleArrows") {
									ctx.moveTo(arrowItemCoords['x'] - 2, arrowItemCoords['y'] + arrowItemCoords['halfHeight'])
									ctx.lineTo(arrowItemCoords['x'] - 2, arrowItemCoords['y'] + arrowItemCoords['halfHeight']);
									ctx.lineTo(arrowToCoords['x'] + 10 + arrowToCoords['width'], arrowItemCoords['y'] + arrowItemCoords['halfHeight']);
									drawArrowIcon(arrowToCoords['x'] - 10, arrowToCoords['y'] + arrowToCoords['halfHeight'], ctx, "left")
									drawArrowIcon(arrowItemCoords['x'] + arrowItemCoords['width'] + 10, arrowItemCoords['y'] + arrowItemCoords['halfHeight'], ctx, "right")
								} else {
									ctx.moveTo(arrowItemCoords['x'] - 2, arrowItemCoords['y'] + arrowItemCoords['halfHeight'])
									ctx.lineTo(arrowItemCoords['x'] - 2, arrowItemCoords['y'] + arrowItemCoords['halfHeight']);
									ctx.lineTo(arrowToCoords['x'] + 10 + arrowToCoords['width'], arrowItemCoords['y'] + arrowItemCoords['halfHeight']);
									drawArrowIcon(arrowToCoords['x'] + 10 + arrowToCoords['width'], arrowToCoords['y'] + arrowToCoords['halfHeight'], ctx, "left")
								}
							} else if (arrowToArray[index][2] == 'right' && arrowItemCoords['x'] > arrowToCoords['x']) {
								
							} else if (arrowToArray[index][2] == 'left') {

								if (arrowItemCoords['y'] < arrowToCoords['y']) {
									ctx.lineTo(arrowItemCoords['x'] - padding, arrowItemCoords['y'] + arrowItemCoords['halfHeight']);
									ctx.lineTo(arrowItemCoords['x'] - padding, arrowToCoords['y'] + arrowToCoords['halfHeight']);
									ctx.lineTo(arrowToCoords['x'], arrowToCoords['y'] + arrowToCoords['halfHeight']);
									
									if(arrowToArray[index][3] == "centerArrow") {
										//drawStartIcon(arrowItemCoords['x'], arrowItemCoords['y'] + arrowItemCoords['halfHeight'], ctx)
										//drawArrowIcon(arrowItemCoords['x'] - 5, arrowItemCoords['y'] + arrowItemCoords['halfHeight'], ctx, "right")
									} else if(arrowToArray[index][3] == "doubleArrows") {
										drawArrowIcon(arrowItemCoords['x'], arrowItemCoords['y'] + arrowItemCoords['halfHeight'], ctx, "right")
									} else if(arrowToArray[index][3] != "noneArrow") {
										drawArrowIcon(arrowToCoords['x'], arrowToCoords['y'] + arrowToCoords['halfHeight'], ctx, "right")
									}

								} else if (arrowItemCoords['y'] > arrowToCoords['y']) {

									ctx.lineTo(arrowItemCoords['x'] - padding, arrowItemCoords['y'] + arrowItemCoords['halfHeight']);
									ctx.lineTo(arrowItemCoords['x'] - padding, arrowToCoords['y'] + arrowToCoords['halfHeight']);
									ctx.lineTo(arrowToCoords['x'], arrowToCoords['y'] + arrowToCoords['halfHeight']);

									if(arrowToArray[index][3] == "centerArrow") {
										//ctx.lineTo(arrowToCoords['x'], (arrowToCoords['y'] + arrowToCoords['halfHeight']) / 2);
										//drawStartIcon(arrowItemCoords['x'], arrowItemCoords['y'] + arrowItemCoords['halfHeight'], ctx)
										if(arrowItem.dataset.arrowLabel) {
											arrowLabel(arrowItem.dataset.arrowLabel, 
												arrowItemCoords['x'] - 35, 
												(arrowItemCoords['y'] + arrowItemCoords['halfHeight'] + arrowToCoords['y'] + arrowToCoords['halfHeight']) / 2 - 5, 
												ctx.canvas,
												"bottom-to-top")
										}

										drawArrowIcon(arrowItemCoords['x'] - padding, (arrowItemCoords['y'] + arrowItemCoords['halfHeight'] + arrowToCoords['y'] + arrowToCoords['halfHeight']) / 2 - 5, ctx, "top-large")
										
									} else {
										drawArrowIcon(arrowToCoords['x'], arrowToCoords['y'] + arrowToCoords['halfHeight'], ctx, "right")
									}

									if (arrowToArray[index][2] != "noneStartPoint") {
										drawStartIcon(arrowItemCoords['x'], arrowItemCoords['y'] + arrowItemCoords['halfHeight'], ctx)
									}
								}

							} else if (arrowToArray[index][2] == 'bottom') {
							}
						} else if (arrowToArray[index][1] == 'bottom') {
							
							if(arrowItem.classList.contains("visible-on-desktop")) {
								if(windowSize >= 992) {
									ctx.moveTo(arrowItemCoords['x'] + arrowItemCoords['halfWidth'], arrowItemCoords['y'] + arrowItemCoords['height'] + 5);
									ctx.lineTo(arrowItemCoords['x'] + arrowItemCoords['halfWidth'], arrowItemCoords['y'] + arrowItemCoords['height'] + 5);

									if (arrowToArray[index][2] == 'top') {
										
										if (arrowItemCoords['x'] + arrowItemCoords['halfWidth'] == arrowToCoords['x'] + arrowToCoords['halfWidth']) {
											ctx.lineTo(arrowItemCoords['x'] + arrowItemCoords['halfWidth'], arrowToCoords['y'] - 5);
											drawArrowIcon(arrowToCoords['x'] + arrowToCoords['halfWidth'], arrowToCoords['y'] - 5, ctx, "bottom")
											if (arrowToArray[index][3] == "doubleArrows") {
												drawArrowIcon(arrowToCoords['x'] + arrowToCoords['halfWidth'], arrowItemCoords['y'] + arrowItemCoords['height'] + 5, ctx, "top")
											} else {
												drawStartIcon(arrowItemCoords['x'] + arrowItemCoords['halfWidth'], arrowItemCoords['y'] + arrowItemCoords['height'], ctx)
											}
										} else if (arrowItemCoords['x'] + arrowItemCoords['halfWidth'] > arrowToCoords['x'] + arrowToCoords['halfWidth']) {

											console.log("kek")

										} else if (arrowItemCoords['x'] + arrowItemCoords['halfWidth'] < arrowToCoords['x'] + arrowToCoords['halfWidth']) {
											let padding = arrowItem.classList.contains('_min-padding') ? 15 : 35;

											ctx.lineTo(arrowItemCoords['x'] + arrowItemCoords['halfWidth'], arrowItemCoords['y'] + arrowItemCoords['height'] + padding);
											
											ctx.lineTo(arrowToCoords['x'] + arrowToCoords['halfWidth'] - 2.5, arrowItemCoords['y'] + arrowItemCoords['height'] + padding + 10);
											
											ctx.lineTo(arrowToCoords['x'] + arrowToCoords['halfWidth'] + 2.5, arrowToCoords['y']);
											drawStartIcon(arrowItemCoords['x'] + arrowItemCoords['halfWidth'], arrowItemCoords['y'] + arrowItemCoords['height'], ctx)
											drawArrowIcon(arrowToCoords['x'] + arrowToCoords['halfWidth'] + 2.5, arrowToCoords['y'], ctx, "bottom")
										}

									}
								}
							} else {

								if(arrowToCoords['width'] < arrowItemCoords["width"]) {
									ctx.moveTo(arrowToCoords['x'] + arrowToCoords['halfWidth'], arrowItemCoords['y'] + arrowItemCoords['height'] + 5);
									ctx.lineTo(arrowToCoords['x'] + arrowToCoords['halfWidth'], arrowItemCoords['y'] + arrowItemCoords['height'] + 5);
	
									if (arrowToArray[index][2] == 'top') {
										ctx.lineTo(arrowToCoords['x'] + arrowToCoords['halfWidth'], arrowToCoords['y'] - 5);
										drawArrowIcon(arrowToCoords['x'] + arrowToCoords['halfWidth'], arrowToCoords['y'] - 5, ctx, "bottom")
										if (arrowToArray[index][3] == "doubleArrows") {
											drawArrowIcon(arrowToCoords['x'] + arrowToCoords['halfWidth'], arrowItemCoords['y'] + arrowItemCoords['height'] + 5, ctx, "top")
										}
									}

								} else {
									ctx.moveTo(arrowItemCoords['x'] + arrowItemCoords['halfWidth'], arrowItemCoords['y'] + arrowItemCoords['height'] + 5);
									ctx.lineTo(arrowItemCoords['x'] + arrowItemCoords['halfWidth'], arrowItemCoords['y'] + arrowItemCoords['height'] + 5);

									if (arrowToArray[index][2] == 'top') {
										
										ctx.lineTo(arrowItemCoords['x'] + arrowItemCoords['halfWidth'], arrowToCoords['y'] - 5);
										drawArrowIcon(arrowItemCoords['x'] + arrowItemCoords['halfWidth'], arrowToCoords['y'] - 5, ctx, "bottom")
										if (arrowToArray[index][3] == "doubleArrows") {
											drawArrowIcon(arrowToCoords['x'] + arrowToCoords['halfWidth'], arrowItemCoords['y'] + arrowItemCoords['height'] + 5, ctx, "top")
										}

									} else if (arrowToArray[index][2] == 'bottom') {
										if(arrowToCoords['x'] < arrowItemCoords["x"]) {
											ctx.moveTo(arrowItemCoords['x'] + arrowItemCoords['halfWidth'] / 2, arrowItemCoords['y'] + arrowItemCoords['height']);
											ctx.lineTo(arrowItemCoords['x'] + arrowItemCoords['halfWidth'] / 2, arrowItemCoords['y'] + arrowItemCoords['height'] + 25);
											ctx.lineTo(arrowToCoords['x'] + arrowToCoords['halfWidth'], arrowItemCoords['y'] + arrowItemCoords['height'] + 25);
											ctx.lineTo(arrowToCoords['x'] + arrowToCoords['halfWidth'], arrowToCoords['y'] + arrowToCoords['height'] + 5);
											drawArrowIcon(arrowToCoords['x'] + arrowToCoords['halfWidth'], arrowToCoords['y'] + arrowToCoords['height'] + 5, ctx, "top")

											//if(arrowItem.dataset.successLabel1)
											if(arrowItem.dataset["successLabel-1"]) {
												arrowLabel(
												arrowItem.dataset["successLabel-1"], arrowToCoords['x'] + arrowToCoords['halfWidth'] + 20, 
												arrowItemCoords['y'] + arrowItemCoords['height'] + 15, 
												canvas, "above", ["success-color", "horizontal-mode"])
											}

											if(arrowItem.dataset["successLabel-2"]) {
												arrowLabel(
												arrowItem.dataset["successLabel-2"], arrowToCoords['x'] + arrowToCoords['halfWidth'] + 20, 
												arrowItemCoords['y'] + arrowItemCoords['height'] + 75, 
												canvas, "above", ["success-color", "horizontal-mode"])
											}
										}
									}
								}
								
							}

						} else if (arrowToArray[index][1] == 'top') {
							ctx.moveTo(arrowItemCoords['x'] + arrowItemCoords['halfWidth'], arrowItemCoords['y'] - 5);
							if (arrowToArray[index][2] == 'bottom') {
								ctx.lineTo(arrowItemCoords['x'] + arrowItemCoords['halfWidth'], arrowToCoords['y'] + arrowToCoords['height'] + 5);
								drawArrowIcon(arrowToCoords['x'] + arrowToCoords['halfWidth'], arrowToCoords['y'] + arrowToCoords['height'] + 5, ctx, "top")
								/* if (arrowToArray[index][3] == "doubleArrows") {
									drawArrowIcon(arrowToCoords['x'] + arrowToCoords['halfWidth'], arrowItemCoords['y'] + arrowItemCoords['height'] + 5, ctx, "top")
								} else {
									drawStartIcon(arrowItemCoords['x'] + arrowItemCoords['halfWidth'], arrowItemCoords['y'] + arrowItemCoords['height'], ctx)
								} */
							}
						}
					}
		
					ctx.stroke();
					ctx.beginPath();
					arrowsData.map(arrow => {
						//ctx.beginPath();
						const {dir,x,y,ctx} = arrow;

						if (dir == "left") {
							ctx.moveTo(x + 5, y - 4);
							ctx.lineTo(x + 5, y - 4);
							ctx.lineTo(x, y);
							ctx.lineTo(x + 5, y + 4);
							ctx.closePath();
						} else if (dir == "right") {
							ctx.moveTo(x - 5, y - 4);
							ctx.lineTo(x - 5, y - 4);
							ctx.lineTo(x, y);
							ctx.lineTo(x - 5, y + 4);
							ctx.closePath();
						} else if (dir == "bottom") {
							ctx.moveTo(x - 4, y - 5);
							ctx.lineTo(x - 4, y - 5);
							ctx.lineTo(x, y);
							ctx.lineTo(x + 4, y - 5);
							ctx.closePath();
						} else if (dir == "top") {
							ctx.moveTo(x - 4, y + 5);
							ctx.lineTo(x - 4, y + 5);
							ctx.lineTo(x, y);
							ctx.lineTo(x + 4, y + 5);
							ctx.closePath();
						} else if (dir == "top-large") {
							ctx.moveTo(x - 5, y + 8);
							ctx.lineTo(x - 5, y + 8);
							ctx.lineTo(x, y);
							ctx.lineTo(x + 5, y + 8);
							ctx.closePath();
						} else if (dir == "bottom-large") {
							
							ctx.moveTo(x - 5, y - 4);
							ctx.lineTo(x - 5, y - 4);
							ctx.lineTo(x, y+4);
							ctx.lineTo(x + 5, y - 4);
							ctx.closePath();
						}
					})
					//ctx.stroke();
					ctx.fill();
				}
			})
		}
	}

	window.addEventListener('load', function () {
		arrowCanvas.forEach(canvas => {

			const arrowItems = canvas.parentElement.querySelectorAll('.arrow-item');

			let width = 0, height = 0;
			function draw() {
				if (canvas.offsetWidth != width || canvas.offsetHeight != height) {
					width = canvas.offsetWidth;
					height = canvas.offsetHeight;
					drawArrow({
						canvas, arrowItems
					});
				}
			}

			setInterval(draw, 100)
		})
	})

	/* document.documentElement.addEventListener("theme-change", () => {
		arrowCanvas.forEach(canvas => {

			const arrowItems = canvas.parentElement.querySelectorAll('.arrow-item'),
			canvas2 = canvas.parentElement.querySelector(".arrow-canvas-2");

			let width = 0, height = 0;
			function draw() {
				if (canvas.offsetWidth != width || canvas.offsetHeight != height) {
					width = canvas.offsetWidth;
					height = canvas.offsetHeight;
					drawArrow({
						canvas, arrowItems, canvas2
					});
				}
			}

			setInterval(draw, 100)
		})
	}) */

	/* function getRadians(degrees) {
		return (Math.PI / 180) * degrees;
	} */

}