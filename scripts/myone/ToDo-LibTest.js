var assert = require('assert');
var lib = require('./ToDo-Lib.js').lib;
var fs = require('./ToDo-Lib.js').fs;

var writtenData ;
var test = {};

fs.writeFileSync = function(fileName,data){
	writtenData = data;
}

fs.readFileSync = function(fileName,encoding) {
	return writtenData;
}

fs.existsSync = function() {
	return false;
}

test.setup = function() {
	writtenData = JSON.stringify({completed:[],remaining:[],totalTaskGenerated:0});
}

test.should_Add_The_Task_Into_List = function () {
	var task = 'read some book';
	var expectedResult = {remaining:[{work:'read some book',id:1}],completed:[],totalTaskGenerated:1};

	lib.addTask(task);

	assert.deepEqual(expectedResult,JSON.parse(writtenData));
}

test.should_not_add_the_task_when_the_same_task_exists = function () {
	var errorMessage = {msg:'Tasks Already Exists'};
	var task_1 = 'read some book';
	var task_2 = 'read some book';

	lib.addTask(task_1);
	fs.existsSync = function() {return true;}
	
	var expectedMessage = lib.addTask(task_2);

	assert.deepEqual(expectedMessage,errorMessage);
}

test.should_return_true_when_the_task_already_exists = function () {
	var existingTasks = [{work:'read some book'}];
	var task_2 = 'read some book';

	var answer	= lib.exists(existingTasks,task_2);

	assert.ok(answer);
}


test.should_return_false_when_the_task_not_exists = function () {
	var existingTasks = [];
	var task_2 = 'read some book';

	var answer	= lib.exists(existingTasks,task_2);

	assert.equal(answer,false);
}

test.should_update_the_totalTaskGenerated_as_a_task_added_to_the_scheduler = function() {
	var task_1 = 'read some book';
	var task_2 = 'play Cricket';
	lib.addTask(task_1);
	lib.addTask(task_2);
	var expectedResult = {remaining:[{work:'read some book',id:1},{work:'play Cricket',id:2}],completed:[],totalTaskGenerated:2};
	
	assert.deepEqual(expectedResult,JSON.parse(writtenData));
}

test.should_return_the_right_index_of_task_when_id_provided = function() {
	var tasks = [{work:'read some book',id:2},{work:'play Cricket',id:1}]
	var idToSearch = 1;
	var expectedIndex = 1;

	var actualIndex = lib.getIndexOfElement(tasks,idToSearch);

	assert.equal(actualIndex,expectedIndex);
}
 
test.should_move_the_task_to_the_completed_stage = function() {
	var task_1 = 'read some book';
	var task_2 = 'play Cricket';
	lib.addTask(task_1);
	lib.addTask(task_2);
	var expectedResult = {remaining:[{work:'play Cricket',id:2}],completed:[{work:'read some book',id:1}],totalTaskGenerated:2};
	
	lib.moveToDone(1);

	assert.deepEqual(expectedResult,JSON.parse(writtenData));
}

test.should_delete_the_task = function() {
	var task_1 = 'read some book';
	var task_2 = 'play Cricket';
	lib.addTask(task_1);
	lib.addTask(task_2);

	fs.existsSync = function(fileName) {return true;}

	var expectedResult = {remaining:[{work:'play Cricket',id:2}],completed:[],totalTaskGenerated:2};
	
	lib.deleteTask(1);

	assert.deepEqual(expectedResult,JSON.parse(writtenData));
}
exports.test = test;