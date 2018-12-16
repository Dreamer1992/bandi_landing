// const jquery = require("./common/jquery");

$(function () {
	$('.team-slider').slick({
		dots: true,
		infinite: true,
		slidesToShow: 4,
		slidesToScroll: 2
		// responsive: [
		//     {
		//       breakpoint: 1024,
		//       settings: {
		//         slidesToShow: 3,
		//         slidesToScroll: 3,
		//         infinite: true,
		//         dots: true
		//       }
		//     },
		//     {
		//       breakpoint: 600,
		//       settings: {
		//         slidesToShow: 2,
		//         slidesToScroll: 2
		//       }
		//     },
		//     {
		//       breakpoint: 480,
		//       settings: {
		//         slidesToShow: 1,
		//         slidesToScroll: 1
		//       }
		//     }
		// ]
	});

	var show = true;
	var countbox = ".facts_content";
	$(window).on("scroll load resize", function () {
		if (!show) return false; // Отменяем показ анимации, если она уже была выполнена
		var w_top = $(window).scrollTop(); // Количество пикселей на которое была прокручена страница
		var e_top = $(countbox).offset().top; // Расстояние от блока со счетчиками до верха всего документа
		var w_height = $(window).height(); // Высота окна браузера
		var d_height = $(document).height(); // Высота всего документа
		var e_height = $(countbox).outerHeight(); // Полная высота блока со счетчиками
		if (w_top + 300 >= e_top || w_height + w_top == d_height || e_height + e_top < w_height) {
			$('.content-item_num').css('opacity', '1');
			$('.content-item_num').spincrement({
				thousandSeparator: "",
				duration: 2000
			});
			 
			show = false;
		}
	});

});