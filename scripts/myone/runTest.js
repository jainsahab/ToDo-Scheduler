var runTest = function(testName){
	console.log('running tests on',testName);
	var test = require('./'+testName).test;
	var setup;
	if(test.setup){
		setup = test.setup;
		delete test['setup'];		
	}
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
			if(typeof setup == 'function')
				setup();
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