$(function() {
	// install region buttons
	$('#title .region').on('click', function() {
		$('#title .region').removeClass('selected');
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
	});

	// install right year buttons
	$('#vis-container .right .capsule').on('click', function() {
		$('#vis-container .right .capsule').removeClass('selected');
		$(this).addClass('selected');
		changeRightYearTitle();
		drawLeftCirclesAndLabels();
		drawRightCirclesAndLabels();
		drawLines();
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