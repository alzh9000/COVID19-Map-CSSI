let data;
let myMap;
let canvas;
const mappa = new Mappa('Leaflet');


function preload() {
	// The clon and clat in this url are edited to be in the correct order.

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


const options = {
	lat: 0,
	lng: 0,
	zoom: 4,
	style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
}


function setup() {
	canvas = createCanvas(640, 640);
	myMap = mappa.tileMap(options);
	myMap.overlay(canvas);
	fill(200, 100, 100);



}

// We can use the sigmoid function to scale the cases?
function sigmoid(t) {
	return 1 / (1 + Math.pow(Math.E, -t));
}

function draw() {
	// background(backgroundColor, 100, 100);
	clear();

	console.log(data);
	for (let i = 0; i < data.length; i++) {

		const point = myMap.latLngToPixel(data[i].latitude, data[i].longitude);
		ellipse(point.x, point.y, 20, 20);
	}

}