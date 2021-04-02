jQuery(document).ready(function($) {

var session = 0;
var total = $('.ap_section').length;

var sect = $('.ap_section').eq(session);
var prev = $('.ap_section').eq(session-1);
var next = $('.ap_section').eq(session+1);
var first = $('.ap_section').eq(1);
var last = $('.ap_section').eq(total-1);

var navi = $('.ap_navi');
var btn1 = $('.ap_navi').children('button').first();
var btn2 = $('.ap_navi').children('button').last();

function go2Prev(sect, prev)
{
	sect.css({top : 0}).animate({
		top : '100%'
	}, 'very slow', function() {
		sect.hide();
	});
	prev.css({top : '-100%'}).show().animate({
		top : 0
	}, 'very slow');
}
function go2Next(sect, next)
{
	sect.css({top : 0}).animate({
		top : '-100%'
	}, 'very slow', function() {
		sect.hide();
	});
	next.css({top : '100%'}).show().animate({
		top : 0
	}, 'very slow');
}
function go2First(sect)
{
	sect.css({top : 0}).animate({
		top : '100%'
	}, 'very slow', function() {
		sect.hide();
	});
	first.css({top : '-100%'}).show().animate({
		top : 0
	}, 'very slow');
}
function go2Last(sect)
{
	sect.css({top : 0}).animate({
		top : '-100%'
	}, 'very slow', function() {
		sect.hide();
	});
	last.css({top : '100%'}).show().animate({
		top : 0
	}, 'very slow');
}
function setSectionOrder(session)
{
	sect = $('.ap_section').eq(session);
	prev = $('.ap_section').eq(session-1);
	next = $('.ap_section').eq(session+1);
}
function setButtonCommand(session)
{
	if ( session == 0 || session == total )
	{
		if ( !btn1.hasClass('disabled') ) btn1.addClass('disabled');
		if ( !btn2.hasClass('disabled') ) btn2.addClass('disabled');
		navi.fadeOut();
	}
	else if ( session == 1 )
	{
		if ( !btn1.hasClass('disabled') ) btn1.addClass('disabled');
		if ( btn2.hasClass('disabled') ) btn2.removeClass('disabled');
	}
	else if ( session == total-1 )
	{
		if ( btn1.hasClass('disabled') ) btn1.removeClass('disabled');
		if ( !btn2.hasClass('disabled') ) btn2.addClass('disabled');
	}
	else
	{
		if ( btn1.hasClass('disabled') ) btn1.removeClass('disabled');
		if ( btn2.hasClass('disabled') ) btn2.removeClass('disabled');
	}
}
function dispErrorMessage(btn, msg)
{
	btn.parent().append('<div class="ap_error message error">' + msg + '</div>');
	btn.siblings('.ap_error').fadeIn(800, function() {
		setTimeout(function() {
			btn.siblings('.ap_error').fadeOut(800, function() {
				btn.siblings('.ap_error').remove();
			});
		}, 1200);
	});
}
function checkValidity(btn)
{
	var is_required = ( btn.closest('.ap_section').find('.ap_required').length > 0 ) ? true : false;
	if ( is_required )
	{
		if ( btn.prev('input').length > 0 )
		{
			var input = btn.prev('input');
			var type = input.attr('type');
			var msg = '', regex = '';
				
			if ( input.val() == '' )
			{
				msg = ( xe.current_lang == 'ko' ) ? '이 필드는 반드시 입력해야 합니다' : 'Warn!';
				dispErrorMessage(btn, msg);
				return false;
			}
			else
			{
				if ( type == 'email' )
				{
					regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
					if ( !regex.test(input.val()) )
					{
						msg = ( xe.current_lang == 'ko' ) ? '이메일 형식에 맞아야 합니다' : 'Warn!';
						dispErrorMessage(btn, msg);
						return false;
					}
					else
					{
						return true;
					}
				}
				else if ( type == 'url' )
				{
					regex = /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
					if ( !regex.test(input.val()) )
					{
						msg = ( xe.current_lang == 'ko' ) ? 'URL 형식에 맞아야 합니다' : 'Warn!';
						dispErrorMessage(btn, msg);
						return false;
					}
					else
					{
						return true;
					}
				}
				else if ( type == 'tel' )
				{
					regex = /^\d{2,3}-\d{3,4}-\d{4}$/;
					if ( !regex.test(input.val()) )
					{
						msg = ( xe.current_lang == 'ko' ) ? '전화번호 형식에 맞아야 합니다' : 'Warn!';
						dispErrorMessage(btn, msg);
						return false;
					}
					else
					{
						return true;
					}
				}
				else
				{
					return true;
				}
			}
		}
		else if ( btn.prev('.ap_radio').length > 0 )
		{
			if ( !btn.prev('.ap_radio').children('label').hasClass('is_checked') )
			{
				msg = ( xe.current_lang == 'ko' ) ? '하나 이상의 항목을 선택해야 합니다' : 'Warn!';
				dispErrorMessage(btn, msg);
				return false;
			}
			else
			{
				return true;
			}
		}
		else if ( btn.prev('.ap_checkbox').length > 0 )
		{
			if ( !btn.prev('.ap_checkbox').children('label').hasClass('is_checked') )
			{
				msg = ( xe.current_lang == 'ko' ) ? '하나 이상의 항목을 선택해야 합니다' : 'Warn!';
				dispErrorMessage(btn, msg);
				return false;
			}
			else
			{
				return true;
			}
		}
		else if ( btn.prev('select').length > 0 )
		{
			if ( btn.prev('select').val() == '' )
			{
				msg = ( xe.current_lang == 'ko' ) ? '하나 이상의 항목을 선택해야 합니다' : 'Warn!';
				dispErrorMessage(btn, msg);
				return false;
			}
			else
			{
				return true;
			}
		}
		else if ( btn.prev('.hasDatepicker').length > 0 )
		{
			if ( btn.prev().prev('input').val() == '' )
			{
				msg = ( xe.current_lang == 'ko' ) ? '달력에서 날짜를 선택해야 합니다' : 'Warn!';
				dispErrorMessage(btn, msg);
				return false;
			}
			else
			{
				return true;
			}
		}
	}
	else
	{
		return true;
	}
}

$(document).on('click', '.ap_input:not(.send) .ap_next', function() {
	if ( !checkValidity($(this)) )
	{
		return false;
	}
	session++;

	if ( $(this).index() == 0 )
	{
		sect.fadeOut();
		next.fadeIn(1200);
		navi.fadeIn('very slow');
	}
	else
	{
		setButtonCommand(session);
		go2Next(sect, next);
	}
	setSectionOrder(session);
	setTimeout(function() {
		if ( sect.find('.ap_input').children('input').length > 0 )
		{
			sect.find('input').focus();
		}
		else if ( sect.find('textarea').length > 0 )
		{
			sect.find('textarea').focus();
		}
	}, 800);

	return false;
});

$(document).on('click', '.ap_navi button', function() {
	if ( $(this).index() == 1 )
	{
		go2Prev(sect, prev);
		session--;
	}
	else if ( $(this).index() == 2 )
	{
		go2Next(sect, next);
		session++;
	}
	setSectionOrder(session);
	setButtonCommand(session);

	return false;
});

$('.ap_welcome').on('mouseenter', function() {
	$(document).on('keydown', function(e) {
		if ( session == 0 && ( e.keyCode == 13 || e.keyCode == 34 ) )
		{
			sect.find('.ap_next').click();
			return false;
		}
	});
}).on('mouseleave', function() {
	$(document).off('keydown');
});

$('.ap_section').not('.ap_welcome').on('mouseenter', function() {
	$(document).on('keydown', function(e) {
		if ( !$(this).find('textarea').is(':focus') )
		{
			if ( e.keyCode == 33 )
			{
				$('.ap_navi button').eq(0).not('.disabled').click();
			}
			else if ( e.keyCode == 34 )
			{
				$('.ap_navi button').eq(1).not('.disabled').click();
			}
			if ( !$(this).find('input').is(':focus') )
			{
				if ( e.keyCode == 35 )
				{
					if ( session != total-1 )
					{
						session = total-1;
						go2Last(sect);
						setSectionOrder(session);
						setButtonCommand(session);
					}
				}
				else if ( e.keyCode == 36 )
				{
					if ( session != 1 )
					{
						session = 1;
						go2First(sect);
						setSectionOrder(session);
						setButtonCommand(session);
					}
				}
			}
		}
	});
}).on('mouseleave', function() {
	$(document).off('keydown');
});

$(document).on('keypress', '.ap_input input, .ap_input textarea', function(e) {
	if ( $(this).prop('tagName') == 'TEXTAREA' )
	{
		if ( e.ctrlKey && (e.keyCode == 10 || e.keyCode == 13) )
		{
			$(this).parent().children('.ap_next').click();
			return false;
		}
	}
	else
	{
		if ( e.keyCode == 13 )
		{
			$(this).parent().children('.ap_next').click();
			return false;
		}
	}
});

var sec_height = $('.ap_section').height();
$('.ap_input textarea').css('height', sec_height - 280);
$(document).on('input', '.ap_input input, .ap_input textarea', function() {
	var visual = $(this).next().css('opacity');
	if ( $(this).val() != '' && visual == 0 )
	{
		$(this).nextAll().css('pointer-events', 'auto').fadeTo('very fast', 1);
	}
	else if ( $(this).val() == '' && visual == 1 )
	{
		$(this).nextAll().css('pointer-events', 'none').fadeTo('very fast', 0);
	}

	if ( $(this).attr('name') == 'nick_name' )
	{
		$(this).closest('.ap_section').next('.ap_section').find('.ap_name').text($(this).val());
	}
});

$(document).on('click', '.ap_radio label', function() {
	if ( $(this).hasClass('is_checked') )
	{
		$(this).removeClass('is_checked');
		$(this).children('input').prop('checked', false);
	}
	else
	{
		$(this).addClass('is_checked');
		$(this).children('input').prop('checked', true);
		$(this).siblings().removeClass('is_checked');
	}

	var checked_length = $(this).parent().find('input:checked').length;
	var visual = $(this).parent().next().css('opacity');
	if ( checked_length > 0 && visual == 0 )
	{
		$(this).parent().nextAll().fadeTo('very fast', 1);
		$(this).parent().next('.ap_next').css('pointer-events', 'auto');
	}
	else if ( checked_length < 1 && visual == 1 )
	{
		$(this).parent().nextAll().fadeTo('very fast', 0);
		$(this).parent().next('.ap_next').css('pointer-events', 'none');
	}
	return false;
});

$('.ap_radio').closest('.ap_section').on('mouseenter', function() {
	var radio = $(this).find('.ap_radio');
	$(document).on('keydown', function(e) {
		var is_valid = radio.find('input[type="radio"]:checked').length;
		var label = radio.children('label'),
			label_on = radio.children('label[class="is_checked"]'),
			length = label.length;
		if ( e.keyCode == 37 || e.keyCode == 38 )
		{
			if ( !is_valid )
			{
				label.eq(length-1).click();
			}
			else
			{
				if ( label_on.index() == 0 )
				{
					label.eq(length-1).click();
				}
				else
				{
					label_on.prev().click();
				}
			}
		}
		else if ( e.keyCode == 39 || e.keyCode == 40 )
		{
			if ( !is_valid )
			{
				label.eq(0).click();
			}
			else
			{
				if ( label_on.index() == length-1 )
				{
					label.eq(0).click();
				}
				else
				{
					label_on.next().click();
				}
			}
		}
		else if ( e.keyCode == 13 )
		{
			radio.next().click();
		}
	});
});

$('input[type="tel"]').attr('maxlength', '13').on('input', function() {
	$(this).val($(this).val().replace(/[^0-9]/g, ''));
	var str = $(this).val();
	str = str.replace(/[^0-9]/g, '');
	var tmp = '';
	// 0으로 시작해야 함
	if ( str.substring(0, 1) != '0' ) $(this).val(tmp);
	else
	{
		// 서울 지역번호를 사용할 경우
		if ( str.substring(0, 2) == '02' )
		{
			// 길이 2까지는 그대로 출력
			if ( str.length < 3 ) return str;
			// 지역번호 02로 시작하면 최대 10자리까지만 입력 제한
			if ( str.length > 10 ) str = str.substring(0, 10);
			if ( str.length < 6 )
			{
				tmp += str.substr(0, 2); tmp += '-'; tmp += str.substr(2); $(this).val(tmp);
			}
			else if ( str.length < 10 )
			{
				tmp += str.substr(0, 2); tmp += '-'; tmp += str.substr(2, 3); tmp += '-'; tmp += str.substr(5); $(this).val(tmp);
			}
			else
			{
				tmp += str.substr(0, 2); tmp += '-'; tmp += str.substr(2, 4); tmp += '-'; tmp += str.substr(6); $(this).val(tmp);
			}
		}
		else
		{ // 서울 지역번호 외의 경우
			// 길이 3까지는 그대로 출력
			if ( str.length < 4 ) return str;
			// 서울 지역번호 외로 시작하면 최대 11자리까지만 입력 제한
			if ( str.length > 11 ) str = str.substring(0, 11);
			if ( str.length < 7 )
			{
				tmp += str.substr(0, 3); tmp += '-'; tmp += str.substr(3); $(this).val(tmp);
			}
			else if ( str.length < 11 )
			{
				tmp += str.substr(0, 3); tmp += '-'; tmp += str.substr(3, 3); tmp += '-'; tmp += str.substr(6); $(this).val(tmp);
			}
			else
			{
				tmp += str.substr(0, 3); tmp += '-'; tmp += str.substr(3, 4); tmp += '-'; tmp += str.substr(7); $(this).val(tmp);
			}
		}
	}
});

});