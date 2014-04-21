var runTest = function(testName){
	console.log('running tests on',testName);
	var test = require('./'+testName).test;
	var members = Object.keys(test);
	var failed = 0;
	var isAFunction = function(field){
		return ('function' == typeof test[field]);
	};
	var methods = members.filter(isAFunction);
	var executeTest = function(name){
		var member = test[name];
		console.log('--------');
		console.log('-->',name);
		try{
			member();
		}catch(error){
			failed++;
			console.log(error.stack);
		}
	};	
	methods.forEach(executeTest);
	console.log('--------');
	var total = methods.length;
	console.log(total-failed +'/'+total+' passed');
};

var testName = process.argv[2];
runTest(testName);