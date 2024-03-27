export default function headerOnScroll(header) {
	
	let top = [window.scrollY, false];
		
	function scroll() {
		top[0] = window.scrollY;
		
		if(top[0] >= 300 && top[1] == false) {
		
			top[1] = true;
			header.style.setProperty('--pos', '-100%');
		
			setTimeout(function() {
				header.classList.add('on-scroll');
				document.documentElement.style.setProperty("--height-header", header.offsetHeight + "px");
				header.style.setProperty('--pos', '0%');
			},200);
		
		} else if(top[0] <= 300 && top[1] == true) {
		
			top[1] = false;
			header.style.setProperty('--pos', '-100%');
		
			setTimeout(function() {
				header.style.setProperty('--pos', '0%');
				header.classList.remove('on-scroll');
				document.documentElement.style.setProperty("--height-header", header.offsetHeight + "px");
				
			},200);
		
		}
	}
	
	scroll();
	
	window.addEventListener("scroll", scroll);
	
}