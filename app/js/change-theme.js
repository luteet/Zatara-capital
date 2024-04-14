export default function changeTheme(to,event) {

	const currentTheme = localStorage.getItem("zatara-capital-theme"),
	html = document.querySelector("html");

	if(to == "dark" && currentTheme != "dark") {
		localStorage.setItem("zatara-capital-theme", "dark")
		localStorage.setItem("zatara-capatial-theme-stroke", "#FFF")
		html.classList.remove("is-active-light-theme");
		html.dispatchEvent(event);
	} else if(to == "light" && currentTheme != "light") {
		localStorage.setItem("zatara-capital-theme", "light")
		localStorage.setItem("zatara-capatial-theme-stroke", "#121212")
		html.classList.add("is-active-light-theme");
		html.dispatchEvent(event);
	}

}