import { getJSON, getLocation } from "./utilities.js";
import QuakesController from "./QuakesController.js";
const myQuakesController = new QuakesController('#quakeList');

document.getElementById("radius").addEventListener("change", function(event) {
	myQuakesController.init(event.target.value);
});

