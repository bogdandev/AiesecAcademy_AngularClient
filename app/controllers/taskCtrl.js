
app.controller('TaskCtrl',function($scope, $routeParams, $location, $filter, tasksService,toastr){

    $scope.task = {};
    $scope.today = new Date();

    if(!isNaN(parseInt($routeParams.id))) {
        getTaskDetails();
    }

    $scope.addTask = addTask;
    $scope.updateTask = updateTask;
    $scope.deleteTask = deleteTask;
    $scope.goToListView = goToListView;
    $scope.completeTask = completeTask;

    function getTaskDetails(){
        tasksService.getTask($routeParams.id, function (err, data) {
            if (err === null) {
                $scope.task = data;
            } else {
                toastr.error('Error', err.message);
            }
        });
    }


    function updateTask(task) {
        var requestObject = getRequestData(task);

        tasksService.updateTask($routeParams.id, requestObject, function (err, data) {
            if (err === null) {
                $scope.goToListView();
                toastr.success('Task '+task.name+' updated!','Success!');
            } else {
                toastr.error('Error', err.message);
            }
        });
    }

    function addTask(task) {
        var requestObject = getRequestData(task);

        tasksService.addTask(requestObject, function (err, data) {
            if (err === null) {
                $scope.goToListView();
                toastr.success('Task '+task.name+' added!','Success!');
            } else {
                toastr.error('Error', err.message);
            }
        });
    }

    function getRequestData(task) {
        var formatedDate;

        if (task.deadline) {
            formatedDate = $filter('date')(task.deadline, 'yyyy-MM-dd');
        }
        return {
            'aiesec_task[name]': task.name,
            'aiesec_task[description]': task.description,
            'aiesec_task[deadline]': formatedDate
        };
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

    function deleteTask(task){
        tasksService.deleteTask(task.id, function (err, data) {
            if (err === null) {
                goToListView();
                toastr.warning('Task '+task.name+ ' deleted!','Success!');
            } else {
                toastr.error(err.message,'Error');
            }
        });
    }

    function goToListView(){
        $location.path('/tasks');
    }



});