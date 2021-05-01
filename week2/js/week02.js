function displayTriangle(size)
{
	console.log("Displaying Triangle");
	var triangleDisplay = document.getElementById('triangle');
	
	triangleDisplay.value = "";
	
	for(var i = 0; i < size; i++)
	{
		var line = "";
		for(var j = 0; j < i; j++)
		{
			line += "#"; 
		}
		console.log(line);
		triangleDisplay.value += line + "\n";
	}
}

//Fizzbuzz
function displayFizzbuzz(size)
{
	console.log("Displaying Fizzbuzz");
	
	var fizzbuzzDisplay = document.getElementById('fizzbuzz');
	
	fizzbuzzDisplay.value = "";
	
	for (var i = 1; i <= size; i++)
	{
	  if ((i % 3 == 0) && (i % 5 == 0))
	  {
		console.log("Fizzbuzz");
		fizzbuzzDisplay.value += "Fizzbuzz" + "\n";
	  }
	  else if (i % 3 == 0)
	  {
		console.log("Fizz");
		fizzbuzzDisplay.value += "Fizz" + "\n";
	  }
	  else if (i % 5 == 0)
	  {
		console.log("Buzz");
		fizzbuzzDisplay.value += "Buzz" + "\n";
	  }
	  else 
	  {
		console.log(i);
		fizzbuzzDisplay.value += i + "\n";
	  }
	}
}


//Chessboard
function displayChessboard(size)
{
	var chessboardDisplay = document.getElementById('chessboard');
	
	chessboardDisplay.value = "";
	
	for(var i = 0; i < size; i++)
	{
		var line = "";
		for(var j = 0; j < size; j++)
		{
			if (i % 2 == 0)
			{
				if (line.length % 2 == 0)
					line += "#";
				else
					line += " ";
			}
			else
			{
			  if (line.length % 2 == 0)
				line += " ";
			  else
				line += "#";
			}
		}
	  console.log(line);
	  chessboardDisplay.value += line + "\n";
	}
}

function showExamples()
{
	displayTriangle(document.getElementById('triangle_size').value);
	displayFizzbuzz(document.getElementById('fizzbuzz_size').value);
	displayChessboard(document.getElementById('chessboard_size').value);
}
