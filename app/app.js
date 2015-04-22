
var app = angular.module('TaskList',['ngMockE2E','ngRoute','ngResource','ui.bootstrap','ngAnimate', 'toastr']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/tasks',{
            templateUrl:'app/templates/task_list.html',
            controller: 'TaskListCtrl'
        })
        .when('/task/:id',{
            templateUrl:'app/templates/task_edit.html',
            controller: 'TaskCtrl'
        })
        .when('/tasks/new',{
            templateUrl:'app/templates/task_add.html',
            controller: 'TaskCtrl'
        })
        .otherwise({
            redirectTo: '/tasks'
        });
}]);

app.value('baseAPIRoute','');
app.config(function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
});

app.run(function(backendLess) {
    backendLess.setUp();
});
