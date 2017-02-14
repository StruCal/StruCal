angular.module('rcBeam').controller('loadsCtrl', function ($scope, $rootScope) {
    $scope.loadCases = new Array();

    $scope.loadCases = [{
        name: "load1",
        value: 1000,
    },
    {
        name: "load2",
        value: 2000,
    }];

    $scope.save = function(index,name,value)
    {
        $scope.loadCases[index] = {
            name : name,
            value:value
        }
    }
    $scope.add = function () {
        $scope.loadCases.push({
            name: "load",
            value: 0
        });
    }

    $scope.remove = function (index) {
        $scope.loadCases.splice(index, 1);
    }
});