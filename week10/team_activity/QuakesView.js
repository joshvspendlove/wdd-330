// Quake View handler
export default class QuakesView {

  //
  // Render the html for the quake list
  //
  renderQuakeList(quakeList, listElement) {
    // build a list of the quakes...include the title and time of each quake 
    // then append the list to listElement. You should also add the id of the quake 
    // record as a data- property to the li. ie. <li data-id="">
    listElement.innerHTML = "<tr><th>Time</th><th>Date</th><th>Quake Data</th></tr>";
    quakeList.features.forEach(quake => {
      const tr = document.createElement("tr");
	  const date = new Date(quake.properties.time)
      tr.setAttribute('data-id', quake.id);
      tr.innerHTML = `<td>${date.toLocaleTimeString()}</td><td>${date.toDateString()}</td><td>${quake.properties.title}</td>`;
      listElement.appendChild(tr);
    });
  }

  //
  // Render the html for the details of a specific quake
  //
  renderQuake(quake, element) {
    const quakeProperties = Object.entries(quake.properties);
    // for the provided quake make a list of each of the properties associated with it. Then append the list to the provided element. Notice the first line of this method. Object.entries() is a slick way to turn an object into an array so that we can iterate over it easier! 
  }
}
