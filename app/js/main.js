import changeTheme from "./change-theme.js";
import dropDown from "./drop-down.js";
import headerOnScroll from "./header-on-scroll.js";
import imageAspectRatio from "./image-aspect-ratio.js";
import sliders from "./sliders.js";
import masonry from "./simple-masonry.js";
import aboutCompanyVideo from "./about-company-video.js";
import scrollPin from "./scroll-pin.js";
import schemeArrows from "./arrows.js";
import datepicker from "./datepicker.js";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({
	ignoreMobileResize: true
});

const 
	body = document.querySelector('body'),
	html = document.querySelector('html'),
	menu = document.querySelectorAll('.header__burger, .header__nav, body'),
	header = document.querySelector('.header');


const themeChangeEvent = new Event("theme-change");


// =-=-=-=-=-=-=-=-=-=- <image-aspect-ratio> -=-=-=-=-=-=-=-=-=-=-

imageAspectRatio();

// =-=-=-=-=-=-=-=-=-=- </image-aspect-ratio> -=-=-=-=-=-=-=-=-=-=-


// =-=-=-=-=-=-=-=-=-=- <drop-down> -=-=-=-=-=-=-=-=-=-=-

dropDown()

// =-=-=-=-=-=-=-=-=-=- </drop-down> -=-=-=-=-=-=-=-=-=-=-


// =-=-=-=-=-=-=-=-=-=-=-=- <click-events> -=-=-=-=-=-=-=-=-=-=-=-=

let tabsTimeout;

body.addEventListener('click', function (event) {

	function $(elem) {
		return event.target.closest(elem)
	}


	// =-=-=-=-=-=-=-=-=-=-=-=- <menu-in-header> -=-=-=-=-=-=-=-=-=-=-=-=
	
	if ($('.header__burger')) {
	
		menu.forEach(element => {
			element.classList.toggle('is-mobile-menu-active')
		})
	
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </menu-in-header> -=-=-=-=-=-=-=-=-=-=-=-=

	
	
	// =-=-=-=-=-=-=-=-=-=-=-=- <header-theme-change> -=-=-=-=-=-=-=-=-=-=-=-=
	
	const headerThemeTarget = $(".header__theme_target")
	if(headerThemeTarget) {
	
		changeTheme(headerThemeTarget.dataset.changeThemeTo, themeChangeEvent);
	
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </header-theme-change> -=-=-=-=-=-=-=-=-=-=-=-=



	// =-=-=-=-=-=-=-=-=-=-=-=- <header-nav> -=-=-=-=-=-=-=-=-=-=-=-=
	
	const headerNavListItem = $(".header__nav_list > li")
	if(!headerNavListItem) {
		document.querySelectorAll(".header__nav_list > li.is-hover").forEach(listItem => listItem.classList.remove("is-hover"))
	}

	if($(".header__nav_list > li > div a")) {
		menu.forEach(element => {
			element.classList.remove('is-mobile-menu-active')
		})
	}

	const headerNavLink = $(".header__nav_list > ul > li > a");
	if(headerNavLink) {

		if(headerNavLink.closest("li").querySelector("div")) {
			if(!accountAsideNavBlockLink.classList.contains("is-active") && accountAsideNavBlockLink.classList.contains("is-current")) {
				event.preventDefault();
			}
		}
	
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </header-nav> -=-=-=-=-=-=-=-=-=-=-=-=


	// =-=-=-=-=-=-=-=-=-=-=-=- <tabs> -=-=-=-=-=-=-=-=-=-=-=-=
	
	const tabsNavLink = $(".tabs-nav__link")
	if(tabsNavLink) {
	
		if(tabsNavLink.getAttribute("href").indexOf("#") == 0) {
			event.preventDefault();

			if(tabsNavLink.getAttribute("href") !== "#" && !tabsNavLink.classList.contains("is-active")) {

				const wrapper = tabsNavLink.closest('.tabs'),
				container = wrapper.querySelector(".tabs-container"),
				activeLink = wrapper.querySelector(".tabs-nav__link.is-active"),
				activeBlock = wrapper.querySelector(".tabs-block.is-active"),
				targetBlock = wrapper.querySelector(tabsNavLink.getAttribute("href"));

				if(targetBlock) {

					container.style.minHeight = container.scrollHeight + 'px';
					activeBlock.classList.add("fade-out");
					activeBlock.classList.remove("fade-in");
					activeLink.classList.remove("is-active");

					if(tabsTimeout) clearTimeout(tabsTimeout)

					tabsTimeout = setTimeout(() => {
						activeBlock.classList.remove("is-active");
						activeBlock.classList.remove("fade-out");
						targetBlock.classList.add("is-active");
						setTimeout(() => {
							targetBlock.classList.add("fade-in");
							tabsNavLink.classList.add("is-active");
							setTimeout(() => {
								container.style.removeProperty("min-height");
							},300)
						},0)
					},300)
				}

			}

		}
	
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </tabs> -=-=-=-=-=-=-=-=-=-=-=-=


	// =-=-=-=-=-=-=-=-=-=-=-=- <documents-view-all> -=-=-=-=-=-=-=-=-=-=-=-=
	
	const documentsViewAll = $(".documents__view_all")
	if(documentsViewAll) {
	
		const list = documentsViewAll.closest("section").querySelector(".documents__list");
		if(list) {
			list.classList.add("view-all");
		}
	
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </documents-view-all> -=-=-=-=-=-=-=-=-=-=-=-=


	// =-=-=-=-=-=-=-=-=-=-=-=- <risk-managment> -=-=-=-=-=-=-=-=-=-=-=-=
	
	const ristManagmentItemTarget = $(".risk-managment__item_target")
	if(ristManagmentItemTarget) {
	
		ristManagmentItemTarget.parentElement.classList.toggle("is-active");
	
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </risk-managment> -=-=-=-=-=-=-=-=-=-=-=-=


	// =-=-=-=-=-=-=-=-=-=-=-=- <holidays> -=-=-=-=-=-=-=-=-=-=-=-=
	
	const holidaysItemTarget = $(".holidays-item__target")
	if(holidaysItemTarget) {
	
		const currentItem = holidaysItemTarget.parentElement,
		activeItem = currentItem.parentElement.querySelectorAll(".is-active");

		if(currentItem.classList.contains("is-active")) {
			activeItem.forEach(activeItem => {
				activeItem.classList.remove("is-active")
			})
		} else {
			activeItem.forEach(activeItem => {
				activeItem.classList.remove("is-active");;
			})

			currentItem.classList.add("is-active");
		}

	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </holidays> -=-=-=-=-=-=-=-=-=-=-=-=



	// =-=-=-=-=-=-=-=-=-=-=-=- <FAQ> -=-=-=-=-=-=-=-=-=-=-=-=
	
	const faqBlockItemTarget = $(".faq-block-item__target")
	if(faqBlockItemTarget) {
	
		const currentItem = faqBlockItemTarget.parentElement,
		activeItem = currentItem.closest(".faq__inner").querySelectorAll(".is-active");

		if(currentItem.classList.contains("is-active")) {
			activeItem.forEach(activeItem => {
				activeItem.classList.remove("is-active")
			})
		} else {
			activeItem.forEach(activeItem => {
				activeItem.classList.remove("is-active");;
			})

			currentItem.classList.add("is-active");
		}

	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </FAQ> -=-=-=-=-=-=-=-=-=-=-=-=


	// =-=-=-=-=-=-=-=-=-=-=-=- <toggle-visible-password> -=-=-=-=-=-=-=-=-=-=-=-=
	
	const toggleVisiblePassword = $(".toggle-visible-password")
	if(toggleVisiblePassword) {

		event.preventDefault()

		const parent = toggleVisiblePassword.parentElement,
		input = parent.querySelector("input");

		toggleVisiblePassword.classList.toggle("is-visible");

		if(toggleVisiblePassword.classList.contains("is-visible")) {
			input.type = "text";
		} else {
			input.type = "password";
		}
	
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </toggle-visible-password> -=-=-=-=-=-=-=-=-=-=-=-=

})

// =-=-=-=-=-=-=-=-=-=-=-=- </click-events> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <resize> -=-=-=-=-=-=-=-=-=-=-=-=

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


let windowSize = 0, deviceType;

function resize() {

	html.style.setProperty("--height-header", header.offsetHeight + "px");
	html.style.setProperty("--vh", window.innerHeight * 0.01 + "px");
	if(windowSize != window.innerWidth) {
		html.style.setProperty("--svh", window.innerHeight * 0.01 + "px");
	}

	document.querySelectorAll(".mobile-app__advantages li").forEach(item => item.style.setProperty("--height", `${item.offsetHeight}px`));
	
	windowSize = window.innerWidth;
	deviceType = getDeviceType();
	
}

resize();

window.addEventListener('resize', resize)

// =-=-=-=-=-=-=-=-=-=-=-=- </resize> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <hover-events> -=-=-=-=-=-=-=-=-=-=-=-=

document.querySelectorAll(".header__nav_list > li > a").forEach(link => {
	link.addEventListener("mouseenter", (event) => {
		if(deviceType == "desktop") {
			link.closest("li").classList.add("is-hover");
		}
	})

	link.closest("li").addEventListener("mouseleave", (event) => {
		if(deviceType == "desktop") {
			link.closest("li").classList.remove("is-hover");
		}
	})

	link.addEventListener("click", (event) => {
		if(link.closest("li").querySelector("div")) {
			if(!link.closest("li").classList.contains("is-hover")) event.preventDefault();
			link.closest("li").classList.add("is-hover");
		}
	})
})

// =-=-=-=-=-=-=-=-=-=-=-=- </hover-events> -=-=-=-=-=-=-=-=-=-=-=-=


// =-=-=-=-=-=-=-=-=-=-=-=- <on-start> -=-=-=-=-=-=-=-=-=-=-=-=

document.addEventListener("DOMContentLoaded", () => {
	setTimeout(() => {
		document.body.classList.add("is-init");
	},200)
})

// =-=-=-=-=-=-=-=-=-=-=-=- </on-start> -=-=-=-=-=-=-=-=-=-=-=-=


// =-=-=-=-=-=-=-=-=-=-=-=- <header-on-scroll> -=-=-=-=-=-=-=-=-=-=-=-=

headerOnScroll(header)

// =-=-=-=-=-=-=-=-=-=-=-=- </header-on-scroll> -=-=-=-=-=-=-=-=-=-=-=-=


// =-=-=-=-=-=-=-=-=-=-=-=- <slider> -=-=-=-=-=-=-=-=-=-=-=-=

sliders();

// =-=-=-=-=-=-=-=-=-=-=-=- </slider> -=-=-=-=-=-=-=-=-=-=-=-=


// =-=-=-=-=-=-=-=-=-=-=-=- <grid> -=-=-=-=-=-=-=-=-=-=-=-=

masonry({
	column: 2,
	responsive: [{
	  breakpoint: 1024, 
	  column: 2
	}, {
	  breakpoint: 550,
	  column: 1
	}]
});

// =-=-=-=-=-=-=-=-=-=-=-=- </grid> -=-=-=-=-=-=-=-=-=-=-=-=


// =-=-=-=-=-=-=-=-=-=-=-=- <datepicker> -=-=-=-=-=-=-=-=-=-=-=-=

datepicker();

// =-=-=-=-=-=-=-=-=-=-=-=- </datepicker> -=-=-=-=-=-=-=-=-=-=-=-=


aboutCompanyVideo();

scrollPin()

schemeArrows(windowSize);

document.querySelectorAll(".center-scroll-position").forEach(inner => {
	setTimeout(() => {
		inner.querySelectorAll(".simplebar-content-wrapper").forEach(wrapper => {
			wrapper.scrollLeft = (wrapper.scrollWidth - wrapper.offsetWidth) / 2;
		})
	},0)
})


// =-=-=-=-=-=-=-=-=-=-=-=- <animation> -=-=-=-=-=-=-=-=-=-=-=-=

function getCoords(elem) {
	let box = elem.getBoundingClientRect();

	return {
		top: box.top + window.scrollY,
		right: box.right + window.scrollX,
		bottom: box.bottom + window.scrollY,
		left: box.left + window.scrollX
	};
}

let url = new URL(window.location);
if (url.searchParams.get("target")) {
	window.scrollTo({
		left: 0,
		top: getCoords(document.querySelector(`#${url.searchParams.get("target")}`)).top,
		behavior: "smooth"
	})
	
	history.pushState("", "", "");

}

AOS.init({
	disable: "mobile",
	once: true,
});

document.querySelectorAll(".why-we__list").forEach(element => {

	const cb = function(entries) {
		entries.forEach(entry => {
			if(entry.isIntersecting) {
				
				element.classList.add("set-animate")
				
			} else {

				element.classList.remove("set-animate")
				
			}
		});
	}

	const io = new IntersectionObserver(cb);
	io.disconnect(element);
	io.observe(element);

})

// =-=-=-=-=-=-=-=-=-=-=-=- </animation> -=-=-=-=-=-=-=-=-=-=-=-=

