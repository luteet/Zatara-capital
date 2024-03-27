export default function dropDown() {

	const dropDown = document.querySelectorAll('.drop-down');
	const mainWrapper = document.querySelector(".wrapper");
	
	const getDeviceType = () => {
	
		const ua = navigator.userAgent;
		if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
			return "tablet";
		}
	
		if (
			/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
			ua
			)
		) {
			return "mobile";
		}
		return "desktop";
	
	};
	
	/* function getCoords(elem) {
		let box = elem.getBoundingClientRect();
	
		return {
			top: box.top + window.scrollY,
			right: box.right + window.scrollX,
			bottom: box.bottom + window.scrollY,
			left: box.left + window.scrollX
		};
	} */
	

	let dropDownArray = [], deviceType = getDeviceType();

	dropDown.forEach(dropDown => {
		const target = dropDown.querySelector('.drop-down__target'),
			  block = dropDown.querySelector('.drop-down__block');

		dropDownArray.push({wrapper: dropDown, target, block});
		document.body.append(block);
	})

	function activeDropDown(target, block, wrapper, targetType) {
		if(!target.classList.contains('is-animating')) {
			target.classList.add('is-animating');
		
			block.style.maxWidth = wrapper.offsetWidth + "px";
			let heightDropDownList = block.offsetHeight, widthDropDownList = block.offsetWidth, 
			dropDownCoords = {y: wrapper.getBoundingClientRect().top + window.scrollY, x: wrapper.getBoundingClientRect().left + window.scrollX};

			if(!block.classList.contains('is-active') && !target.closest('.drop-down.is-active')) {

				Array.from(dropDownArray).forEach(dropDownElement => {
					const target = dropDownElement["target"],
						  block = dropDownElement["block"],
						  wrapper = dropDownElement["wrapper"];
			
					if(wrapper.classList.contains('is-active')) {
						block.classList.remove("fade-in");
						block.classList.add("fade-out");
						wrapper.classList.remove("is-active");
			
						setTimeout(() => {
							block.style.removeProperty("left");
							block.style.removeProperty("top");
							block.style.removeProperty("transform");
							block.classList.remove("fade-out");
							target.classList.remove('is-animating');
						},300)
					}
			
				})

				block.style.display = "none";

				if(dropDownCoords.x >= widthDropDownList && dropDownCoords.x < (window.innerWidth - widthDropDownList)) {

					if(block.classList.contains("on-right-mode")) {
						block.style.left = (dropDownCoords.x + target.offsetWidth) + "px";
						block.style.transform = "translate3d(-100%,0,0)";
					} else {
						block.style.left = (dropDownCoords.x + target.offsetWidth / 2) + "px";
						block.style.transform = "translate3d(-50%,0,0)";
					}

				} else if(dropDownCoords.x + 15 > window.innerWidth - widthDropDownList) {
					
					block.style.left = (dropDownCoords.x - widthDropDownList + target.offsetWidth) + "px";
					block.style.transform = "translate3d(0,0,0)";

					
				} else if(dropDownCoords.x <= widthDropDownList) {

					block.style.left = dropDownCoords.x + "px";
					block.style.transform = "translate3d(0,0,0)";

				}
				
				if(target.getBoundingClientRect().bottom + heightDropDownList >= window.innerHeight) {
					
					block.style.top = (dropDownCoords.y - heightDropDownList) + "px";
					block.classList.remove("on-bottom");
					block.classList.add("on-top");
					
				} else if(target.getBoundingClientRect().bottom + heightDropDownList < mainWrapper.offsetHeight) {
					
					block.style.top = (dropDownCoords.y + target.offsetHeight) + "px";
					block.classList.remove("on-top");
					block.classList.add("on-bottom");

				}

				block.style.removeProperty("display");

				wrapper.classList.add("is-active");
				block.classList.add("fade-in");

				target.classList.remove('is-animating');

			} else if(targetType == "click") {
				
				block.classList.remove("fade-in");
				block.classList.add("fade-out");
				wrapper.classList.remove("is-active");

				setTimeout(() => {
					if(!wrapper.classList.contains("is-active")) {
						block.style.removeProperty("left");
						block.style.removeProperty("top");
						block.style.removeProperty("transform");
						block.classList.remove("fade-out");
						target.classList.remove('is-animating');
					}
				},300)

			}

		}
	}

	Array.from(dropDownArray).forEach(dropDownElement => {

		const target = dropDownElement["target"],
			  block = dropDownElement["block"],
			  wrapper = dropDownElement["wrapper"];

		target.addEventListener('click', function () {
			activeDropDown(target, block, wrapper, "click")
		})

		if(wrapper.classList.contains("hover-mode")) {
			target.addEventListener('mouseenter', function () {

				if(deviceType == "desktop")
				activeDropDown(target, block, wrapper, "hover")
				
			})

			target.addEventListener('mouseleave', function (event) {

				if(!event.toElement.closest(".drop-down__block") && deviceType == "desktop") {
					block.classList.remove("fade-in");
					block.classList.add("fade-out");
					wrapper.classList.remove("is-active");

					setTimeout(() => {
						if(!wrapper.classList.contains("is-active")) {
							block.style.removeProperty("left");
							block.style.removeProperty("top");
							block.style.removeProperty("transform");
							block.classList.remove("fade-out");
							target.classList.remove('is-animating');
						}
					},300)
				}
				//activeDropDown(target, block, wrapper, "hover")
				
			})

			block.addEventListener('mouseleave', function (event) {

				if(!event.toElement.closest(".drop-down__target") && block.classList.contains("fade-in") && deviceType == "desktop") {
					
					block.classList.remove("fade-in");
					block.classList.add("fade-out");
					wrapper.classList.remove("is-active");

					setTimeout(() => {
						if(!wrapper.classList.contains("is-active")) {
							block.style.removeProperty("left");
							block.style.removeProperty("top");
							block.style.removeProperty("transform");
							block.classList.remove("fade-out");
							target.classList.remove('is-animating');
						}
						
					},300)
				}
				//activeDropDown(target, block, wrapper, "hover")
				
			})
		}

	})

	window.addEventListener('resize', function () {

		deviceType = getDeviceType();

		Array.from(dropDownArray).forEach(dropDownElement => {

			const target = dropDownElement["target"],
				  block = dropDownElement["block"],
				  wrapper = dropDownElement["wrapper"];
				  
			if(block.classList.contains('is-active')) {

				let heightDropDownList = list.offsetHeight, 
					widthDropDownList = list.offsetWidth, 
					dropDownCoords = {y: wrapper.getBoundingClientRect().top + window.scrollY, x: wrapper.getBoundingClientRect().left + window.scrollX};

				if(dropDownCoords.x >= widthDropDownList && dropDownCoords.x < (window.innerWidth - widthDropDownList)) {
	
					block.style.left = (dropDownCoords.x + target.offsetWidth / 2) + "px";
					block.style.transform = "translate3d(-50%,0,0)";

				} else if(dropDownCoords.x + 15 > window.innerWidth - widthDropDownList) {
					
					block.style.left = (dropDownCoords.x - widthDropDownList + target.offsetWidth) + "px";
					block.style.transform = "translate3d(0,0,0)";

					
				} else if(dropDownCoords.x <= widthDropDownList) {

					block.style.left = dropDownCoords.x + "px";
					block.style.transform = "translate3d(0,0,0)";

				}
				
				if(target.getBoundingClientRect().bottom + heightDropDownList >= window.innerHeight) {
					
					block.style.top = (dropDownCoords.y - heightDropDownList - 9) + "px";
					
				} else if(target.getBoundingClientRect().bottom + heightDropDownList < mainWrapper.offsetHeight) {
					
					block.style.top = (dropDownCoords.y + target.offsetHeight + 9) + "px";

				}
			}
	
		})
		
	})

	document.body.addEventListener('click', function(event) {
		if(!event.target.closest('.drop-down')) {

			Array.from(dropDownArray).forEach(dropDownElement => {

				const target = dropDownElement["target"],
					  block = dropDownElement["block"],
					  wrapper = dropDownElement["wrapper"];
		
				if(wrapper.classList.contains('is-active')) {
					block.classList.remove("fade-in");
					block.classList.add("fade-out");
					wrapper.classList.remove("is-active");
		
					setTimeout(() => {
						block.style.removeProperty("left");
						block.style.removeProperty("top");
						block.style.removeProperty("transform");
						block.classList.remove("fade-out");
						target.classList.remove('is-animating');
					},300)
				}
		
			})

		}
	})

}
