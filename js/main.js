$(document).ready(function() {

	$('.mobile-wrap').on('click', function() {
		$('.line-burger').toggleClass('line-active');
		$('.main-header__list').slideToggle();
	});

	$(window).resize(function() {
		if ($(window).width() >= 1349) {
			$('.main-header__list').attr('style', '');
			$('.line-burger').removeClass('line-active');
		}
	});


	(function() {
		var navigation = $('.main-header--fixed')
		var media = matchMedia('(max-width: 1350px)'), matches = media.matches

		// if (matches) {
			listener()
		// }

		$(window).resize(listener);
		media.addListener((e) => {
			matches = e.matches

			// if (matches) {
				listener()
			// } else {
			// 	navigation.css({
			// 		'top': 0
			// 	});
			// }
		})

		$(window).scroll(listener)

		function listener() {
			var heightHeader
			var scrollTop = $(window).scrollTop()

			if (matches) {
				heightHeader = $(".main-header__info").outerHeight(true) + $('.main-header__content').height();
			} else {
				heightHeader = $(".main-header__info").outerHeight(true)
			}

			if (heightHeader <= scrollTop) {
				$('.main-header__navigation .container--inner').addClass('main-header__navigation--fixed');
				navigation.css({
					'top': -heightHeader + 'px'
				});
			} else {
				$('.main-header__navigation .container--inner').removeClass('main-header__navigation--fixed');
				navigation.css({
					'top': -scrollTop
				});
			}
			
		}
	})()


	// (function() {
	// 	var navigation = $('.main-header__navigation--fixed')
	// 	var media = matchMedia('(max-width: 1350px)'), matches = media.matches
	// 	var offset = $('.main-header__navigation').offset().top;
	// 	var heightMenu = $('.main-header__navigation').outerHeight(true);

	// 	winWidth = $(window).width();

	// 	media.addListener((e) => {
	// 		matches = e.matches

	// 		if(matches) {
	// 			desc();
	// 		} else {
	// 			mob();
	// 		}
	// 	})

	// 	function mob() {
	// 		var scrollTop = $(window).scrollTop()
	// 		var heightHeader = 40 + $('.header__static').outerHeight(true);
	// 		console.log(heightHeader <= scrollTop)
	// 		if (heightHeader <= scrollTop) {
	// 			$('.main-header__wrap').addClass('main-header__navigation--fixed');
	// 			$('.main-header__wrap').css({
	// 				'margin-top': -$(".main-header__menu").height() + 'px'
	// 			});
	// 			$('.main-header').css({
	// 				'margin-top': heightHeader + 'px'
	// 			});
	// 		} else {
	// 			$('.main-header__wrap').removeClass('main-header__navigation--fixed');
	// 			$('.main-header, .main-header__wrap').css({
	// 				'margin-top': 0
	// 			});
	// 		}
	// 	}

	// 	function desc() {
	// 		if (offset <= $(window).scrollTop()) {
	// 			$('.main-header__navigation').addClass('main-header__navigation--fixed');
	// 			$('.header__static').css({
	// 				'margin-top': heightMenu + 'px'
	// 			});
	// 		} else {
	// 			$('.main-header__navigation').removeClass('main-header__navigation--fixed');
	// 			$('.header__static').css({
	// 				'margin-top': 0
	// 			});
	// 		}
	// 	}

	// 	$(window).scroll(function() {
	// 		if (matches) {
	// 			mob();
	// 		} else {
	// 			desc();
	// 		}
	// 	// if (winWidth > 1350) {
	// 	//   desc();
	// 	// } else {
	// 	//   mob();  
	// 	// }
	// })


	// })()

	$('.main-header__button').on('click', function(e) {
		var $parent = $(this).parent();
		$parent.find('.main-header__input').trigger('focus');
		$parent.find('.main-header__search').addClass('main-header__search-active');
	});

	$('html').on('click', function(e) {
		if (!$(e.target).is('.main-header__button button, .main-header__input, main-header__search-wrap, main-header__search-wrap, main-header__search-btn')) {
			$('.main-header__search').removeClass('main-header__search-active');
		}
	});

	function validate(input, length, regExp, error, phone) {

		$(input).on('blur keyup', function() {
			var value = $(this).val();
			var that = $(this);

			regExp = regExp == '' ? /./ : regExp;

			if (phone === true) {
				bool_reg = !regExp.test(value);
			} else {
				bool_reg = regExp.test(value);
			}

			if (value.length > length && value !== '' && bool_reg) {
				that.removeClass('form-fail').addClass('form-done');
				$(error).slideUp();
			} else {
				that.removeClass('form-done').addClass('form-fail');
				$(error).slideDown();
			}
		});

	}

  // деакцивация кнопки если есть поле с ошибкой

  function disBtn(input, btn) {
  	var input = $(input);
  	input.on('blur keyup', function() {

  		if (input.hasClass('form-fail')) {
  			$(btn).attr('disabled', 'disabled');
  		} else {
  			$(btn).removeAttr('disabled');
  		}

  	});

  }

  // для проверки при нажатии

  function valClick(input, length, regExp, error, btn, phone) {
  	var value = $(input).val();

  	regExp = regExp == '' ? /./ : regExp;

  	if (phone === true) {
  		bool_reg = regExp.test(value);
  	} else {
  		bool_reg = !regExp.test(value);
  	}

  	if (value.length < length && value === '' && bool_reg) {
  		$(input).addClass('form-fail');
  		$(error).slideDown();
  	}
  }

  //  деакцивация кнопки при нажатии

  function disBtnClick(input, btn) {
  	var input = $(input);

  	if (input.hasClass('form-fail')) {
  		$(btn).attr('disabled', 'disabled');
  		return false;
  	} else {
  		return true;
  	}

  }

  $('input[type="tel"]').mask("+38 (999) 999-99-99");

  var regName = /^[a-zA-Zа-яА-ЯёЁ]+/;
  var regPhone = /[_]/i;

  // пример использования
  validate('#c_fio', 1, regName, '.contacts__fail-fio');
  validate('#c_phone', 1, regPhone, '.contacts__fail-phone', true);
  disBtn('#c_fio, #c_phone', '.contacts__btn');

  validate('#p_fio', 1, regName, '.inner__fail-fio');
  validate('#p_country', 1, regName, '.inner__fail-country');
  validate('#p_phone', 1, regPhone, '.inner__fail-phone', true);
  disBtn('#p_fio, #p_country, #p_phone', '.inner__btn');

  validate('#r_surname', 1, regName, '.request__fail-surname');
  validate('#r_name', 1, regName, '.request__fail-name');
  validate('#r_patronymic', 1, regName, '.request__fail-patronymic');
  validate('#r_country', 1, regName, '.request__fail-country');
  validate('#r_phone', 1, regPhone, '.request__fail-phone', true);
  validate('#r_email', 1, regName, '.request__fail-email');
  disBtn('#r_surname, #r_name, #r_patronymic, #r_country, #r_phone, #r_email', '.request__btn');

  $('.overlay-close').click(function() {
  	var overlay = $(this).parents('.overlay');
  	overlay.removeClass('overlay-active');
  });

  $('.btn-national').on('click', function(e) {
  	$('.overlay-request').addClass('overlay-active');
  });

  $('.main-header__call').on('click', function(e) {
  	$('.overlay-call').addClass('overlay-active');
  });

  $('table').wrap('<div class="about__wrap-table">');


});