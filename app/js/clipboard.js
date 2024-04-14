export default function clipboard() {
	document.querySelectorAll(".copy-target").forEach(copyTarget => {
		const clipboard = new ClipboardJS(copyTarget);
	})
}