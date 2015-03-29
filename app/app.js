
var app = angular.module('TaskList',['ngRoute']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/tasks',{
            templateUrl:'',
            controller: ''
        })
        .otherwise({
            redirectTo: '/tasks'
        });
}]);