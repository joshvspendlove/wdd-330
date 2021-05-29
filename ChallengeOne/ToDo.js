export default class ToDo
{
	constructor(task)
	{
		this.id = Date.now();
		this.content = task;
		this.completed = false;
	}
	
	complete()
	{
		this.completed = (this.completed === false ? true : false);
	}
	
	toString()
	{
		return JSON.stringify(this);
	}
	
}
