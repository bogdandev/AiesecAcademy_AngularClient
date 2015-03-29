
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



app.config(function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
});

app.controller('TaskListCtrl',function($scope,baseAPIRoute,$http){

    $http.get(baseAPIRoute+'/tasks').
        success(function(data, status, headers, config) {
           console.log(data, status, headers, config);
        }).
        error(function(data, status, headers, config) {
             console.log(data);
        });

});