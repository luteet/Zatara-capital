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
}