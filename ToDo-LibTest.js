var assert = require('assert');
var lib = require('./ToDo-Lib.js').lib;
var fs = require('./ToDo-Lib.js').fs;

var writtenData ;
var test = {};

fs.writeFileSync = function(fileName,data){
	writtenData = data;
}

fs.readFileSync = function(fileName) {
	return writtenData;
}

test.should_Add_The_Task_Into_List = function () {
	var task = {work:'read some book'};
	var expectedResult = {remaining:[{work:'read some book'}],completed:[]};

	lib.addTask(task);

	assert.deepEqual(expectedResult,JSON.parse(writtenData));
}

test.should_not_add_the_task_when_the_same_task_exists = function () {
	var errorMessage = {msg:'Tasks Already Exists'};
	var task_1 = {work:'read some book'};
	var task_2 = {work:'read some book'};

	lib.addTask(task_1);
	fs.existsSync = function() {return true;}
	
	var expectedMessage = lib.addTask(task_2);

	assert.deepEqual(expectedMessage,errorMessage);
}

test.should_return_true_when_the_task_already_exists = function () {
	var existingTasks = [{work:'read some book'}];
	var task_2 = {work:'read some book'};

	var answer	= lib.exists(existingTasks,task_2);

	assert.ok(answer);
}


test.should_return_false_when_the_task_not_exists = function () {
	var existingTasks = [];
	var task_2 = {work:'read some book'};

	var answer	= lib.exists(existingTasks,task_2);

	assert.equal(answer,false);
}
 
exports.test = test;