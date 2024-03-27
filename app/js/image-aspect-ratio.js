export default function imageAspectRatio() {
	const imageAspectRatio = document.querySelectorAll('.image-aspect-ratio, figure img');
	imageAspectRatio.forEach(imageAspectRatio => {
		if(imageAspectRatio.getAttribute('width') && imageAspectRatio.getAttribute('height'))
			imageAspectRatio.style.setProperty('--aspect-ratio', `${imageAspectRatio.getAttribute("width")}/${imageAspectRatio.getAttribute("height")}`);
		
	})
}