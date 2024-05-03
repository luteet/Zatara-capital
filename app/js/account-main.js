import accountChart from "./account-chart.js";
import changeTheme from "./change-theme.js";
import clipboard from "./clipboard.js";
import customSelect from "./custom-select.js";
import datepicker from "./datepicker.js";
import depositsChart from "./deposits-chart.js";
import dropDown from "./drop-down.js";
import imageAspectRatio from "./image-aspect-ratio.js";

const 
	body = document.querySelector('body'),
	html = document.querySelector('html');

function getCoords(elem) {
	let box = elem.getBoundingClientRect();

	return {
		top: box.top + window.scrollY,
		right: box.right + window.scrollX,
		bottom: box.bottom + window.scrollY,
		left: box.left + window.scrollX
	};
}

const themeChangeEvent = new Event("theme-change");

const accountHeaderSearch = document.querySelector(".account-header__search"),
searchPopup = document.querySelector(".search-popup");

//changeTheme(headerThemeTarget.dataset.changeThemeTo, themeChangeEvent);


// =-=-=-=-=-=-=-=-=-=- <image-aspect-ratio> -=-=-=-=-=-=-=-=-=-=-

imageAspectRatio();

// =-=-=-=-=-=-=-=-=-=- </image-aspect-ratio> -=-=-=-=-=-=-=-=-=-=-


// =-=-=-=-=-=-=-=-=-=- <drop-down> -=-=-=-=-=-=-=-=-=-=-

dropDown()

// =-=-=-=-=-=-=-=-=-=- </drop-down> -=-=-=-=-=-=-=-=-=-=-


// =-=-=-=-=-=-=-=-=-=-=-=- <click-events> -=-=-=-=-=-=-=-=-=-=-=-=

let asideTimeout, tabsTimeout;
body.addEventListener('click', function (event) {

	function $(elem) {
		return event.target.closest(elem)
	}

	// =-=-=-=-=-=-=-=-=-=-=-=- <nav> -=-=-=-=-=-=-=-=-=-=-=-=
	
	const accountAsideNavBlockLink = $(".account-aside__nav_block > ul > li > a");
	if(accountAsideNavBlockLink) {

		if(accountAsideNavBlockLink.closest("li").querySelector("div")) {
			if(!accountAsideNavBlockLink.classList.contains("is-active") && accountAsideNavBlockLink.classList.contains("is-current")) {
				event.preventDefault();
			}
	
			if(!accountAsideNavBlockLink.classList.contains("is-active")) {
				event.preventDefault();
				document.querySelectorAll(".account-aside__nav_block > ul > li > a.is-active").forEach(link => link.classList.remove("is-active"));
				accountAsideNavBlockLink.classList.add("is-active");
			}
		}
	
	} else if(!$(".account-aside__nav")) {
		document.querySelectorAll(".account-aside__nav_block > ul > li > a.is-active").forEach(link => link.classList.remove("is-active"));
	}

	const mobileNavTarget = $(".mobile-nav__target");
	if(mobileNavTarget) {
		mobileNavTarget.parentElement.classList.toggle("is-active");
		if(mobileNavTarget.parentElement.classList.contains("is-active")) {
			window.scrollTo({
				left: 0,
				top: getCoords(mobileNavTarget.parentElement).top - 10,
				behavior: "smooth",
			})
		}
	} else if(!$(".mobile-nav")) document.querySelectorAll(".mobile-nav.is-active").forEach(nav => nav.classList.remove("is-active"));

	const mobileNavBlockLink = $(".mobile-nav__item > ul > li > a");
	if(mobileNavBlockLink) {
	
		if(mobileNavBlockLink.closest("li").querySelector("div")) {
			if(!mobileNavBlockLink.classList.contains("is-active") && mobileNavBlockLink.classList.contains("is-current")) {
				event.preventDefault();
			}

			if(!mobileNavBlockLink.classList.contains("is-active")) {
				event.preventDefault();
				document.querySelectorAll(".mobile-nav__item > ul > li > a.is-active").forEach(link => link.classList.remove("is-active"));
				mobileNavBlockLink.classList.add("is-active");
			}
		}
	
	} else if(!$(".mobile-nav__item")) {
		document.querySelectorAll(".mobile-nav__item > ul > li > a.is-active").forEach(link => link.classList.remove("is-active"));
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </nav> -=-=-=-=-=-=-=-=-=-=-=-=


	// =-=-=-=-=-=-=-=-=-=-=-=- <account-header-search> -=-=-=-=-=-=-=-=-=-=-=-=
	
	const accountHeaderSearchOpen = $(".account-header__search_open")
	if(accountHeaderSearchOpen) {
	
		accountHeaderSearchOpen.closest(".account-header__search").classList.add("is-active");
	
	} else if(!$(".account-header__search") && !$(".search-popup")) document.querySelectorAll(".account-header__search").forEach(search => search.classList.remove("is-active"));
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </account-header-search> -=-=-=-=-=-=-=-=-=-=-=-=


	// =-=-=-=-=-=-=-=-=-=-=-=- <aside> -=-=-=-=-=-=-=-=-=-=-=-=
	
	const accountAsideCollapse = $(".account-aside__collapse")
	if(accountAsideCollapse) {

		clearTimeout(asideTimeout);
	
		accountAsideCollapse.closest(".account-wrapper").classList.add("is-animating");
		document.body.classList.toggle("active-min-mode");

		if(document.body.classList.contains("active-min-mode")) {
			localStorage.setItem("zatara-capital-account-min-aside", true);
		} else {
			localStorage.setItem("zatara-capital-account-min-aside", false);
		}

		asideTimeout = setTimeout(() => {
			accountAsideCollapse.closest(".account-wrapper").classList.remove("is-animating");
		},500)
	
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </aside> -=-=-=-=-=-=-=-=-=-=-=-=


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


	// =-=-=-=-=-=-=-=-=-=-=-=- <header-theme-change> -=-=-=-=-=-=-=-=-=-=-=-=
	
	const accountThemeTarget = $(".account-theme__target")
	if(accountThemeTarget) {
	
		changeTheme(accountThemeTarget.dataset.changeThemeTo, themeChangeEvent);
	
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </header-theme-change> -=-=-=-=-=-=-=-=-=-=-=-=


	// =-=-=-=-=-=-=-=-=-=-=-=- <tabs> -=-=-=-=-=-=-=-=-=-=-=-=
	
	const tabsNavLink = $(".account-tabs__link")
	if(tabsNavLink) {
	
		if(tabsNavLink.getAttribute("href").indexOf("#") == 0) {
			event.preventDefault();

			if(tabsNavLink.getAttribute("href") !== "#" && !tabsNavLink.classList.contains("is-active")) {

				const wrapper = tabsNavLink.closest('.account-tabs-wrapper'),
				container = wrapper.querySelector(".account-tabs-container"),
				activeLink = wrapper.querySelector(".account-tabs__link.is-active"),
				activeBlock = wrapper.querySelector(".account-tabs-block.is-active"),
				targetBlock = wrapper.querySelector(tabsNavLink.getAttribute("href"));

				if(targetBlock) {

					container.style.minHeight = container.scrollHeight + 'px';
					activeBlock.classList.add("fade-out");
					activeBlock.classList.remove("fade-in");
					activeLink && activeLink.classList.remove("is-active");

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


	// =-=-=-=-=-=-=-=-=-=-=-=- <search-popup> -=-=-=-=-=-=-=-=-=-=-=-=
	
	if(searchPopup.classList.contains("is-active")) {
		if(!$(".search-popup") && !$(".account-header__search")) {
	
			searchPopup.classList.remove("is-active")
		
		}
		if($(".search-popup__close")) {
	
			searchPopup.classList.remove("is-active")
			document.querySelectorAll(".account-header__search").forEach(search => search.classList.remove("is-active"));
		
		}
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </search-popup> -=-=-=-=-=-=-=-=-=-=-=-=

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
const formItems = document.querySelectorAll(".form-item");

accountHeaderSearch.querySelector("input").addEventListener("focus", () => {
	searchPopup.classList.add("is-active");
})

function resize() {

	//html.style.setProperty("--height-header", header.offsetHeight + "px");
	html.style.setProperty("--vh", window.innerHeight * 0.01 + "px");
	if(windowSize != window.innerWidth) {
		html.style.setProperty("--svh", window.innerHeight * 0.01 + "px");
	}

	formItems.forEach(item => {
		const input = item.querySelector(".input");
		if(input) {
			if(input.nextElementSibling) input.style.setProperty("--padding-right", input.nextElementSibling.offsetWidth + "px");
		}

	})
	
	windowSize = window.innerWidth;
	deviceType = getDeviceType();

	searchPopup.style.setProperty("--x", getCoords(accountHeaderSearch).left + "px")
	searchPopup.style.setProperty("--y", getCoords(accountHeaderSearch).top + accountHeaderSearch.offsetHeight + "px")
	searchPopup.style.setProperty("--max-width", accountHeaderSearch.offsetWidth + "px")
	
}

resize();

window.addEventListener('resize', resize)

// =-=-=-=-=-=-=-=-=-=-=-=- </resize> -=-=-=-=-=-=-=-=-=-=-=-=


// =-=-=-=-=-=-=-=-=-=-=-=- <on-start> -=-=-=-=-=-=-=-=-=-=-=-=

document.addEventListener("DOMContentLoaded", () => {
	setTimeout(() => {
		document.body.classList.add("is-init");
	},400)
})

// =-=-=-=-=-=-=-=-=-=-=-=- </on-start> -=-=-=-=-=-=-=-=-=-=-=-=

document.querySelectorAll(".center-scroll-position").forEach(inner => {
	setTimeout(() => {
		inner.querySelectorAll(".simplebar-content-wrapper").forEach(wrapper => {
			wrapper.scrollLeft = (wrapper.scrollWidth - wrapper.offsetWidth) / 2;
		})
	},0)
})


// =-=-=-=-=-=-=-=-=-=-=-=- <charts> -=-=-=-=-=-=-=-=-=-=-=-=

depositsChart();
accountChart();

// =-=-=-=-=-=-=-=-=-=-=-=- </charts> -=-=-=-=-=-=-=-=-=-=-=-=


// =-=-=-=-=-=-=-=-=-=-=-=- <custom-select> -=-=-=-=-=-=-=-=-=-=-=-=

customSelect();

// =-=-=-=-=-=-=-=-=-=-=-=- </custom-select> -=-=-=-=-=-=-=-=-=-=-=-=


// =-=-=-=-=-=-=-=-=-=-=-=- <clipboard> -=-=-=-=-=-=-=-=-=-=-=-=

clipboard();

// =-=-=-=-=-=-=-=-=-=-=-=- </clipboard> -=-=-=-=-=-=-=-=-=-=-=-=


// =-=-=-=-=-=-=-=-=-=-=-=- <datepicker> -=-=-=-=-=-=-=-=-=-=-=-=

datepicker();

// =-=-=-=-=-=-=-=-=-=-=-=- </datepicker> -=-=-=-=-=-=-=-=-=-=-=-=

document.querySelectorAll(".form-file").forEach(formFile => {
	formFile.querySelector("input").addEventListener("change", (event) => {
		formFile.querySelector("span").textContent = event["target"]["files"][0]["name"];
	})
})
