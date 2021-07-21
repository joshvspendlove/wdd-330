import {makeRequest, Errors} from './authHelpers.js'
import Auth from './auth.js'

var errors = new Errors('errors');
var auth = new Auth(errors);


window.addEventListener("load", function(event) {
	document.getElementById('login').addEventListener('submit', function(event) {
		auth.login(getPosts)
		event.preventDefault();
	});
	
	document.getElementById('addPost').addEventListener('submit', function(event) {
		event.preventDefault();
		postComment()
		
	});
});


async function getPosts()
{
	var response = await makeRequest('posts', 'GET', null, auth.token);
	console.log(response)
	const posts = document.getElementById('posts')
	posts.innerHTML = ""
	for (var line in response)
	{
		var postJson = response[line]
		var post = document.createElement('tr')
		posts.appendChild(post)
		
		for (var index in postJson)
		{
			if (["title","content","userId"].includes(index))
			{
				var td = document.createElement('td')
				post.appendChild(td)
				
				td.innerHTML = postJson[index]
			}
			
		}
		
	}
	document.getElementById('addPost').classList.remove('hidden')
}

function postComment()
{
	
	var postContent = document.getElementById('comment').value
	var postTitle = document.getElementById('title').value
	var post = {
		title : postTitle,
		content : postContent
	}
	makeRequest('posts', 'POST', post, auth.token);
	getPosts()
}