angular.module('membraneFEM').controller('geometryCtrl', ['$scope', '$rootScope','drawingService', function ($scope, $rootScope, drawingService) {
    $scope.vertices = new Array();

    $scope.vertices = [{
        x: 0,
        y: 2000,
        supportX: false,
        supportY: false,
        loadX: 500,
        loadY:1000,
    },
    {
        x: 500,
        y: 0,
        supportX: true,
        supportY: true,
        loadX: 0,
        loadY: 0,
    },
    {
        x: 1500,
        y: 0,
        supportX: true,
        supportY: true,
        loadX: 0,
        loadY: 0,
    },
    {
        x: 2000,
        y: 2000,
        supportX: false,
        supportY: false,
        loadX: -500,
        loadY: 1000,
    },
    {
        x: 1000,
        y: 2000,
        supportX: false,
        supportY: false,
        loadX: 0,
        loadY: -2000,
    }
    ];

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

    $scope.setSupportX=function(showForms,vertex){
        if (showForms){
            vertex.supportX = !vertex.supportX;
        }
    }
    $scope.setSupportY = function (showForms, vertex) {
        if (showForms) {
            vertex.supportY = !vertex.supportY;
        }
    }

}]);