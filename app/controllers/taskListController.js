app.controller('taskListController', function ($scope) {
    $scope.taskList = [
        {
            id: 1,
            name: 'Cumpara lapte',
            description: 'Trebuie sa cumpar lapte pentru clatite!',
            deadline: '2015-04-25',
            status: 'PENDING'
        },
        {
            id: 2,
            name: 'Cumpara oua',
            description: 'Trebuie sa cumpar si oua pentru clatite!',
            deadline: '2015-04-25',
            status: 'PENDING'
        },
        {
            id: 3,
            name: 'Cumpara faina',
            description: 'Trebuie sa cumpar si faina pentru clatite!',
            deadline: '2015-04-25',
            status: 'PENDING'
        }
    ];


    $scope.taskIsCompleted = function(task) {
        return task.status === 'DONE';
    };

    $scope.expandTask = function (task) {
        task.expanded = !task.expanded;
    };

    $scope.taskIsExpanded = function (task) {
        return task.expanded;
    };

    $scope.completeTask = function (task) {
        task.status = 'DONE';
    };

    $scope.addTask = function () {

    };
});