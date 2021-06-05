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
      "Take Highway 33 East to Driggs. Turn left onto Teton Canyon Road. Follow that road for a few miles then turn right onto Stateline Road for a short distance, then left onto Alta Road. Veer right after Alta back onto Teton Canyon Road. There is a parking area at the trailhead."
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

var comments = JSON.parse(localStorage.getItem('comments')) || [];

const imgBasePath = "./images/";
//on load grab the array and insert it into the page on load

// Yet to be done:
// 1 - add logic for the addComment() method
// 2 - add logic to store the comments to local storage

// beginning of our Hikes class
export default class Hikes {
  constructor(elementId) {
    this.parentElement = document.getElementById(elementId);
    // we need a back button to return back to the list. This will build it and hide it. When we need it we just need to remove the 'hidden' class
    this.backButton = this.buildBackButton();
    this.commentButton = this.buildCommentButton();
  }
  // why is this function necessary?  hikeList is not exported, and so it cannot be seen outside of this module. I added this in case I ever need the list of hikes outside of the module. This also sets me up nicely if my data were to move. I can just change this method to the new source and everything will still work if I only access the data through this getter.
  getAllHikes() {
    return hikeList;
  }


  // get the hike comments
  filterCommentsByName(hikeName) {
    console.log(hikeName);
    let hikeComments = [];
    let nameOfHike = "";

    for (const key in comments) {
      nameOfHike = comments[key].name;
      console.log(nameOfHike);
      console.table(comments[key]);

      if (nameOfHike === hikeName) {
        hikeComments.push(comments[key]);
      }
    }

    return hikeComments;
  }


  // For the first stretch we will need to get just one hike.
  getHikeByName(hikeName) {
    return this.getAllHikes().find(hike => hike.name === hikeName);
  }
  //show a list of hikes in the parentElement
  showHikeList() {
    this.parentElement.innerHTML = "";
    for (const key in hikeList) {

      const hike = hikeList[key];
      const item = document.createElement("li");
      item.innerHTML = ` <h2>${hike.name}</h2>
    <div class="img"><img src="${imgBasePath}${hike.imgSrc}" alt="${hike.imgAlt}"></div>
    <div class="description">
            <div>
                <h3>Distance</h3>
                <p>${hike.distance}</p>
            </div>
            <div>
                <h3>Difficulty</h3>
                <p>${hike.difficulty}</p>
            </div>
    </div>`;
      this.parentElement.appendChild(item);
    }
    this.addHikeListener()
  }

  // show one hike with full details in the parentElement
  showOneHike(hikeName) {
    const hike = this.getHikeByName(hikeName);
    console.log(hikeName);
    let hikeComments = this.filterCommentsByName(hikeName);
    this.parentElement.innerHTML = "";
    const item = document.createElement("li");

    item.innerHTML = ` <h2 id="hikeName">${hike.name}</h2>
    <div class="image"><img src="${imgBasePath}${hike.imgSrc}" alt="${hike.imgAlt}"></div>
    <div class="description">
      <div>
        <h3>Distance</h3>
        <p>${hike.distance}</p>
      </div>
      <div>
        <h3>Difficulty</h3>
        <p>${hike.difficulty}</p>
      </div>
		  <div>
        <h3>Description</h3>
        <p>${hike.description}</p>
      </div>
			<div>
        <h3>Directions</h3>
        <p>${hike.directions}</p>
      </div>
    </div>`;

    // this is where we get the comments for this hike
    let listOfComments = "";

    for (const key in hikeComments) {
      const hikeComment = hikeComments[key];
      listOfComments += `<p>${hikeComment.date} - "${hikeComment.content}"</p>`
    }

    item.innerHTML = item.innerHTML + `<div> <h3>Comments</h3> ${listOfComments} </div>`;
    this.parentElement.appendChild(item);
    this.parentElement.appendChild(this.commentButton);
    this.parentElement.appendChild(this.backButton);
  }

  // in order to show the details of a hike ontouchend we will need to attach a listener AFTER the list of hikes has been built. The function below does that.
  addHikeListener() {
    const hikes = document.querySelectorAll('h2');

    for (var key in Array.from(hikes)) {
      const hike = Array.from(hikes)[key];
      const name = hike.innerHTML;

      hike.parentElement.addEventListener('click', () => {
        this.showOneHike(name);
      });
    }

    this.backButton.addEventListener('click', () => {
      this.showHikeList();
    });
  }

  // build the back button
  buildBackButton() {
    const backButton = document.createElement("button");
    backButton.innerHTML = "Back to Home";
    return backButton;
  }

  // build the comment button
  buildCommentButton() {
	  const newComment = document.createElement('div');
	  const comment = document.createElement('input');
	  comment.setAttribute('type',"text");
	  comment.setAttribute('id',"newComment");
    const commentButton = document.createElement("button");
	newComment.appendChild(comment);
	newComment.appendChild(commentButton);
    commentButton.innerHTML = "Add Comment";
    commentButton.addEventListener('click', () => {
      this.addComment();
    })
    return newComment;
  }

  // !!! This needs to be developed !!!
  addComment() {
	  const content = document.getElementById('newComment').value;
	  document.getElementById('newComment').value = "";
	  const hikeName = document.getElementById('hikeName').innerHTML;
	  var comment = { type:"hike", content:content, date: new Date().toLocaleDateString(), name:hikeName}
	  comments.push(comment);
	  
	  localStorage.setItem('comments',JSON.stringify(comments));
	  this.showOneHike(hikeName)
  }
}
