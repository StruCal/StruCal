angular.module('rcBeam').controller('controlPanelCtrl', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
    var concrete;
    var steel;
    var loadCases;
    var coordinates;
    var bars;
    $scope.dirty = true;
    $scope.message = "Results are NOT up to date."

    $scope.calculate = function () {
        $scope.message = "Processing..."
        $scope.progress = true;
        $scope.dirty = false;
        startProgress();

        var RcBeamInput = {
            Concrete: concrete,
            Steel: steel,
            SectionCoordinates: coordinates,
            Bars: bars,
            loadCases: loadCases
        };
        $http.post("/api/RCBeamApi", RcBeamInput)
            .then(
            function (response) {
                $rootScope.$broadcast('results', response.data);
                $scope.test = response.data;
                $scope.valid = true;
                $scope.dirty = false;
                $scope.error = false;
                $scope.progress = false;
                $scope.message = "Results are up to date"
            },
            function (response) {
                $scope.valid = false;
                $scope.dirty = false;
                $scope.error = true;
                $scope.progress = false;
                $scope.message = "An error has occured. Please try again."
            });
    };

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
    $scope.$on('dirty', function (event, arg) {
        $scope.dirty = true;
        $scope.valid = false;
        $scope.error = false;
        $scope.message = "Results are NOT up to date."
    });
}]);