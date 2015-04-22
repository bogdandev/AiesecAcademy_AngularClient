app.controller('taskController', function ($scope) {

    $scope.task = {
        name: '',
        description: '',
        deadline: ''
    };

    $scope.completeTask = function () {
        $scope.task.status = 'DONE';
    };

    $scope.addTask = function () {

    };
});