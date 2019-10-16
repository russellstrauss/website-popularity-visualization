var yearToRegionToData = null;

var svg = d3.select('#vis-container svg');
var svgWidth = $('#vis-container .vis svg').width();
var svgHeight = $('#vis-container .vis svg').height();

var margin = { top: 70, left: 120, bottom: 70, right: 120 };
var yScale = null;
var circleRadius = 5;

var leftCircleAndLabelGroup = null;
var rightCircleAndLabelGroup = null;
var lineGroup = null;

d3.csv('data/data.csv', dataProcessor).then(function(data) {
	yScale = getYScale(data);
	yearToRegionToData = nestData(data);

	initLeftCircleAndLabelGroup();
	initRightCircleAndLabelGroup();
	initLineGroup();

	drawLeftCirclesAndLabels();
	drawRightCirclesAndLabels();
	drawLines();
});

// 
// THE FIVE FUNCTIONS YOU NEED TO IMPLEMENT
// 

function getYScale(data) {
    /////////////////////////////////////////////////////////////////////
    //                        YOUR CODE HERE                           //
    /////////////////////////////////////////////////////////////////////

    

    /////////////////////////////////////////////////////////////////////
    //                        END OF YOUR CODE                         //
    /////////////////////////////////////////////////////////////////////
}

function nestData(data) {
    /////////////////////////////////////////////////////////////////////
    //                        YOUR CODE HERE                           //
    /////////////////////////////////////////////////////////////////////

    

    /////////////////////////////////////////////////////////////////////
    //                        END OF YOUR CODE                         //
    /////////////////////////////////////////////////////////////////////
}

function drawLeftCirclesAndLabels() {
    /////////////////////////////////////////////////////////////////////
    //                        YOUR CODE HERE                           //
    /////////////////////////////////////////////////////////////////////

    

    /////////////////////////////////////////////////////////////////////
    //                        END OF YOUR CODE                         //
    /////////////////////////////////////////////////////////////////////
}

function drawRightCirclesAndLabels() {
    /////////////////////////////////////////////////////////////////////
    //                        YOUR CODE HERE                           //
    /////////////////////////////////////////////////////////////////////

    

    /////////////////////////////////////////////////////////////////////
    //                        END OF YOUR CODE                         //
    /////////////////////////////////////////////////////////////////////
}

function drawLines() {
	var lineData = getLineData();

    /////////////////////////////////////////////////////////////////////
    //                        YOUR CODE HERE                           //
    /////////////////////////////////////////////////////////////////////

    

    /////////////////////////////////////////////////////////////////////
    //                        END OF YOUR CODE                         //
    /////////////////////////////////////////////////////////////////////
}

// 
// HELPER FUNCTIONS
// 

function getSelectedRegion() {
	var selectedRegion = $('#title .region.selected').attr('region');

	return selectedRegion;
}

function getSelectedLeftYear() {
	var yearString = $('#vis-container .left .capsule.selected').attr('year');
	var year = parseInt(yearString);

	return year;
}

function getSelectedRightYear() {
	var yearString = $('#vis-container .right .capsule.selected').attr('year');
	var year = parseInt(yearString);

	return year;
}

function getLineData() {
	if (yScale == null) return [];
	var selectedLeftYear = getSelectedLeftYear();
	var selectedRightYear = getSelectedRightYear();
	var selectedRegion = getSelectedRegion();

	var dataForSelectedLeftYear = yearToRegionToData[selectedLeftYear][selectedRegion];
	var dataForSelectedRightYear = yearToRegionToData[selectedRightYear][selectedRegion];
	var circleMargin = 8;
	var lineData = [];

	for (let i = 0; i < dataForSelectedLeftYear.length; i++) {
		let currentWebsite = dataForSelectedLeftYear[i].website;
		let leftPopularity = dataForSelectedLeftYear[i].popularity;
		let rightPopularity = dataForSelectedRightYear.find(function(d) { return d.website == currentWebsite; }).popularity;

		let oldX1 = 0;
		let oldY1 = yScale(leftPopularity);
		let oldX2 = svgWidth - margin.right - margin.left;
		let oldY2 = yScale(rightPopularity);

		let newX1 = 0 + circleRadius + circleMargin;
		let newY1 = (oldY2 - oldY1) / (oldX2 - oldX1) * (newX1 - oldX1) + oldY1;
		let newX2 = svgWidth - margin.right - margin.left - circleRadius - circleMargin;
		let newY2 = (oldY2 - oldY1) / (oldX2 - oldX1) * (newX2 - oldX1) + oldY1;

		lineData.push({ 
			website: currentWebsite,
			x1: newX1, y1: newY1, x2: newX2, y2: newY2 
		});
	}

	return lineData;
}

function getColor(website) {
	var selectedLeftYear = getSelectedLeftYear();
	var selectedRightYear = getSelectedRightYear();
	var selectedRegion = getSelectedRegion();

	var dataForSelectedLeftYear = yearToRegionToData[selectedLeftYear][selectedRegion];
	var dataForSelectedRightYear = yearToRegionToData[selectedRightYear][selectedRegion];

	var leftValue = dataForSelectedLeftYear.find(function(d) { return d.website == website; }).popularity;
	var rightValue = dataForSelectedRightYear.find(function(d) { return d.website == website; }).popularity;
	
	if (rightValue - leftValue > 10) return '#3ac996';
	else if (rightValue - leftValue < -10) return '#e35669';
	else return '#d3d3d3';
}

// 
// OTHER FUNCTIONS
// 

function initLeftCircleAndLabelGroup() {
	var translateString = 'translate(' + margin.left + ',' + margin.top + ')';

	leftCircleAndLabelGroup = svg.append('g')
		.attr('class', 'left-group')
		.attr('transform', translateString);
}

function initRightCircleAndLabelGroup() {
	var translateString = 'translate(' + (svgWidth - margin.right) + ',' + margin.top + ')';

	rightCircleAndLabelGroup = svg.append('g')
		.attr('class', 'right-group')
		.attr('transform', translateString);
}

function initLineGroup() {
	var translateString = 'translate(' + margin.left + ',' + margin.top + ')';

	lineGroup = svg.append('g')
		.attr('class', 'lines')
		.attr('transform', translateString);
}

function dataProcessor(d) {
	return {
        region: d.region,
        website: d.website,
        year: +d.year,
        popularity: +d.popularity
    }
}