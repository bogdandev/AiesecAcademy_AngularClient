
app.controller('TaskCtrl',function($scope,baseAPIRoute,$http,ErrorHandler,$routeParams){

    $scope.task = [];

    $http.get(baseAPIRoute+'/tasks/'+$routeParams.id).
        success(function(data,status) {
            if(status === 200){
                $scope.task = data;
            }
        }).
        error(function(data, status, headers, config) {
            ErrorHandler.alert(data);
        });

});