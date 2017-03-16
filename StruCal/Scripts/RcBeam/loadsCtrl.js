angular.module('rcBeam').controller('loadsCtrl', function ($scope, $rootScope) {
    $scope.loadCases = new Array();

    $scope.loadCases = [{
        name: "load1",
        normalForce: 1000000,
    },
    {
        name: "load2",
        normalForce: 2000000,
    }];

    $scope.apply = function(index,name,value)
    {
        $scope.loadCases[index] = {
            name : name,
            normalForce:value
        }
    }
    $scope.add = function () {
        $scope.loadCases.push({
            name: "load",
            normalForce: 0
        });
    }

    $scope.remove = function (index) {
        $scope.loadCases.splice(index, 1);
    }

    $scope.save = function () {

            $rootScope.$broadcast('loads', $scope.loadCases);
            $('#modalLoads').modal('toggle');
        }

});