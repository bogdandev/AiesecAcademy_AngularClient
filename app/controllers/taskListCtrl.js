
app.controller('TaskListCtrl',function($scope,baseAPIRoute,$http,ErrorHandler,$location){

    $scope.tasks = [];

    $http.get(baseAPIRoute+'/tasks').
        success(function(data,status) {
            if(status === 200){
                $scope.tasks = data;
            }
        }).
        error(function(data, status, headers, config) {
            ErrorHandler.alert(data);
        });

    $scope.expandTask = function (task) {
        task.expanded = !task.expanded;
    };

    $scope.completeTask = function (task) {
        $http.put(baseAPIRoute+'/tasks/'+task.id+'/done').success(function (data, headers) {
            task.status = 'DONE';
        });
    };

    $scope.editTask = function (task) {
       $location.path('/task/'+task.id);
    };

    $scope.taskIsCompleted = function (task) {
        return task.status === 'DONE';
    };

    $scope.deleteTask = function (index, task) {
        $http.delete(baseAPIRoute+'/tasks/'+task.id).success(function (data, headers) {
            $scope.tasks.splice(index, 1);
        });
    }

});