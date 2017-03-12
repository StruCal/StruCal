angular.module('rcBeam').controller('leftPanelCtrl', function ($scope, $rootScope) {
    $scope.concrete = "C12/15";
    $scope.steel = "500A";

    $scope.$on('concrete', function (event, arg) {
        $scope.concrete = arg.grade;
    });
    $scope.$on('steel', function (event, arg) {
        $scope.steel = arg.fyk + arg.grade;
    });
    $scope.$on('loads', function (event, arg) {
        $scope.loadCases = arg;
        if ($scope.selectedLoadCase == null)
        {
            $scope.selectedLoadCase = $scope.loadCases[0];
        }
    })

});