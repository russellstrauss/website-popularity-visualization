$(function() {
	// install region buttons
	$('#title .region').on('click', function() {
		$('#title span').removeClass('selected');
		$('#title .capsule').removeClass('selected');
		$(this).closest('.capsule').addClass('selected');
		$(this).addClass('selected');
		drawLeftCirclesAndLabels();
		drawRightCirclesAndLabels();
		drawLines();
	});

	// install left year buttons
	$('#vis-container .left .capsule').on('click', function() {
		$('#vis-container .left .capsule').removeClass('selected');
		$(this).addClass('selected');
		changeLeftYearTitle();
		drawLeftCirclesAndLabels();
		drawRightCirclesAndLabels();
		drawLines();
		disablePastYears(parseInt($(this).attr('year')));
	});

	// install right year buttons
	$('#vis-container .right .capsule').on('click', function() {
		$('#vis-container .right .capsule').removeClass('selected');
		$(this).addClass('selected');
		changeRightYearTitle();
		drawLeftCirclesAndLabels();
		drawRightCirclesAndLabels();
		drawLines();
		disableFutureYears(parseInt($(this).attr('year')));
	});
});

function changeLeftYearTitle() {
	let selectedLeftYear = getSelectedLeftYear();
	$('#title .left-year').html(selectedLeftYear);
}

function changeRightYearTitle() {
	let selectedRightYear = getSelectedRightYear();
	$('#title .right-year').html(selectedRightYear);
}

function disablePastYears(leftYear) {
	
	var $buttons = $('.right .capsule');
	$buttons.removeClass('disabled');
	$buttons.each(function() {
		var rightYear = parseInt($(this).attr('year'));
		if (rightYear < leftYear) {
			$(this).addClass('disabled');
		}
	});
}

function disableFutureYears(rightYear) {
	
	var $buttons = $('.left .capsule');
	$buttons.removeClass('disabled');
	$buttons.each(function() {
		var leftYear = parseInt($(this).attr('year'));
		if (rightYear < leftYear) {
			$(this).addClass('disabled');
		}
	});
}