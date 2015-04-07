
var app = angular.module('TaskList',['ngMockE2E', 'ngRoute','ngResource','ui.bootstrap']);

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

app.run(function ($httpBackend) {

    var mockData = [
        {"id":1,"name":"Buy milk","description":"The JSON Formatter was created to help with debugging","deadline":"2015-04-20T00:00:00+0300","status":"PENDING"},
        {"id":2,"name":"Go to grocery Store","description":"As JSON data is often output without line breaks to save space,","deadline":"2015-04-21T00:00:00+0300","status":"PENDING"},
        {"id":3,"name":"Call Baby","description":" it is extremely difficult to actually read and make sense of it","deadline":"2015-04-21T00:00:00+0300","status":"PENDING"},
        {"id":4,"name":"Eat healthy","description":"This little tool hoped to solve the problem by formatting","deadline":"2015-04-21T00:00:00+0300","status":"PENDING"},
        {"id":5,"name":"Personal development plan","description":"the JSON data so that it is easy to read and debug by human beings","deadline":"2015-04-22T00:00:00+0300","status":"PENDING"},
        {"id":6,"name":"Prepare for meeting","description":"Shortly after it was created","deadline":"2015-04-22T00:00:00+0300","status":"PENDING"},
        {"id":7,"name":"Book a table","description":"JSON validation was added following the description set out by Douglas Crockford","deadline":"2015-04-23T00:00:00+0300","status":"PENDING"},
        {"id":8,"name":"Call Mum","description":"Tell that you love her!","deadline":"2015-04-24T00:00:00+0300","status":"PENDING"},
        {"id":9,"name":"Make exercise","description":"SON or JavaScript Object Notation is a language-independent open data format that uses human-readable text to express data objects consisting of attribute–value pairs.","deadline":"2015-04-25T00:00:00+0300","status":"PENDING"},
        {"id":10,"name":"Be smart","description":"JSON data can be generated and parsed with a wide variety of programming languages including JavaScript, PHP and Python.","deadline":"2015-04-26T00:00:00+0300","status":"PENDING"},
        {"id":11,"name":"Read a book","description":"Although originally derived from the JavaScript scripting language","deadline":"2015-04-27T00:00:00+0300","status":"PENDING"},
        {"id":12,"name":"Learn for tomorrow","description":"To get a 5.","deadline":"2015-04-27T00:00:00+0300","status":"PENDING"},
        {"id":13,"name":"Do homework","description":"I bet you won't.","deadline":"2015-04-28T00:00:00+0300","status":"PENDING"},
        {"id":14,"name":"Be happy!","description":"Not that easy.","deadline":"2015-04-28T00:00:00+0300","status":"PENDING"},
        {"id":15,"name":"Laugh","description":"Not that easy.","deadline":"2015-04-29T00:00:00+0300","status":"PENDING"},
        {"id":16,"name":"Dance","description":"I hate dancing.","deadline":"2015-04-30T00:00:00+0300","status":"PENDING"}
    ];

    $httpBackend.whenGET('/tasks?limit=20&offset=0').respond(mockData);

    $httpBackend.whenGET(/^\/task\/\d+/).respond(function (method, url) {
        var id = url.replace('http://aiesec.cargoplanning.com/api/tasks/','').replace('/');

        var result = [200, {}, undefined, '200'];
        mockData.forEach(function (model, index) {
            if(model.id == id) {
                result = [200, model, undefined, '200'];
            }
        });

        return result;
    });


    $httpBackend.whenPUT(/^\/task\/\d+/).respond(update);
    $httpBackend.whenPOST(/^\/task\/\d+/).respond(update);
    $httpBackend.whenPATCH(/^\/task\/\d+/).respond(update);


    function update (method, url, data) {
        console.log(data);
        var id = url.replace('http://aiesec.cargoplanning.com/api/tasks/','').replace('/');

        var result = [200, {}, undefined, '200'];
        mockData.forEach(function (model, index) {
            if(model.id == id) {
                result = [200, model, undefined, '200'];
            }
        });

        return result;
    }


    $httpBackend.whenGET(/.*/).passThrough();

});
