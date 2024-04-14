export default function datepicker() {
	(function () {
		Datepicker.locales.ru = {
			days: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
			daysShort: ["Вск", "Пнд", "Втр", "Срд", "Чтв", "Птн", "Суб"],
			daysMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
			months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
			monthsShort: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
			today: "Сегодня",
			clear: "Очистить",
			format: "dd.mm.yyyy",
			weekStart: 1,
			monthsTitle: 'Месяцы'
		  }
	})();
	
	document.querySelectorAll('.datepicker-input').forEach(datepickerElement => {
		const datepicker = new Datepicker(datepickerElement, {
			autohide: true,
			language: document.documentElement.dataset.lang ? document.documentElement.dataset.lang : "en",
			format: "d MM"
		}); 
	});
}