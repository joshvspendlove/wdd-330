import {game,player} from './controller.js'

const gameStorage = window.localStorage
var scores = gameStorage.getItem('scores') || {}
if (Object.keys(scores).length !== 0)
	scores = JSON.parse(scores)



getElement('backBtn').addEventListener('click',function(event) {
			
		closeCharacterSelection();
		closeScoreBoard()
	});







export function capitalize(str)
{
	if (typeof (str) === "string")
	{
		str = str.substring(0,1).toUpperCase() + str.substring(1);
	}
	return str;
}

export function closeCharacterDetails()
{
	hide('detailsModal')
}


export function closeCharacterSelection()
{
	
	setMenuTitle("Menu")
	hide('backBtn')
	show("showScores")
	show('selectPlayer')
	
	hide('navigation')
	hide('pokemon')
	if (player.name != "")
		show('playerSpecs')
}

function closeScoreBoard()
{
	hide('scoreboard')
	hide('backBtn')
	show("showScores")
	show('selectPlayer')
	if (player.name != "")
		show('playerSpecs')
}

export function closeMessage()
{
	hide("messageModal")
	
}

export function closeMenu()
{
	hide('menuModal')
	if (player.filename != null)
		game.play()
}

export function showMessage(message,btnText,btnKey,btn2Text,btn2Key)
{
	show('messageModal')
	getElement('message').innerHTML = message;
	
	getElement('customButton1').innerHTML = btnText
	getElement('customButton1').dataset.command = btnKey;
	
	if (btn2Text != null)
	{
		getElement('customButton2').innerHTML = btn2Text
		getElement('customButton2').dataset.command = btn2Key;
	}
}

export function setMenuTitle(title)
{
	getElement('title').innerHTML = title;
}


export function saveScore(score, player)
{
	var currentScore = scores[player.name]
	if (score > currentScore || currentScore == undefined)
	{
		let username = prompt("You beat " + player.name + "'s High Score. What is your Name?", "Red") || "Red"
		scores[player.name] = {}
		scores[player.name]["user"] = username
		scores[player.name]["score"] = score	
		gameStorage.setItem('scores', JSON.stringify(scores))
	}
}

export function loadScores()
{
	setMenuTitle("High Scores")
	hide('playerSpecs')
	hide("showScores")
	hide('selectPlayer')
	show('backBtn')
	show('scoreboard')
	
	buildScoreboard()
}


function buildScoreboard()
{
	var scoreboard = getElement('scoreboard')
	scoreboard.innerHTML = "";
	
	let headers = document.createElement('tr');
	let charName = document.createElement('th');
	let pName = document.createElement('th');
	let score = document.createElement('th');
	
	headers.classList.add("scoreHeaders")
	
	scoreboard.appendChild(headers)
	headers.appendChild(charName)
	headers.appendChild(pName)
	headers.appendChild(score)
	
	charName.innerHTML = "Character"
	pName.innerHTML = "Player Name"
	score.innerHTML = "Score"
	
	for (var pkmon in scores)
	{
		let tr = document.createElement('tr');
		let pkmonName = document.createElement('td');
		let playerName = document.createElement('td');
		let playerScore = document.createElement('td');
		
		scoreboard.appendChild(tr);
		tr.appendChild(pkmonName);
		tr.appendChild(playerName);
		tr.appendChild(playerScore);
		
		pkmonName.innerHTML = pkmon;
		playerName.innerHTML = scores[pkmon].user
		playerScore.innerHTML = scores[pkmon].score
		
	}
}



function hide(id)
{
	document.getElementById(id).classList.add('hidden')
}

function show(id)
{
	document.getElementById(id).classList.remove("hidden")
}

function getElement(id)
{
	return document.getElementById(id);
}

