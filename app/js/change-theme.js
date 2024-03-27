export default function changeTheme(to) {

	const currentTheme = localStorage.getItem("zatara-capital-theme"),
	html = document.querySelector("html");

	if(to == "dark" && currentTheme != "dark") {
		localStorage.setItem("zatara-capital-theme", "dark")
		html.classList.remove("is-active-light-theme");
	} else if(to == "light" && currentTheme != "light") {
		localStorage.setItem("zatara-capital-theme", "light")
		html.classList.add("is-active-light-theme");
	}

}