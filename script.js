let data;
let myMap;
let canvas;
const mappa = new Mappa('Leaflet');
let curLat, curLang;

function preload() {
	let url = 'https://www.trackcorona.live/api/cities';
	data = loadJSON(url);
	//locationData = getCurrentPosition();
	navigator.geolocation.getCurrentPosition((position) => {
		curLat = position.coords.latitude
		curLang = position.coords.longitude;
		let options = {
			lat: curLat,
			lng: curLang,
			zoom: 7,
			style: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
		};

		canvas = createCanvas(640, 640);
		myMap = mappa.tileMap(options);
		myMap.overlay(canvas);
		fill(200, 100, 100);
		stroke(200, 100, 100)


		console.log(data.data);
		myMap.onChange(drawPoint);
	});
}



function setup() {

}


function draw() {

}

function drawPoint() {
	clear();

	for (let i = 0; i < data.data.length; i++) {
		const point = myMap.latLngToPixel(
			data.data[i].latitude,
			data.data[i].longitude
		);
		let mag = data.data[i].confirmed / 500;
		let magmax = sqrt(pow(10, 6));
		let d = 1 + map(mag, 0, magmax, 0, 180);
		ellipse(point.x, point.y, d, d);
	}
}