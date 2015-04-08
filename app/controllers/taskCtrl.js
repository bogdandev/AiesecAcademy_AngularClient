
app.controller('TaskCtrl',function($scope,baseAPIRoute,$http,ErrorHandler,$routeParams,$location,$filter){

    $scope.task = {};
    $scope.today = new Date();
    var reqUrl, reqMethod;

    if(isNaN(parseInt($routeParams.id))) {
        reqUrl = baseAPIRoute+'/tasks';
        reqMethod='POST';
    }else{
        reqUrl = baseAPIRoute+'/tasks/'+$routeParams.id;
        reqMethod='PUT';
        getTaskDetails();
    }

    $scope.saveTask = saveTask;
    $scope.deleteTask = deleteTask;
    $scope.goToListView = goToListView;

    function getTaskDetails(){
        $http.get(baseAPIRoute+'/tasks/'+$routeParams.id).
            success(function(data,status) {
                if(status === 200){
                    $scope.task = data;
                }
            }).
            error(function(data, status, headers, config) {
                ErrorHandler.alert(data);
            });
    }


    function saveTask(task) {
        var formatedDate;

        if(task.deadline){
            formatedDate = $filter('date')(task.deadline,'yyyy-MM-dd');
        }
        var requestObject = {
            'aiesec_tasklistbundle_task[name]': task.name,
            'aiesec_tasklistbundle_task[description]': task.description,
            'aiesec_tasklistbundle_task[deadline]': formatedDate
        };

        $http({
            method: reqMethod,
            url: reqUrl,
            data: requestObject,
            headers: { 'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            }
        }).success(function(data,status) {
                goToListView();
        }).error(function(data, status, headers, config) {
                ErrorHandler.alert(data);
            });
    }

    $scope.completeTask = function (task) {
        $http.put(baseAPIRoute+'/tasks/'+task.id+'/done', [])
            .success(function (data, headers) {
                task.status = 'DONE';
            });
    };

    function deleteTask(task){
        $http.delete(baseAPIRoute+'/tasks/'+task.id)
            .success(function (data, headers) {
                goToListView();
        }).
            error(function(data, status, headers, config) {
                ErrorHandler.alert(data);
        });
    }

    function goToListView(){
        $location.path('/tasks');
    }



});