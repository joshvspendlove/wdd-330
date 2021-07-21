import {getPokemon} from './pokemonTools.js'
import {game,player} from './controller.js'
import {closeMenu,closeMessage,closeCharacterDetails,loadScores, setMenuTitle} from './utilities.js'
	
document.getElementById('menuBtn').addEventListener('click',function(event){
	game.pause();
});

window.onblur = function() {
	if (!game.isPaused)
		game.pause();
}

	
document.getElementById('selectPlayer').addEventListener('click',function(event){
	
	showPlayerSelection();
});

document.getElementById('showScores').addEventListener('click',function(event){
	loadScores();
});

document.getElementById('play').addEventListener('click',function(event){
	if (game.isGameOver())
	{
		game.newGame();	
	}
	closeMenu();
	
});
		

document.getElementById('detailsClose').addEventListener('click',function(event){
	closeCharacterDetails();
});

document.getElementById('menuClose').addEventListener('click',function(event){
	closeMenu();
});

document.getElementById('messageClose').addEventListener('click',function(event){
	closeMessage();
});

document.getElementById('customButton1').addEventListener('click',function(event){
	processCommand(event.target.dataset.command)
});

document.getElementById('customButton2').addEventListener('click',function(event){
	processCommand(event.target.dataset.command)
});

function processCommand(command)
{
	if (command == "players")
	{
		document.getElementById('messageModal').classList.add('hidden');
		showPlayerSelection();
	}
	else if (command == "showScores")
	{
		document.getElementById('messageModal').classList.add('hidden');
		document.getElementById('menuModal').classList.remove('hidden')
		loadScores();
	}
}

document.addEventListener("keydown", function(event) {
	if (event.code == "Space")
	{
		player.jump()
		event.preventDefault();
	}
});

document.getElementById('playarea').addEventListener("touchstart", function(event) {
	player.jump()
	event.preventDefault();
});

function showPlayerSelection()
{
	setMenuTitle("Player Selection")
	document.getElementById('playerSpecs').classList.add('hidden')
	document.getElementById("showScores").classList.add('hidden')
	document.getElementById('menuModal').classList.remove('hidden')
	document.getElementById('selectPlayer').classList.add("hidden")
	document.getElementById('backBtn').classList.remove("hidden")
	document.getElementById('navigation').classList.remove("hidden");
	document.getElementById('pokemon').classList.remove("hidden");
	selectCharacter();
}

function selectCharacter()
{
	//document.getElementById('characterModal').style.display = 'block';
	getPokemon("https://pokeapi.co/api/v2/pokemon/");
	
}










	