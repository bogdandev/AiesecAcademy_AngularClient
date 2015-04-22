
app.controller('TaskListCtrl',function($scope, tasksService, $location,toastr){

    $scope.tasks = [];

    $scope.expandTask = expandTask;
    $scope.completeTask = completeTask;
    $scope.editTask = editTask;
    $scope.taskIsCompleted = taskIsCompleted;
    $scope.deleteTask = deleteTask;
    $scope.addTask = addTask;

    (function getTasks() {
        //tasksService.setLimit(2);
        //tasksService.setOffset(2);

        tasksService.getAllTasks(function (err, data) {
            if (err === null) {
                $scope.tasks = data;
            } else {
                toastr.error(err.message,'Error');
            }
        });
    })();

    function expandTask (task) {
        task.expanded = !task.expanded;
    }

    function completeTask (task) {
        tasksService.completeTask(task.id, function (err, data) {
            if (err === null) {
                task.status = 'DONE';
                toastr.success('Task '+task.name+ ' completed!','Success!');
            } else {
                toastr.error(err.message,'Error');
            }
        });
    }

    function editTask (task) {
       $location.path('/task/'+task.id);
    }

    function taskIsCompleted (task) {
        return task.status === 'DONE';
    }

    function deleteTask (index, task) {
        tasksService.deleteTask(task.id, function (err, data) {
            if (err === null) {
                $scope.tasks.splice(index, 1);
                toastr.warning('Task '+task.name+ ' deleted!','Success!');
            } else {
                toastr.error(err.message,'Error');
            }
        });
    }

    function addTask () {
        $location.path('/tasks/new');
    }
});