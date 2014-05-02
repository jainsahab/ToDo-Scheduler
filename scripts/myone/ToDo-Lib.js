var fs = require('fs');
var lib = {};

var getExistingTasks = function() {
	return fs.existsSync('../tasks.json') 
			? JSON.parse(fs.readFileSync('../tasks.json','utf-8')) 
			: {completed:[],remaining:[],totalTaskGenerated:0}
}

lib.addTask = function(work) {
	var existingTasks = getExistingTasks();
	if(lib.exists(existingTasks.remaining,work))
		return {msg:'Tasks Already Exists'}
	var task = {work:work};
	task.id = ++existingTasks.totalTaskGenerated;
	existingTasks.remaining.push(task);
	fs.writeFileSync('../tasks.json',JSON.stringify(existingTasks));
}

lib.exists = function (existingTasks, taskToAdd) {
	var exists = false;
	var checkIfExist = function(singleTask){
		if(singleTask.work == taskToAdd)
			exists = true;
	}
	existingTasks.forEach(checkIfExist)
	return exists;
}

lib.getIndexOfElement = function (remainingTasks,id) {
	var index = 0;
	for (var i = 0; i < remainingTasks.length; i++) {
		var task = remainingTasks[i];
		if(task.id == id)
			return index;
		index++;
	};
}

lib.moveToDone = function(id) {
	var existingTasks = getExistingTasks();
	var indexOfTaskCompleted = lib.getIndexOfElement(existingTasks.remaining,id);

	existingTasks.completed.push(existingTasks.remaining[indexOfTaskCompleted]);
	existingTasks.remaining.splice(indexOfTaskCompleted,1);

	fs.writeFileSync('../tasks.json',JSON.stringify(existingTasks));
}

lib.deleteTaskFromRemaining = function(id) {
	var existingTasks = getExistingTasks();

	var indexOfTaskCompleted = lib.getIndexOfElement(existingTasks.remaining,id);
	existingTasks.remaining.splice(indexOfTaskCompleted,1);
	fs.writeFileSync('../tasks.json',JSON.stringify(existingTasks));	
}

lib.deleteTaskFromCompleted = function(id) {
	var existingTasks = getExistingTasks();
	
	var indexOfTaskCompleted = lib.getIndexOfElement(existingTasks.completed,id);
	existingTasks.completed.splice(indexOfTaskCompleted,1);
	fs.writeFileSync('../tasks.json',JSON.stringify(existingTasks));	
}
	exports.fs = fs;
	exports.lib = lib;
