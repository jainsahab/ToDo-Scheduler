var lib = require('./ToDo-Lib.js').lib;
var assert = require('assert');
var fs = require('./ToDo-Lib.js').fs;
var writtenData ;
var test = {};

fs.writeFileSync = function(fileName,data){
	writtenData = data;
}

test.shouldAddTheTaskIntoList = function () {
	var task = {work:'read some book'};
	lib.addTask(task);
	var expectedResult = {remaining:[{work:'read some book'}],completed:[]};
	assert.deepEqual(expectedResult,JSON.parse(writtenData));
}

exports.test = test;