// Be sure to name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions.
/* global createCanvas, colorMode, HSB, background, ellipse, random, width, height,
   rect, line, text, rectMode, CENTER, mouseX, mouseY, windowWidth, windowHeight, fill, collidePointCircle, strokeWeight,
   point, createButton, textSize*/

let backgroundColor,
	spherePosition,
	rectPosition,
	squareCircleDist,
	mouseCircleDist,
	H,
	numberOfObstacles,
	obstacle1,
	obstacle2,
	obstacle3,
	obstacle4,
	obstacle5,
	obstacle6,
	obstacle7,
	obstacle8,
	obstacle9,
	obstacle10,
	hit,
	winHit,
	gameOver,
	button;
let data;

var mapimg;

var clat = 0;
var clon = 0;

var ww = 1024;
var hh = 512;

var zoom = 1;
var earthquakes;

function preload() {
	// The clon and clat in this url are edited to be in the correct order.
	mapimg = loadImage(
		'https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/' +
			clon +
			',' +
			clat +
			',' +
			zoom +
			'/' +
			ww +
			'x' +
			hh +
			'?access_token=pk.eyJ1IjoiYWx6aDkwMDAiLCJhIjoiY2tkNG8yZm13MWp1dDJycXZtN29hbm9qZyJ9.zbe-GRhR174ao3ZcFT3_Rw'
	);
	// earthquakes = loadStrings('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.csv');
	earthquakes = loadStrings(
		'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv'
	);

	var settings = {
		async: true,
		crossDomain: true,
		url: 'https://www.trackcorona.live/api/cities',
		method: 'GET',
	};

	$.ajax(settings).done(function (response) {
		data = response.data;
		console.log(data);
	});
}

function mercX(lon) {
	lon = radians(lon);
	var a = (256 / PI) * pow(2, zoom);
	var b = lon + PI;
	return a * b;
}

function mercY(lat) {
	lat = radians(lat);
	var a = (256 / PI) * pow(2, zoom);
	var b = tan(PI / 4 + lat / 2);
	var c = PI - log(b);
	return a * c;
}

function setup() {
	//api call to get corona data

	// Canvas & color settings
	createCanvas(ww, hh);
	translate(width / 2, height / 2);
	imageMode(CENTER);
	image(mapimg, 0, 0);

	var cx = mercX(clon);
	var cy = mercY(clat);

	for (var i = 1; i < data.length; i++) {
		// var data = earthquakes[i].split(/,/);
		//console.log(data);
		var lat = data[i].latitude;
		var lon = data[i].longitude;
		var mag = data[i].confirmed;
		var x = mercX(lon) - cx;
		var y = mercY(lat) - cy;
		// This addition fixes the case where the longitude is non-zero and
		// points can go off the screen.
		if (x < -width / 2) {
			x += width;
		} else if (x > width / 2) {
			x -= width;
		}
		mag = pow(10, mag);
		mag = sqrt(mag);
		var magmax = sqrt(pow(10, 10));
		var d = map(mag, 0, magmax, 0, 180);
		stroke(255, 0, 255);
		fill(255, 0, 255, 200);
		ellipse(x, y, d, d);
	}
}

function draw() {
	// background(backgroundColor, 100, 100);
}

// function mousePressed() {
// 	spherePosition.x = random(width);
// 	spherePosition.y = random(height);
// }
