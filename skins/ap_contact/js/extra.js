jQuery(document).ready(function($) {

var weekday = [];
	weekday['Sun'] = 'Sunday';
	weekday['Mon'] = 'Monday';
	weekday['Tue'] = 'Tuesday';
	weekday['Wed'] = 'Wednesday';
	weekday['Thu'] = 'Thursday';
	weekday['Fri'] = 'Friday';
	weekday['Sat'] = 'Saturday';

$(document).on('click', '.ap_extra .ap_checkbox label', function() {
	if ( $(this).hasClass('is_checked') )
	{
		$(this).removeClass('is_checked');
		$(this).children('input').prop('checked', false);
	}
	else
	{
		$(this).addClass('is_checked');
		$(this).children('input').prop('checked', true);
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
$(document).on('change', '.ap_extra .ap_input[rel="select"] select', function() {
	if ( $(this).val() != '' )
	{
		$(this).nextAll().fadeTo('very fast', 1);
		$(this).next('.ap_next').css('pointer-events', 'auto');
	}
	else
	{
		$(this).nextAll().fadeTo('very fast', 0);
		$(this).next('.ap_next').css('pointer-events', 'none');
	}
});

if ( $('.ap_extra .ap_input[rel="kr_zip"]').length > 0 )
{
	$('.ap_extra .ap_input[rel="kr_zip"]').find('input.krzip-postcode').removeAttr('disabled');
}
$(document).on('change', '.ap_extra .ap_input[rel="kr_zip"] input.krzip-postcode', function() {
	if ( $(this).closest('.krZip').find('input.krzip-detailAddress').val() != '' )
	{
		if ( $(this).val() != '' )
		{
			$(this).closest('.krZip').nextAll(':not(script)').fadeTo('very fast', 1);
			$(this).closest('.krZip').next().next('.ap_next').css('pointer-events', 'auto');
		}
		else
		{
			$(this).closest('.krZip').nextAll(':not(script)').fadeTo('very fast', 0);
			$(this).closest('.krZip').next().next('.ap_next').css('pointer-events', 'none');
		}
	}
});
$(document).on('input', '.ap_extra .ap_input[rel="kr_zip"] input.krzip-detailAddress', function() {
	if ( $(this).closest('.krZip').children('input.krzip-hidden-postcode').val() != '' )
	{
		if ( $(this).val() != '' )
		{
			$(this).closest('.krZip').nextAll(':not(script)').fadeTo('very fast', 1);
			$(this).closest('.krZip').next().next('.ap_next').css('pointer-events', 'auto');
		}
		else
		{
			$(this).closest('.krZip').nextAll(':not(script)').fadeTo('very fast', 0);
			$(this).closest('.krZip').next().next('.ap_next').css('pointer-events', 'none');
		}
	}
});
$(document).on('input', '.ap_extra .ap_input[rel="kr_zip"] input.krzip-postcode', function() {
	$(this).val($(this).closest('.krZip').children('.krzip-hidden-postcode').val());
	$(this).select();
	return false;
});


$('.ap_extra').find('.ap_input').each(function() {
	var type = $(this).attr('rel');
	if ( type == 'text' )
	{
		$(this).children('input[type="text"]').attr('autocomplete', 'off');
	}
	else if ( type == 'checkbox' )
	{
	}
	else if ( type == 'date' )
	{
		$.datepicker.setDefaults({
			dateFormat: 'yy-mm-dd',
			prevText: '이전 달',
			nextText: '다음 달',
			monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
			monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
			dayNames: ['일', '월', '화', '수', '목', '금', '토'],
			dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
			dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
			showMonthAfterYear: true,
			yearSuffix: '년',
			changeMonth: true,
			changeYear: true,
			gotoCurrent: false,
			yearRange: '-100:+10',
			onSelect: function() {
				var yyyymmdd = this.value.replace(/-/g, '');
				$(this).prev('input[type="hidden"]').val(yyyymmdd);
				$(this).nextAll().fadeTo('very fast', 1);
				$(this).next('.ap_next').css('pointer-events', 'auto');

				var date_format = new Date(this.value);
				var date = String(date_format).split(' ');
				$(this).find('.ui-datepicker-ap-day.long').text(weekday[date[0]]);
				$(this).find('.ui-datepicker-ap-day.short').text(date[0].toUpperCase());
				$(this).find('.ui-datepicker-ap-month').text(date[1]);
				$(this).find('.ui-datepicker-ap-day-num').text(date[2]);
				$(this).find('.ui-datepicker-ap-year').text(date[3]);
			}
		});
		$(this).children('input[type="hidden"]').next().datepicker();
	}
	else if ( type == 'kr_zip' )
	{
	}
});

});