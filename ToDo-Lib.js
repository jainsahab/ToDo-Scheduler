var fs = require('fs');
var lib = {};

lib.addTask = function(task) {
	var existingTasks = fs.existsSync('tasks.json') 
			? JSON.parse(fs.readFileSync('tasks.json','utf-8')) 
			: {completed:[],remaining:[]}
	if(lib.exists(existingTasks.remaining,task))
		return {msg:'Tasks Already Exists'}
	existingTasks.remaining.push(task);
	fs.writeFileSync('tasks.json',JSON.stringify(existingTasks));
}

lib.exists = function (existingTasks, taskToAdd) {
	var exists = false;
	var checkIfExist = function(singleTask){
		if(singleTask.work == taskToAdd.work)
			exists = true;
	}
	existingTasks.forEach(checkIfExist)
	return exists;
}

exports.fs = fs;
exports.lib = lib;
