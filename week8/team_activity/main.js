
function getPokemon(url)
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
	
	var content = document.getElementById('content');
	content.innerHTML = "";
	for (var index in data)
	{
		var pokemon = document.createElement('div');
		var pokeName = document.createElement('h2');
		pokemon.setAttribute('id', data[index].name);
		pokemon.setAttribute('class', 'pokemon');
		pokeName.innerHTML = data[index].name;
		
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

getPokemon("https://pokeapi.co/api/v2/pokemon/");