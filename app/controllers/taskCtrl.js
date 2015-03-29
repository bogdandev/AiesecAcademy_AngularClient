
app.controller('TaskCtrl',function($scope,baseAPIRoute,$http,ErrorHandler){

    $scope.task = [];

    $http.get(baseAPIRoute+'/tasks/').
        success(function(data,status) {
            if(status === 200){
                $scope.task = data;
            }
        }).
        error(function(data, status, headers, config) {
            ErrorHandler.alert(data);
        });

});