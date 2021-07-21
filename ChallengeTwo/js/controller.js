import {showMessage, saveScore} from './utilities.js'

class Game {
	constructor() {
		this.playarea = document.getElementById('playarea');
		this.playarea.width = 500;
		this.playarea.height = 500;
		this.context = this.playarea.getContext('2d');
		//this.background = document.getElementById('background')
		//this.context.drawImage(this.background,0,0,this.background.width,this.background.height,0,0, this.width,this.height);
		this.player = null;
		this.lowerObstacles = [];
		this.upperObstacles = [];
		this.obstacles = []
		this.landscape = [];
		this.fRate = 30;
		this.score = 0
		this._paused = false;
		this._isGameOver = true;
	}
	
	clear()
	{
		this.context.clearRect(0, 0, this.playarea.width, this.playarea.height)
	}
	
	pause()
	{
		document.getElementById('menuModal').classList.remove("hidden");
		this._paused = true
		this._stopTimers()
	}
	
	play()
	{
		if (!this._isGameOver)
		{
			this._paused = false
			this.interval = setInterval(nextFrame, 1000 / this.fRate);
			this.obstacleInterval = setInterval(addObstacles, 1000 * Math.round(Math.random() * (3) + 1.5))
		}
	}
	
	get isPaused()
	{
		return this._paused || this._isGameOver;
	}
	
	_stopTimers()
	{
		window.clearInterval(this.interval);
		window.clearInterval(this.obstacleInterval);
		this.obstacleInterval = null;
		this.interval = null;
	}
	
	gameover()
	{
		this._stopTimers()
		this.clear()
		this.obstacles = [];
		this._isGameOver = true;
		saveScore(this.score,this.player)
		showMessage("Game Over","Play Again", "players")
	}
	
	newGame()
	{
		
		this._isGameOver = false;
		this.score = 0;		
		document.getElementById('score').innerHTML = this.score;
		this.pause()
		this.clear()
		this.obstacles = [];
		this.player.newGame();
	}
	
	isGameOver()
	{
		return this._isGameOver;
	}
}

class Player {
	constructor(game)
	{
		this.name = ""
		this.x = 0;
		this.y = 0;
		this.width = 100;
		this.height = 100;
		this.weight = 0;
		this.offset = 25
		this.game = game;
		this.context = this.game.context;
		this.filename = null
		this.sprite = new Image()
		this.types = [];
		this.justHit = false
		this._hitDebounce = 0;
		this.health = 0;
	}
	
	jump()
	{
		
		if (this.types.includes("Flying"))
		{
			this.move(25);
		}
		else
		{
		
			if(this.weight < 100)
				this.move(20)
			else if(this.weight < 500)
				this.move(18)
			else if(this.weight < 1000)
				this.move(15)
			else if(this.weight >= 1000)
				this.move(12)
		}
	}
	
	move(yOffset)
	{
		if (((this.y - this.offset + this.height) + yOffset) < this.game.playarea.height)
			this.y += yOffset
		else 
		{
			var remainder = this.game.playarea.height - (this.y - this.offset + this.height)
			this.y += remainder
		}
		if (this.y == -1) 
			this.y = 0
		
		
	}
	
	draw()
	{		
		this.context.drawImage(this.sprite, this.x + (this.offset / 2), this.game.playarea.height - this.y - this.height + (this.offset/2));
		//document.getElementById('playerHealth').style.color = "green"
	
	}
	
	hit()
	{
		this.health -= 2;
		document.getElementById('playerHealth').style.width = this.health + "%";
	
		if (this.health == 0)
		{
			this.game.gameover()
			document.getElementById('playerHealth').style.width = this.health + "%";
		}
	}
	
	changeCharacterSprite(filename)
	{
		this.filename = filename;
		this.sprite.src = this.filename
	}
	
	newGame()
	{
		this.health = 100;
		this.y = 0;
		
		document.getElementById('playerHealth').style.width = this.health + "%";
	}
}


class Obstacle {
	constructor(game,height)
	{
		this.x = game.playarea.width;
		this.lowery = game.playarea.height;
		this.uppery = 0
		this.width = 50;
		this.upperheight = height
		this.lowerheight = -(game.playarea.height - height - 125);
		
		this._dead = false;
		this.context = game.context;
		this._hit = false;
	}
	
	move()
	{
		this.x = this.x - 5;
		if (this.x + this.width < 0)
		{
			this.die()
		}
			
	}
	
	hit()
	{
		this._hit = true;
	}
	
	get isHit()
	{
		return this._hit;
	}
	
	draw()
	{
		this.context.fillStyle = "green"
		this.context.fillRect(this.x, this.lowery, this.width, this.lowerheight);
		this.context.fillRect(this.x, this.uppery, this.width, this.upperheight);
		this.move();
	}
	
	get isDead()
	{
		return this._dead;
	}
	
	die()
	{
		this._dead = true;
	}
}

function nextFrame()
{
	
	game.clear()
	
	drawCharacters()
	drawObstacles()
	
	checkIntersection()
	removeDead()
		
}

function addObstacles()
{
	var height = Math.round(Math.random() * (200) + 50)
	var block = new Obstacle(game, height)
	game.obstacles.push(block);
}


function applyGravity(obj)
{
	var gravityEffect;
	/*if (obj.weight > 100)
		gravityEffect = -5;
	else if (obj.weight > 50)
		gravityEffect = -4;
	else if (obj.weight > 25)
		gravityEffect = -3;
	else 
		gravityEffect = -2;
	*/
	gravityEffect = -3;
	if(obj.y > 0)
	{
		if (obj.y + gravityEffect < 0 )
			obj.y = 0;
		else
			obj.move(gravityEffect);
	}
}

function drawCharacters()
{	
	game.player.draw()
	applyGravity(game.player)
}

function drawObstacles()
{
	for (let elem in game.obstacles)
	{
		var obstacle = game.obstacles[elem]
		if (!obstacle.isDead)
			obstacle.draw()
	}
}


function checkIntersection()
{
	var height = game.playarea.height;
	
	for (var elem in game.obstacles)
	{
		var obstacle = game.obstacles[elem]
		
		if (((player.x + player.width - 1.25 * player.offset) >= obstacle.x) && !((obstacle.x + obstacle.width - 1.25 * player.offset) < player.x))
		{
			if (player.y + player.height - player.offset <= height && (player.y + player.height - player.offset > height - obstacle.upperheight))
			{ 
				player.hit()
				obstacle.hit()
			}
			else if (height - player.y <= obstacle.lowery && height - player.y > obstacle.lowery + obstacle.lowerheight)
			{
				player.hit()
				obstacle.hit()
			}
		}
	}
}

function removeDead()
{
	for (var elem in game.obstacles)
	{
		var obstacle = game.obstacles[elem]
		
		if (obstacle.isDead)
		{
			if (!obstacle.isHit)
			{
				game.score++;
				document.getElementById('score').innerHTML = game.score;
			}
			game.obstacles.splice(elem, 1);
		}
	}		
}


export var game = new Game();
export var player = new Player(game);

game.player = player