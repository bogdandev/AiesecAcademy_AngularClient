
app.controller('TaskCtrl',function($scope, $routeParams, $location, $filter, tasksService){

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
                console.log(err);
            }
        });
    }


    function updateTask(task) {
        var requestObject = getRequestData(task);

        tasksService.updateTask($routeParams.id, requestObject, function (err, data) {
            if (err === null) {
                $scope.goToListView();
            } else {
                console.log(err);
            }
        });
    }

    function addTask(task) {
        var requestObject = getRequestData(task);

        tasksService.addTask(requestObject, function (err, data) {
            if (err === null) {
                $scope.goToListView();
            } else {
                console.log(err);
            }
        });
    }

    function getRequestData(task) {
        var formatedDate;

        if (task.deadline) {
            formatedDate = $filter('date')(task.deadline, 'yyyy-MM-dd');
        }
        return {
            'aiesec_tasklistbundle_task[name]': task.name,
            'aiesec_tasklistbundle_task[description]': task.description,
            'aiesec_tasklistbundle_task[deadline]': formatedDate
        };
    }

    function completeTask (task) {
        tasksService.completeTask(task.id, function (err, data) {
            if (err === null) {
                task.status = 'DONE';
            } else {
                console.log(err);
            }
        });
    }

    function deleteTask(task){
        tasksService.deleteTask(task.id, function (err, data) {
            if (err === null) {
                goToListView();
            } else {
                console.log(err);
            }
        });
    }

    function goToListView(){
        $location.path('/tasks');
    }



});