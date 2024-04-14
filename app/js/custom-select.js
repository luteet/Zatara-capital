export default function customSelect() {
	document.querySelectorAll(".custom-select").forEach(customSelect => {
		new SlimSelect({
			select: customSelect,
			settings: {
				showSearch: false,
			}
		})
	})
}