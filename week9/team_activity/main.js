const keys = document.getElementsByClassName('key');
const tracks = document.getElementsByTagName('audio');
const kbd = document.getElementsByTagName('kbd');

var levels = [0, 0, 0 ,0, 0, 0, 0, 0, 0];

function getKeyElm(elem)
{
	while(typeof(elem.dataset.key) == "undefined")
		{
			elem = elem.parentNode
		}
	return elem;
}

function getKeyByData(key)
{
	for (var i = 0; i < keys.length; i++)
	{
		if (keys[i].dataset.key == key)
			return keys[i]
	}
}

function triggerSound(elem)
{
	for (var j = 0; j < tracks.length; j++) 
		{
			if (tracks[j].dataset.key == elem.dataset.key)
			{
					tracks[j].currentTime = 0
					tracks[j].play()
			}
		}
}
function dropElem(elem)
{
	var index = Array.prototype.slice.call(keys).indexOf(elem);
			
			if (levels[index] < 100)			
				levels[index] = levels[index] + 10
			else
				levels[index] = 0
			elem.style.transform = `translate(0,${levels[index]}px)`;
}

function addEventListeners()
{
	for (var i = 0; i < keys.length; i++)
	{
		keys[i].addEventListener('click', function(event) {
			var elem = getKeyElm(event.target)	
			triggerSound(elem)
			dropElem(elem)
			
			
		}, false);
		
		for (var j = 0; j < tracks.length; j++)
		{
			if (tracks[j].dataset.key == keys[i].dataset.key)
			{
				tracks[j].addEventListener('play',(e) => {
					getKeyByData(e.target.dataset.key).setAttribute('class', "playing key")
					
				});
				
				tracks[j].addEventListener('ended',(e) => {
					getKeyByData(e.target.dataset.key).setAttribute('class', "key")
				});
			}
		}
	}

	window.addEventListener('keydown', (e) => {
		for (var j = 0; j < kbd.length; j++) 
		{
			if (e.key.toUpperCase() == kbd[j].innerHTML.toUpperCase())
			{
				var elem = getKeyElm(kbd[j])
				triggerSound(elem)
				dropElem(elem)
			}
		}
	});
}


window.addEventListener('load', (e) => {addEventListeners()})
