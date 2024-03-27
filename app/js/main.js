import changeTheme from "./change-theme.js";
import dropDown from "./drop-down.js";
import headerOnScroll from "./header-on-scroll.js";
import imageAspectRatio from "./image-aspect-ratio.js";
import sliders from "./sliders.js";
import masonry from "./simple-masonry.js";
import aboutCompanyVideo from "./about-company-video.js";

const 
	body = document.querySelector('body'),
	html = document.querySelector('html'),
	menu = document.querySelectorAll('.header__burger, .header__nav, body'),
	header = document.querySelector('.header');


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
	
		changeTheme(headerThemeTarget.dataset.changeThemeTo);
	
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </header-theme-change> -=-=-=-=-=-=-=-=-=-=-=-=



	// =-=-=-=-=-=-=-=-=-=-=-=- <header-nav> -=-=-=-=-=-=-=-=-=-=-=-=
	
	const headerNavListItem = $(".header__nav_list > li")
	if(!headerNavListItem) {
	
		document.querySelectorAll(".header__nav_list > li.is-hover").forEach(listItem => listItem.classList.remove("is-hover"))
	
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
		if(!link.closest("li").classList.contains("is-hover")) event.preventDefault();
		link.closest("li").classList.add("is-hover");
	})
})

// =-=-=-=-=-=-=-=-=-=-=-=- </hover-events> -=-=-=-=-=-=-=-=-=-=-=-=


// =-=-=-=-=-=-=-=-=-=-=-=- <on-start> -=-=-=-=-=-=-=-=-=-=-=-=

document.addEventListener("DOMContentLoaded", () => {
	setTimeout(() => {
		document.body.classList.add("is-init");
	},500)
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


aboutCompanyVideo();


// =-=-=-=-=-=-=-=-=-=-=-=- <animation> -=-=-=-=-=-=-=-=-=-=-=-=

/* AOS.init({
	disable: "mobile",
}); */

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

