
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
        task.completed = !task.completed;
    };

    $scope.editTask = function (task) {
       $location.path('/task/'+task.id);
    }

});