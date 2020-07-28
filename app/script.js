let data;
let myMap;
let canvas;
const mappa = new Mappa('Leaflet');


function preload() {
	let url = 'https://www.trackcorona.live/api/cities';
	data = loadJSON(url);
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

	console.log(data.data)

}

// We can use the sigmoid function to scale the cases?
function sigmoid(t) {
	return 1 / (1 + Math.pow(Math.E, -t));
}

function draw() {
	// background(backgroundColor, 100, 100);
	clear();

	for (let i = 0; i < data.data.length; i++) {

		const point = myMap.latLngToPixel(data.data[i].latitude, data.data[i].longitude);
		ellipse(point.x, point.y, 20, 20);
	}

}