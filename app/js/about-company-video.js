export default function aboutCompanyVideo() {
	
	function getCoords(elem) {
		let box = elem.getBoundingClientRect();
	
		return {
			top: box.top + window.scrollY,
			right: box.right + window.scrollX,
			bottom: box.bottom + window.scrollY,
			left: box.left + window.scrollX
		};
	}

	document.querySelectorAll(".about-company__video").forEach(block => {

		const canvas = document.createElement("canvas");
		canvas.width = 1000;
		canvas.height = 1000;
		block.append(canvas);

		const context = canvas.getContext("2d"),
		link = block.querySelector(".about-company__video_link");

		function resize() {

			if(window.innerWidth >= 992) {
				
				const coords = {
					size: block.offsetWidth * 2,
				};

				const linkCoords = {
					x: (getCoords(link).left - getCoords(block).left) * 2,
					y: (getCoords(link).top - getCoords(block).top) * 2,
				}

				context.reset();
				//console.log(coords["size"] * 0.002)
				context.lineWidth = coords["size"] * 0.002;
				//context.fill
				context.moveTo(coords["size"]/2 - link.offsetHeight*1.25, coords["size"]/2 + link.offsetHeight*1.25);
				//context.lineTo(coords["size"], coords["size"]);
				context.lineTo(linkCoords["x"] + link.offsetWidth * 2, linkCoords["y"] + link.offsetHeight * 1.95);

				context.strokeStyle = "#FFF";
				context.stroke();
			}
		}

		resize();

		window.addEventListener("resize", resize)
	})
}