class Vec
{
  constructor(x,y)
  {
   	this.x = x;
    this.y = y;
  }
  plus(vec)
  {
    return new Vec(this.x + vec.x,this.y + vec.y);
  }
  
  minus(vec)
  {
    return new Vec(this.x - vec.x, this.y - vec.y);
  }
  
  get length()
  {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  
  toString()
  {
	return "Vec {x: " + this.x + ", y: " + this.y + "}";
  }
  
}

let vectorResults = document.getElementById('vectorResults');
let results = "";
console.log(new Vec(1, 2).plus(new Vec(2, 3)));
let vecA = new Vec(1, 2).plus(new Vec(2, 3));
console.log(new Vec(1, 2).minus(new Vec(2, 3)));
let vecB = new Vec(1, 2).minus(new Vec(2, 3));
console.log(new Vec(3, 4).length);
let vecC = new Vec(3, 4);

results += vecA.toString() + "<br>";
results += vecB.toString() + "<br>";
results += vecC.length;

vectorResults.innerHTML = results;

