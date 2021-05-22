class MultiplicatorUnitFailure extends Error {}
var attempts = 0;

function primitiveMultiply(a, b) {
  
  if (Math.random() < 0.2) {
	return a * b;
  } else {

    throw new MultiplicatorUnitFailure("Klunk");
  }
  
}

function reliableMultiply(a, b) {
 
  try
  {
	  attempts = attempts + 1
	  
	  return primitiveMultiply(a,b);
  }
  catch(error)
  {
	  if (!(error instanceof MultiplicatorUnitFailure)) 
		throw error;
	  else
		  return reliableMultiply(a,b);
  }
}

document.getElementById('retry_results').innerHTML = "Result: " + reliableMultiply(8, 8) + "<br>Attempts: " + attempts;
// → 64


var box_results = document.getElementById('box_results');

const box = {
  locked: true,
  unlock() { this.locked = false; },
  lock() { this.locked = true;  },
  _content: [],
  get content() {
    if (this.locked) throw new Error("Locked!");
    return this._content;
  }
};

function withBoxUnlocked(body) {
  var isLocked = box.locked;
  
  try {
    box.unlock();
    body();
  }
  catch(error) {
   box_results.innerHTML = error + "<br>"; 
  }
  finally
  {
    if (isLocked)
      box.lock();
  }
  
}

withBoxUnlocked(function() {
  box.content.push("gold piece");
});

try {
  withBoxUnlocked(function() {
    throw new Error("Pirates on the horizon! Abort!");
  });
} catch (e) {
  console.log("Error raised: " + e);
}
box_results.innerHTML += "The Box is Locked: " + box.locked;
// → true