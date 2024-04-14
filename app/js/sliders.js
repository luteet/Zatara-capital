export default function sliders() {

	document.querySelectorAll('.stocks__slider').forEach(sliderElement => {
	
		const slider = new Splide(sliderElement, {
	
			perPage: 1,
			gap: 10,
			mediaQuery: "min",

			padding: {
				right: "1.875rem"
			},

			arrows: false,
			pagination: false,
	
			breakpoints: {
				992: {
					destroy: true
				},
	
				768: {
					perPage: 2,
				},

				360: {
					gap: 20,
					padding: {
						right: "2.8125rem"
					},
				},
			}
	
		});
	
		slider.mount();
	
	})

	document.querySelectorAll('.our-advantages__slider').forEach(sliderElement => {
	
		const slider = new Splide(sliderElement, {
	
			perPage: 2,
			arrows: false,
			pagination: false,
			speed: 700,
			//easing: "ease",
			gap: "1.25rem",
	
			breakpoints: {
				992: {
					//easing: "linear",
					speed: 500,
					perPage: 1,
					padding: {
						right: "2.5rem"
					}
				},
	
				550: {
					// params
				}
			}
	
		});
	
		slider.mount();
	
	})

}