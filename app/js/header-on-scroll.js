export default function headerOnScroll(header) {
	
	let top = [window.scrollY, false];
		
	function scroll() {
		top[0] = window.scrollY;
		
		if(top[0] >= 300 && top[1] == false) {
		
			top[1] = true;
			header.style.setProperty('--opacity', '0');
		
			setTimeout(function() {
				header.classList.add('on-scroll');
				document.documentElement.style.setProperty("--height-header", header.offsetHeight + "px");
				setTimeout(() => header.style.setProperty('--opacity', '1'),100)
			},200);
		
		} else if(top[0] <= 300 && top[1] == true) {
		
			top[1] = false;
			header.style.setProperty('--opacity', '0');
		
			setTimeout(function() {
				setTimeout(() => header.style.setProperty('--opacity', '1'),100)
				header.classList.remove('on-scroll');
				document.documentElement.style.setProperty("--height-header", header.offsetHeight + "px");
				
			},200);
		
		}
	}
	
	scroll();
	
	window.addEventListener("scroll", scroll);
	
}