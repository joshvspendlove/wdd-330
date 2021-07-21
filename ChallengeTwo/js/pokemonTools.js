import {capitalize, closeCharacterSelection, closeCharacterDetails, closeMenu} from  './utilities.js'
import {game,player} from './controller.js'

export function getPokemon(url)
{
	fetch(url)
		.then(response => response.json())
		.then(data => {
			displayPokemonName(data.results)
			createNavigation(data)
		});
}

function displayPokemonName(data)
{
	
	var content = document.getElementById('pokemon');
	content.innerHTML = "";
	for (var index in data)
	{
		var pokemon = document.createElement('div');
		var pokeName = document.createElement('h2');
		pokemon.dataset.url = data[index].url;
		pokemon.setAttribute('id', data[index].name);
		pokemon.setAttribute('class', 'pokemon');
		pokeName.innerHTML = capitalize(data[index].name);
		
		pokemon.appendChild(pokeName);
		
		fetch(data[index].url)
			.then(response => response.json())
			.then(result => displayPokemonImage(result));
		content.appendChild(pokemon);
	
		pokemon.onclick = function(event) {displayDetails(event.target)}
	}
}

function displayPokemonImage(data)
{
	var pokemon = document.createElement('img');
	pokemon.setAttribute('src', data.sprites.front_default);
	pokemon.setAttribute('id', data.name+"_img");
	
	var pokeDiv = document.getElementById(data.name);
	pokeDiv.appendChild(pokemon);
}

function createNavigation(data)
{
	var navigation = document.getElementById('navigation')
	navigation.innerHTML = ""
	var prev = document.createElement('button')
	var next = document.createElement('button')
	
	prev.classList.add("halfBtn")
	next.classList.add("halfBtn")
	
	prev.innerHTML = "Previous"
	next.innerHTML = "Next"
	
	prev.addEventListener('click', function (event) {
		getPokemon(data.previous);
	});
	
	next.addEventListener('click', function (event) {
		getPokemon(data.next);
	});
	
	if (data.previous == null)
		prev.disabled = true;
	
	if (data.next == null)
		next.disabled = true;
	
	navigation.appendChild(prev)
	navigation.appendChild(next)
}

function displayDetails(selection)
{
	
	document.getElementById('detailsModal').classList.remove("hidden")
	var details = document.getElementById('details');
	var name = document.createElement('h2')
	var tableData = document.createElement('table')
	var image = document.createElement('img')
	var selectBtn = document.getElementById("characterSelection")
	
	
	tableData.classList.add('pkmonDetails');
	details.innerHTML = "";
	
	details.appendChild(tableData)
	details.appendChild(image);
	
	if (selection.getAttribute('class') == null)
	{
		selection = selection.parentNode;
	}
	
	fetch(selection.dataset.url)
		.then(response => response.json())
		.then(data => {
			selectBtn.onclick =  function(event) {
				loadNewPokemon(data)
				closeCharacterDetails();
				closeCharacterSelection();
			};
			selectBtn.innerHTML = "Play as " + capitalize(data['name']);
			image.src = data.sprites.front_default;
			['name', 'height', 'weight', 'types'].forEach(key => {
				var row = document.createElement('tr');
				var rowKey = document.createElement('td');
				var rowData = document.createElement('td');
				
				tableData.appendChild(row);
				row.appendChild(rowKey);
				row.appendChild(rowData);
				
				rowKey.innerHTML = capitalize(key) + ":"
				
				if (key == "types")
				{
					
					for (var index in data[key])
					{
						if (index > 0)
							rowData.innerHTML += ", " + capitalize(data[key][index].type.name)
						else 
							rowData.innerHTML = capitalize(data[key][index].type.name)
					}
				}
				else
				{
					rowData.innerHTML = capitalize(data[key]);
				}
			})
	});
	
}

function loadNewPokemon(data)
{
	document.getElementById('playerSpecs').classList.remove('hidden')
	
	game.newGame();
	player.name = capitalize(data.name)
	document.getElementById('playerName').innerHTML = player.name;
	
	player.changeCharacterSprite(data.sprites.front_default);
	player.weight = data.weight;
	
	if (data.height >= 15)
		player.offset = 25;
	else if (data.height >= 10)
		player.offset = 30;
	else
		player.offset = 35;	
	
	player.types = []
	for (var index in data.types)
		player.types.push(capitalize(data.types[index].type.name));
	
	let playerDetails = document.getElementById('playerDetails')
	playerDetails.innerHTML = ""
	
	let playerImage = document.createElement('img')
	playerDetails.appendChild(playerImage);
	playerImage.src = player.filename;
	
	let playerDTable = document.createElement('table');
	playerDTable.classList.add('pkmonDetails');
	playerDetails.appendChild(playerDTable);
	
	['name', 'height', 'weight', 'types'].forEach(key => {
		var row = document.createElement('tr');
		var rowKey = document.createElement('td');
		var rowData = document.createElement('td');
		
		playerDTable.appendChild(row);
		row.appendChild(rowKey);
		row.appendChild(rowData);
		
		rowKey.innerHTML = capitalize(key) + ":"
		
		if (key == "name")
			rowData.innerHTML = player.name;
		else if(key == "height")
			rowData.innerHTML = player.height;
		else if(key == "weight")
			rowData.innerHTML = player.weight;
		else if(key == "types")
			rowData.innerHTML = player.types.join(", ");
		
			
	})
}

