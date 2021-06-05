const imgBasePath = "./";

const hikeList = [
  {
    name: "Bechler Falls",
    imgSrc: "falls.jpg",
    imgAlt: "Image of Bechler Falls",
    distance: "3 miles",
    difficulty: "Easy",
    description:
      "Beautiful short hike along the Bechler river to Bechler Falls",
    directions:
      "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road.Drive to the end of the Cave Falls road. There is a parking area at the trailhead."
  },
  {
    name: "Teton Canyon",
    imgSrc: "falls.jpg",
    imgAlt: "Image of Bechler Falls",
    distance: "3 miles",
    difficulty: "Easy",
    description: "Beautiful short (or long) hike through Teton Canyon.",
    directions:
      "Take Highway 33 East to Driggs. Turn left onto Teton Canyon Road. Follow that road for a few miles then turn right onto Staline Raod for a short distance, then left onto Alta Road. Veer right after Alta back onto Teton Canyon Road. There is a parking area at the trailhead."
  },
  {
    name: "Denanda Falls",
    imgSrc: "falls.jpg",
    imgAlt: "Image of Bechler Falls",
    distance: "7 miles",
    difficulty: "Moderate",
    description:
      "Beautiful hike through Bechler meadows river to Denanda Falls",
    directions:
      "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road. Drive to until you see the sign for Bechler Meadows on the left. Turn there. There is a parking area at the trailhead."
  }
];

export default class Hikes 
{
	constructor(parentId)
	{
		this.parentElement = document.getElementById(parentId);
		
		this.backButton = this.buildBackButton();
	}
	
	getAllHikes()
	{
		return hikeList;
	}
	
	getHikeByName(name)
	{
		return this.getAllHikes().find(hike => hike.name === name);
	}

	showAllHikes()
	{
		this.parentElement.innerHTML = "";
		for(var key in hikeList)
		{
			const hike = hikeList[key];
			var item = document.createElement('li');
			item.innerHTML = '<hr><h2>' + hike.name + '</h2><div class="image"><img src="' + hike.imgSrc + '" alt="' + hike.imgAlt + '"></div><div class="description"><div><h3>Distance</h3><p>' + hike.distance + '</p></div><div><h3>Difficulty</h3><p>' + hike.difficulty + '</p></div></div>';
			this.parentElement.appendChild(item);
		}
		
		this.addHikeListener();
	}
	
	addHikeListener() {
      const hikes = document.querySelectorAll('h2');
		
		for (var key in Array.from(hikes))
		{
			const hike = Array.from(hikes)[key];
			const name = hike.innerHTML;
			
			hike.parentElement.addEventListener('click', () => {
				this.showHike(name);
			});
		}
		
		this.backButton.addEventListener('click', () => {
			this.showAllHikes();
		});
    }
	
	
	showHike(name)
	{
		const hike = this.getHikeByName(name);
		this.parentElement.innerHTML = "";
		var item = document.createElement('li');
		var commentSection = document.createElement('div');

		item.innerHTML = '<h2>' + hike.name + '</h2><div class="image"><img src="' + hike.imgSrc + '" alt="' + hike.imgAlt + '"></div><div><div><h3>Distance</h3><p>' + hike.distance + '</p></div><div><h3>Difficulty</h3><p>' + hike.difficulty + '</p></div></div>';
		commentSection.innerHTML = '<textarea id="comment" row="25" col="50"></textarea><button id="addcomment" onclick="createComment(\'' + hike.name+ '\');">Add Comment</button>';
		this.parentElement.appendChild(this.backButton);
		this.parentElement.appendChild(item);
		this.parentElement.appendChild(commentSection);
	}
	
	buildBackButton() 
	{
		const backButton = document.createElement("button");
		backButton.innerHTML = "Back";
		return backButton;
	}
	
}