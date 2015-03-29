
app.controller('TaskListCtrl',function($scope,baseAPIRoute,$http,ErrorHandler){

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

});