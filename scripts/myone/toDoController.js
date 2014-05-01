function toDoCtrl ($scope) {
	var tasks = getExistingTasks();
	$scope.toDos = tasks.remaining;
	$scope.completedTasks = tasks.completed;

	$scope.addTodo = function() {

		lib.addTask($scope.todoText);
		$scope.toDos = getExistingTasks().remaining;

		$scope.todoText = '';
	};

	$scope.moveIt = function(index) {
		lib.moveToDone($scope.toDos[index].id);
		$scope.completedTasks.push($scope.toDos[index]);
		$scope.toDos.splice(index,1);
	}

	$scope.delete = function(index) {
		lib.deleteTask($scope.toDos[index].id);
		$scope.toDos.splice(index,1);
	}
}