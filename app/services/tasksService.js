app.factory('tasksService', function ($http, baseAPIRoute) {
    var limit,offset;

    setDefaults();

    return {
        getAllTasks: getAllTasks,
        getTask: getTask,
        completeTask: completeTask,
        updateTask: updateTask,
        deleteTask: deleteTask,
        addTask: addTask,
        setLimit: setLimit,
        setOffset: setOffset
    };

    function setDefaults () {
        limit = 20;
        offset = 0;
    }

    function setLimit (tasksLimit) {
        limit = tasksLimit;
    }

    function setOffset (tasksOffset) {
        offset = tasksOffset;
    }

    function getAllTasks (callback) {

        var parameters = {limit: limit, offset: offset};

        $http.get(baseAPIRoute+'/tasks',{params: parameters}).
            success(function(data,status) {
                callback(null, data);

            }).
            error(function(data, status, headers, config) {
                callback(data, null);
                //ErrorHandler.alert(data);
            });
    }

    function getTask(id, callback) {
        $http.get(baseAPIRoute+'/tasks/'+id).
            success(function(data,status) {
                callback(null, data);
            }).
            error(function(data, status, headers, config) {
                callback(data, callback);
                //ErrorHandler.alert(data);
            });
    }

    function completeTask (id, callback) {
        $http.put(baseAPIRoute+'/tasks/'+id+'/done',[])
            .success(function (data, headers) {
                callback(null, data);
            })
            .error(function (data, headers) {
                callback(data, null);
            });
    }

    function deleteTask (id, callback) {
        $http.delete(baseAPIRoute+'/tasks/'+id)
            .success(function (data, headers) {
                callback(null, data);
            })
            .error(function (data, headers) {
                callback(data, null);
            });
    }

    function addTask (sendData, callback) {
        var url = baseAPIRoute+'/tasks';
        sendTaskData('post', url, sendData, callback);
    }

    function updateTask (id, sendData, callback) {
        var url = baseAPIRoute+'/tasks'+'/'+id;
        sendTaskData('put', url, sendData, callback);
    }

    function sendTaskData (method, url, data, callback) {
        $http({
            method: method,
            url: url,
            data: data,
            headers: { 'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            }
        }).success(function(data,status) {
            callback(null, data);
        }).error(function(data, status, headers, config) {
            callback(data, null);
        });
    }
});