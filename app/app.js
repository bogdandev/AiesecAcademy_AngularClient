
var app = angular.module('TaskList',['ngRoute','ngResource']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/tasks',{
            templateUrl:'app/templates/task_list.html',
            controller: 'TaskListCtrl'
        })
        .when('/tasks/:id',{
            templateUrl:'app/templates/task_view.html',
            controller: 'TaskCtrl'
        })
        .otherwise({
            redirectTo: '/tasks'
        });
}]);

app.value('baseAPIRoute','http://aiesec.cargoplanning.com/api');


