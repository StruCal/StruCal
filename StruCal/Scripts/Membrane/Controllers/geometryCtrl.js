angular.module('membraneFEM').controller('geometryCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
    $scope.vertices = new Array();

    $scope.vertices = [{
        x: 2000,
        y: 3000,
        supportX: true,
        supportY: false,
        loadX: 1000,
        loadY:-500,
    },
    {
        x: 5000,
        y: 3000,
        supportX: true,
        supportY: false,
        loadX: 5000,
        loadY: -500,
    }];

    $scope.add = function () {
        $scope.vertices.push({
            x: 2000,
            y: 3000,
            supportX: true,
            supportY: false,
            loadX: 1000,
            loadY: -500,
        });
    }

    $scope.remove = function (index) {
        $scope.vertices.splice(index, 1);
    }

}]);