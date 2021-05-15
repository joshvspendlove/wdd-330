const links = [
	{
		label: "Week 1 Notes",
		url: "week1/index.html"
	},
	{
		label: "Week 2 Notes",
		url: "week2/index.html"
	},
	{
		label: "Week 3 Examples",
		url: "week3/index.html"
	},
	{
		label: "Week 4 Notes",
		url: "week4/index.html"
	}
]

function buildMenu()
{
	var menu = document.getElementById('menu-items');
	for (week in links)
	{
		var menu_item = document.createElement('li');
		var menu_link = document.createElement('a');
		
		menu_link.setAttribute('href', links[week].url);
		menu_link.innerHTML = links[week].label;
		
		menu_item.appendChild(menu_link);
		menu.appendChild(menu_item);
	}
}