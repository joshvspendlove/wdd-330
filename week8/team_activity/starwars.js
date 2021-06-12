var apiStringInitial = "https://swapi.dev/api/people"; // Initial api string
var apiStringNext = "";  // Make the next and prior api strings global
var apiStringPrior = "";
var firstRun = true;  // Used to determine the first time run


// Get the initial page of characters
// This only runs on the first load
async function getInitial() {
  // use fetch to get a response object
  // then retrieve the JSON data object
  const response = await fetch(apiStringInitial);
  const jsonData = await response.json();

  loadTable(jsonData);
}


// Get the next group of characters
async function getNext() {
  // use fetch to get a response object
  // then retrieve the JSON data object
  const response = await fetch(apiStringNext);
  const jsonData = await response.json();

  loadTable(jsonData);
}


// Get the prior group
async function getPrior() {
  // use fetch to get a response object
  // then retrieve the JSON data object
  const response = await fetch(apiStringPrior);
  const jsonData = await response.json();

  loadTable(jsonData);
}


// Load the JSON object data into the table
function loadTable(jsonData) {
  // store the next and prior api strings
  // for paging through the data sets
  apiStringNext = jsonData.next;
  apiStringPrior = jsonData.previous;

  // get the table body so we can build the rows and columns
  let characterTableBody = document.getElementById("characterTableBody");

  // Delete the rows from prior repos, if any
  for (var i = characterTableBody.rows.length; i > 0; i--) {
    characterTableBody.deleteRow(i - 1);
  }

  // loop through the results, inserting them into the table
  jsonData.results.forEach(person => {
    newRow = characterTableBody.insertRow(characterTableBody.rows.length);
    // create and load name into the first column
    newCell1 = newRow.insertCell(0);
    newCell1.className = "tableBorder";
    newCell1.innerHTML = person.name;
    // create a button to display the details
    // and add an event listener to execute the displayDetails() function
    detailsButton = document.createElement("button");
    detailsButton.setAttribute('id', person.url);
    detailsButton.appendChild(document.createTextNode("Display Details"));
    detailsButton.addEventListener("click", displayDetails);
    // create and load the button into the second column
    newCell2 = newRow.insertCell(1);
    newCell2.className = "tableBorder";
    newCell2.appendChild(detailsButton);
  });



  // This is a placeholder for the display details function.
  // The api url for the person in each row of the table 
  // is loaded into that rows button id attribute.
  //
  // It's embedded in this function so it can be added 
  // as an event listener and have the ability to pull 
  // the button id from the button that is clicked
  function displayDetails(event) {
	  
    document.getElementById('detailsModal').style.display='block';
	fetch(event.target.id)
	.then(response => response.json())
	.then(results => { console.table(results); parseResults(results)})
  }
  
 
  // if the api next string is null, disable the button
  if (apiStringNext === null) {
    document.getElementById("btnNext").disabled = true;
  } else {
    document.getElementById("btnNext").disabled = false;
  }

  // if the api prior string is null, disable the button
  if (apiStringPrior === null) {
    document.getElementById("btnPrior").disabled = true;
  } else {
    document.getElementById("btnPrior").disabled = false;
  }

}

function parseResults(results)
{
	desiredDetails = [{'name':'Name'},{'gender':'Gender'},{'height': 'Height'}, {'mass': 'Mass'},{'birth_year':'Birth Year'}]
	
	const details = document.getElementById('details');
	details.innerHTML = "";
	
	for( var i = 0; i < desiredDetails.length; i++)
	{
		for (var key in desiredDetails[i])
		{
			var elm = document.createElement('p');
			elm.innerHTML = desiredDetails[i][key] + " - " + (results[key]);
			details.appendChild(elm);
		}
	}
	
}

 function closeDetails()
  {
	   document.getElementById('detailsModal').style.display='none';
  }

// Only do this on the first run
if (firstRun) {
  firstRun = false;
  getInitial();
}
