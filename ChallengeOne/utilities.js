import ToDo from './ToDo.js';
import {save,load} from './ls.js';

var todo_list;
var todo_list_json;
var FILTER;
const FILTERS = ["all","active","complete"];


window.addEventListener('load', (event) => {
  setup();
});


export function setup()
{
	document.getElementById('addTask').addEventListener('click', addTask)
	todo_list = [];
	
	if (load('todo_list') !== null)
	{
		var temp_list = JSON.parse(load('todo_list'));
		for (var key in temp_list)
		{
			var temp_task = temp_list[key];
			var task = new ToDo(temp_task.content);
			task.id = temp_task.id;
			task.completed = temp_task.completed;
			todo_list.push(task);
		}
	}
	
	document.getElementById('all').addEventListener('click',(event) => {
		setFilter('all');
	});
	document.getElementById('active').addEventListener('click',(event) => {
		setFilter('active');
	});
	document.getElementById('complete').addEventListener('click',(event) => {
		setFilter('complete');
	});
	
	setFilter("all");
	
}

function addTask()
{
	const taskField = document.getElementById('task')
	var task = taskField.value;
	if (task)
	{
		var todo = new ToDo(task);
		todo_list.push(todo);
		saveList();
		
		taskField.value = "";

		filterTasks();
	}
	
}

function saveList()
{
	save('todo_list',JSON.stringify(todo_list));
}

function displayList(taskList)
{
	var list = document.getElementById('list');
	list.innerHTML = "";
	for(var key in taskList)
	{
		var task = taskList[key];
		var taskRow = document.createElement("tr");
		var taskContent = document.createElement("div");
		var taskCheck = document.createElement("input")
		var taskDetails = document.createElement("p");
		var taskDelete = document.createElement('button');
		
		
		taskContent.appendChild(taskCheck);
		taskContent.appendChild(taskDetails);
		taskContent.appendChild(taskDelete);
		taskRow.appendChild(taskContent);
		list.appendChild(taskRow);
		
		taskContent.setAttribute("id",task.id);
		if (task.completed)
		{
			taskContent.setAttribute("class","taskContent taskComplete");
		}
		else 
		{
			taskContent.setAttribute("class","taskContent");
		}
		
		taskDetails.setAttribute("class","taskDetails");
		
		taskCheck.setAttribute("type", "checkbox");
		taskCheck.setAttribute("class","taskCheck");
		taskCheck.checked = task.completed;
		
		taskDelete.setAttribute("class","taskDelete");
	
		
		taskCheck.addEventListener("change", function(event) {
			const taskId = event.target.parentElement.getAttribute("id");
			var cTask = todo_list.find(t => t.id == taskId);
		
			cTask.complete();
			
			saveList();
			setCount();
			filterTasks();
		});
		
		taskDelete.addEventListener("click", function() {
			const taskId = event.target.parentElement.getAttribute("id");
			const index = todo_list.indexOf(todo_list.find(t => t.id == taskId));
			
			if (index > -1) 
			{
				todo_list.splice(index, 1);
			}
			saveList();
			filterTasks();
			setCount();
		});
		
		
		taskDetails.innerHTML = task.content;
		taskDelete.innerHTML = "&#10005;";
		
		
	}
	setCount()
}


function setCount()
{
	var count = 0;
	for(var key in todo_list)
	{
		if (todo_list[key].completed == false)
		{
			count += 1;
		}
	}
	document.getElementById("countTasks").innerHTML = count + " Tasks Left";
}


function setFilter(filter)
{
	FILTER = filter;
	
	for (var key in FILTERS)
	{
		var cFilter = FILTERS[key]
		
		if (cFilter !== FILTER)
			document.getElementById(cFilter).removeAttribute("class");
		else 
			document.getElementById(cFilter).setAttribute("class","activeFilter");
	}
	
	filterTasks();
}


function filterTasks()
{
	if (FILTER === "all")
	{
		displayList(todo_list);
		return;
	}
	var filter = (FILTER === "complete" ? true : false);
	var filteredTasks = []
	
	for(var key in todo_list)
	{
		var task = todo_list[key];
		
		if (task.completed == filter)
		{
			filteredTasks.push(task);
		}
	}
	
	displayList(filteredTasks);
}
