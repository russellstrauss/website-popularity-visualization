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

var leftOffset = 10;

d3.csv('data/data.csv', dataProcessor).then(function(data) {
	// returns a function so must call yScale(x)
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
	
	var min = 0, max = 0;
	data.forEach(function(d) {
		
		if (min > d.popularity) min = d.popularity;
		if (max < d.popularity) max = d.popularity;
	});
	
	return d3.scaleLinear().domain([min, max]).range([svgHeight - margin.top - margin.bottom, 0]);
}

function nestData(data) {
	return d3.nest()
	.key(function(d) {
		return d.year;
    })
	.key(function(d) {
		return d.region;
    })
	.object(data);
}

function drawLeftCirclesAndLabels() {
	
	var selectedYear = getSelectedLeftYear();
	var selectedRegion = getSelectedRegion();
	var selectedData = yearToRegionToData[selectedYear][selectedRegion];
	
	var circleRadius = 10;
	
	var circle = d3.select('body svg .left-group').selectAll('circle').data(selectedData);
	var label = d3.select('body svg .left-group').selectAll('text').data(selectedData);
	
	circle.enter()
	.append('circle')
	.attr('cy', function(d) {
		return yScale(d.popularity);
	})
	.attr('cx', function(d) {
		return leftOffset;
	})
	.attr('r', function(d) {
		return circleRadius;
	})
	.attr('fill', function(d) {
		return getColor(d.website);
	});
	
	label.enter()
	.append('text')
	.text(function(d) {
		return d.website;
	})
	.attr('y', function(d) {
		return yScale(d.popularity) + this.getBBox().height - circleRadius;
	})
	.attr('x', function(d) {
		return leftOffset - (this.getBBox().width + 20);
	})
	.attr('fill', function(d) {
		return getColor(d.website);
	});

	label.transition().duration(800).ease(d3.easeCubicInOut)
	.attr('y', function(d) {
		return yScale(d.popularity) + this.getBBox().height - circleRadius;
	})
	.attr('fill', function(d) {
		return getColor(d.website);
	});
	
	circle.transition().duration(800).ease(d3.easeCubicInOut)
	.attr('cy', function(d) {
		return yScale(d.popularity);
	})
	.attr('fill', function(d) {
		return getColor(d.website);
	});
	
	circle.exit();
	label.exit();
}

function drawRightCirclesAndLabels() {
	
	var selectedYear = getSelectedRightYear();
	var selectedRegion = getSelectedRegion();
	var selectedData = yearToRegionToData[selectedYear][selectedRegion];
	
	var x = 0;
	var circleRadius = 10;
	
	var circle = d3.select('body svg .right-group').selectAll('circle').data(selectedData);
	var label = d3.select('body svg .right-group').selectAll('text').data(selectedData);

	var circleEnter = circle.enter()
	.append('circle')
	.attr('cy', function(d) {
		return yScale(d.popularity);
	})
	.attr('cx', function(d) {
		return x;
	})
	.attr('r', function(d) {
		return circleRadius;
	})
	.attr('fill', function(d) {
		return getColor(d.website);
	});
	
	label.enter()
	.append('text')
	.text(function(d) {
		return d.website;
	})
	.attr('y', function(d) {
		return yScale(d.popularity) + this.getBBox().height - circleRadius;
	})
	.attr('x', function(d) {
		return circleRadius + 5;
	})
	.attr('fill', function(d) {
		return getColor(d.website);
	});

	label.transition().duration(800).ease(d3.easeCubicInOut)
	.attr('y', function(d) {
		return yScale(d.popularity) + this.getBBox().height - circleRadius;
	})
	.attr('fill', function(d) {
		return getColor(d.website);
	});
	
	circle.transition().duration(800).ease(d3.easeCubicInOut)
	.attr('cy', function(d) {
		return yScale(d.popularity);
	})
	.attr('fill', function(d) {
		return getColor(d.website);
	});
	
	circle.exit();
	label.exit();
}

function drawLines() {
	
	var lineData = getLineData();
	var line = d3.select('body svg .lines').selectAll('line').data(lineData);
	
	line.enter().append('line')
	.attr('x1', function(d) {
		return d.x1 + leftOffset;
	})
	.attr('x2', function(d) {
		return d.x2;
	})
	.attr('y1', function(d) {
		return d.y1;
	})
	.attr('y2', function(d) {
		return d.y2;
	})
	.attr('stroke', function(d) {
		return getColor(d.website);
	});
	
	line.transition().duration(800).ease(d3.easeCubicInOut)
	.attr('x1', function(d) {
		return d.x1 + leftOffset;
	})
	.attr('x2', function(d) {
		return d.x2;
	})
	.attr('y1', function(d) {
		return d.y1;
	})
	.attr('y2', function(d) {
		return d.y2;
	})
	.attr('stroke', function(d) {
		return getColor(d.website);
	});
	
	line.exit();
}

var toolTip = d3.tip()
.attr("class", "d3-tip")
.offset([-12, 0])
.html(function(d) {
	return "<h5>"+d['website']+"</h5><table><thead><tr><td>mph</td><td>power</td><td>Cylinders</td><td>Year</td></tr></thead>"
			+ "<tbody><tr><td>"+d['website']+"</td><td>"+d['website']+"</td><td>"+d['website']+"</td><td>"+d['website']+"</td></tr></tbody>"
			+ "<thead><tr><td>economy</td><td colspan='2'>displacement</td><td>weight</td></tr></thead>"
			+ "<tbody><tr><td>"+d['website']+"</td><td colspan='2'>"+d['website']+"</td><td>"+d['website']+"</td></tr></tbody></table>"
});
svg.call(toolTip);

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

	for (var i = 0; i < dataForSelectedLeftYear.length; i++) {
		var currentWebsite = dataForSelectedLeftYear[i].website;
		var leftPopularity = dataForSelectedLeftYear[i].popularity;
		var rightPopularity = dataForSelectedRightYear.find(function(d) { return d.website == currentWebsite; }).popularity;

		var oldX1 = 0;
		var oldY1 = yScale(leftPopularity);
		var oldX2 = svgWidth - margin.right - margin.left;
		var oldY2 = yScale(rightPopularity);

		var newX1 = 0 + circleRadius + circleMargin;
		var newY1 = (oldY2 - oldY1) / (oldX2 - oldX1) * (newX1 - oldX1) + oldY1;
		var newX2 = svgWidth - margin.right - margin.left - circleRadius - circleMargin;
		var newY2 = (oldY2 - oldY1) / (oldX2 - oldX1) * (newX2 - oldX1) + oldY1;

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