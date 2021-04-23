const links = [
	{
		label: "Week1 notes",
		url: "week1/index.html"
	}
]

function buildMenu()
{
	var menu = document.getElementById('menu-items');
	for (week in links)
	{
		var menu_item = document.createElement('li');
		var menu_link = document.createElement('a');
		
		menu_link.setAttribute('href', week.url);
		menu_link.innerHTML = week.label;
		
		menu_item.appendChild(menu_link);
		menu.appendChild(menu_item);
	}
}