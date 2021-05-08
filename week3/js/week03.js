var size;

function buildaTable()
{
	const MOUNTAINS = [
		{name: "Kilimanjaro", height: 5895, place: "Tanzania"},
		{name: "Everest", height: 8848, place: "Nepal"},
		{name: "Mount Fuji", height: 3776, place: "Japan"},
		{name: "Vaalserberg", height: 323, place: "Netherlands"},
		{name: "Denali", height: 6168, place: "United States"},
		{name: "Popocatepetl", height: 5465, place: "Mexico"},
		{name: "Mont Blanc", height: 4808, place: "Italy/France"}
	 ];

  const headers = Object.keys(MOUNTAINS[0]);
  for (var index in headers) {headers[index] = headers[index].toUpperCase();}
  var table = document.createElement('table');
  var columns = document.createElement('tr');
  for (var index in headers)
  {
    var col = document.createElement('th');
    col.innerHTML = headers[index];
    columns.appendChild(col);
  }
  table.appendChild(columns);
  
  for (var index in MOUNTAINS)
  {
    var mountain = document.createElement('tr');
    var mName = document.createElement('td');
    var height = document.createElement('td');
    var place = document.createElement('td');
    
    mName.innerHTML = MOUNTAINS[index].name;
    height.innerHTML = MOUNTAINS[index].height;
    place.innerHTML = MOUNTAINS[index].place;
	
	mName.style.textAlign = "center";
	height.style.textAlign = "right";
	place.style.textAlign = "center";
    
    mountain.appendChild(mName);
    mountain.appendChild(height);
    mountain.appendChild(place);
    table.appendChild(mountain);
	
  } 
  
  document.getElementById('mountains').appendChild(table);
}

function theCatsHat()
{
	let cat = document.querySelector("#cat");
	let hat = document.querySelector("#hat");

	let angle = 0;
	  let lastTime = null;
	  function animate(time) {
			if (lastTime != null) angle += (time - lastTime) * 0.001;
			lastTime = time;
			cat.style.top = (Math.sin(angle) * -40 + 40) + "px";
			cat.style.left = (Math.cos(angle) * 200 + 230) + "px";
			hat.style.top = (-Math.sin(angle) * 40 + 40) + "px";
			hat.style.left = (-Math.cos(angle) * 200 + 230) + "px";

		requestAnimationFrame(animate);
	  }
	  requestAnimationFrame(animate);
}

function balloon()
{
	document.addEventListener('keydown', balloonKeypressed);
	var balloon = document.getElementById('balloon');
	size = 10;
	balloon.style.fontSize = size + "px"
}

function balloonKeypressed(event)
{
	
	var balloon = document.getElementById('balloon');
	switch(event.key)
	{
		case 'ArrowUp':
			size += 10;
			balloon.style.fontSize = size + "px";
			event.preventDefault();
			break;
		case 'ArrowDown':
			if (size != 10)
			{
				size -= 10;
				balloon.style.fontSize = size + "px";
			}
			event.preventDefault();
			break;
		default:
			console.log('"' + event.key + '" is not supported');
	}
}

function showExamples()
{
	buildaTable();
	theCatsHat();
	balloon();
	
}
