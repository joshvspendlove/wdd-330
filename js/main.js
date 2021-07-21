const links = [
	{
		label: "Week 1 Notes",
		url: "week1/"
	},
	{
		label: "Week 2 Notes",
		url: "week2/"
	},
	{
		label: "Week 3 Examples",
		url: "week3/"
	},
	{
		label: "Week 4 Notes",
		url: "week4/"
	},
	{
		label: "Week 5 Notes",
		url: "week5/"
	},
	{
		label: "Challenge One",
		url: "ChallengeOne/"
	},
	{
		label: "Week 7 Notes",
		url: "week7/"
	},
	{
		label: "Week 8 Notes",
		url: "week8/"
	},
	{
		label: "Week 9 Notes",
		url: "week9/"
	},
	{
		label: "Week 10 Notes",
		url: "week10/"
	},
	{
		label: "Challenge Two: Pillar Evader (Heroku)",
		url: "http://pillar-evader.herokuapp.com/"
	},
	{
		label: "Challenge Two: Pillar Evader (Local)",
		url: "ChallengeTwo/"
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