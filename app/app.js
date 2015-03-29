
var app = angular.module('TaskList',['ngRoute','ngResource']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/tasks',{
            templateUrl:'app/templates/task_list.html',
            controller: 'TaskListCtrl'
        })
        .otherwise({
            redirectTo: '/tasks'
        });
}]);

app.value('baseAPIRoute','http://aiesec.cargoplanning.com/api');


app.service('ErrorHandler', function() {
    return {
        alert: function(data){
            if(data.code){
                return  alert('Error ' + data.code+' : ' + data.message);
            }
        }
    }
});

app.controller('TaskListCtrl',function($scope,baseAPIRoute,$http,ErrorHandler){

    $scope.tasks = [];

    $http.get(baseAPIRoute+'/tasks').
        success(function(data, status, headers, config) {
           $scope.tasks = data;
        }).
        success(function(data,status) {
            if(status === 200){
                $scope.tasks = data;
            }else{
                ErrorHandler.alert(status);
            }
        }).
        error(function(data, status, headers, config) {
            ErrorHandler.alert(data);
        });

});
