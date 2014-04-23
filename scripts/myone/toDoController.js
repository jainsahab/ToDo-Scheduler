function toDoCtrl ($scope) {
	var tasks = getExistingTasks();
	$scope.toDos = tasks.remaining;
	$scope.completedTasks = tasks.completed;

	$scope.addTodo = function() {

		lib.addTask($scope.todoText);
		$scope.toDos = getExistingTasks().remaining;

		$scope.todoText = '';
	};
}