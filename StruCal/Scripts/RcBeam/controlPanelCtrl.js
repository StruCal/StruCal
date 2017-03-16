angular.module('rcBeam').controller('controlPanelCtrl', function ($scope, $rootScope, $http) {
    var concrete;
    var steel;
    var loadCases;
    var coordinates;
    var bars;

    $scope.calculate = function () {
        var RcBeamInput = {
            Concrete: concrete,
            Steel: steel,
            SectionCoordinates: coordinates,
            Bars: bars,
            loadCases: loadCases
        };
        $http.post("/api/RCBeamApi", RcBeamInput).then(function (response) {

        });
    }

    $scope.$on('concrete', function (event, arg) {
        concrete = arg;
    });
    $scope.$on('steel', function (event, arg) {
        steel = arg;
    });
    $scope.$on('loads', function (event, arg) {
        loadCases = arg;
    });
    $scope.$on('coordinates', function (event, arg) {
        coordinates = arg;
    });
    $scope.$on('bars', function (event, arg) {
        bars = arg;
    });

    
});