
app.controller('TaskCtrl',function($scope,baseAPIRoute,$http,ErrorHandler,$routeParams){

    $scope.task = [];

    getTaskDetails();
    $scope.saveTask = saveTask;

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

    $scope.completeTask = function (task) {
        task.completed = !task.completed;
    };

    function saveTask(task) {

        var requestObject = {
            'aiesec_tasklistbundle_task[name]': task.name,
            'aiesec_tasklistbundle_task[description]': task.description,
            'aiesec_tasklistbundle_task[deadline]': '2015-05-10'
        };

        $http({
            method: 'PUT',
            url: baseAPIRoute+'/tasks/'+$routeParams.id,
            data: requestObject,
            headers: { 'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            }
        }).success(function(data,status) {
            if(status === 200){
                $scope.task = data;
            }
        }).
            error(function(data, status, headers, config) {
                console.log(status);
            });

        //$http.put(baseAPIRoute+'/tasks/'+$routeParams.id, requestObject, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).
        //    success(function(data,status) {
        //        if(status === 200){
        //            $scope.task = data;
        //        }
        //    }).
        //    error(function(data, status, headers, config) {
        //        console.log(status);
        //    });


    };


});