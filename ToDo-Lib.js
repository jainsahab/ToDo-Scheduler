var fs = require('fs');
var tasks = fs.existsSync('tasks.json') 
			? JSON.parse(fs.readFileSync('tasks.json','utf-8')) 
			: {completed:[],remaining:[]}
var lib = {};

lib.addTask = function(task) {
	tasks.remaining.push(task);
	fs.writeFileSync('tasks.json',JSON.stringify(tasks));
}

exports.fs = fs;
exports.lib = lib;