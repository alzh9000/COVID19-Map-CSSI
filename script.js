let data;
let myMap;
let canvas;
let myLatitude;
let myLongitude;
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(showPosition);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}
    
function showPosition(position) {
    myLatitude = position.coords.latitude;
		myLongitude = position.coords.longitude;
		return myLongitude,myLongitude;
}
getLocation();


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
		fill('red')
		ellipse(point.x, point.y, d, d);
		fill("blue")
		ellipse(myLatitude,myLongitude,10,10)
	}
	
	
	console.log(myLatitude)
}
