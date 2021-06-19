const hikeTypes = ["hike"]

export class Comment
{
	constructor(hikeName, message, type="hike")
	{
		this.hikeName = hikeName;
		this.content = message;
		this.date = Date();
		this.type = type;
	}
	toString()
	{
		return JSON.stringify(this);
	}
		
}

export function getAllComments()
{
	var comments = [];
	for (var typeIndex in hikeTypes)
	{	
		for (var comment in localStorage.get(hikeTypes[typeIndex]))
		{
			console.log(comment);
			comments.push(comment);
		}
	}
	return comments;
}

export function createComment(hikeName)
{
	console.log("Called");
	console.log(hikeName);
	var content = document.getElementById('comment').value;
	var comment = new Comment(hikeName,content);
	console.log(comment);
}

