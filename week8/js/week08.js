var canvas = document.getElementById('myCanvas');
var context = canvas.getContext("2d");



for (var i = 200; i >= 1; )
{
	for (var j = 0; j <= 200; )
	{
		
		context.moveTo(i, j);
		context.lineTo((3*j), (3*i));
		context.stroke();
		
		j = j + 20;
	}
	
	i = i - 20;
}
