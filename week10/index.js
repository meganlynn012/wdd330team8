// import { getJSON, getLocation } from './utilities.js';


// getLocation().then((result) => {
//     let baseUrl = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2019-01-01&endtime=2019-02-02&latitude=';
//     baseUrl += result.coords.latitude + '&longitude=' + result.coords.longitude;
//     baseUrl += '&maxradiuskm=100';
//     return baseUrl;
// }).then((result) => {
//     getJSON(result);
// });
import QuakesController from './QuakesController.js';

const QUAKES = new QuakesController('#quakeList');
document.querySelector("#quakeDistance").addEventListener('change', (element) => {
    QUAKES.init(element.target.value);
})

QUAKES.init();