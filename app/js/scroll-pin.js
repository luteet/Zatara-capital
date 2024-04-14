export default function scrollPin() {

	const blocks = document.querySelectorAll(".investor-protection__block_inner"),
	length = blocks.length;

	let timelineArray = [];

	blocks.forEach((block, index) => {

		if(length != index+1) {

			let start, end;

			if(block.offsetHeight > window.innerHeight) {

				start = `bottom bottom`;
				end = `${block.offsetHeight}px top`;

				blocks[index+1].parentElement.style.setProperty("--height", `-${window.innerHeight}px`);

			} else {

				blocks[index+1].parentElement.style.setProperty("--height", `-${block.offsetHeight+5}px`);
				start = `top top`;
				end = `${block.offsetHeight}px top`;
			}

			const timeline = gsap.timeline({
				scrollTrigger: {
					trigger: block,
					start, end,
					pin: true,
					scrub: true,
				}
			});
	
			timeline.pause();

			timelineArray.push(timeline);
		}

	})

	/* window.addEventListener("resize", () => {

		ScrollTrigger.killAll();

		blocks.forEach((block, index) => {

			if(length != index+1) {
				timelineArray.map(timeline => {
					timeline.kill();
					timeline = gsap.timeline({
						scrollTrigger: {
							trigger: block,
							start: `+${block.offsetHeight - window.innerHeight} top`,
							end: "bottom top",
							pin: true,
							scrub: true,
							markers: true,
						}
					})
				})
			}
	
		})
	}) */

}