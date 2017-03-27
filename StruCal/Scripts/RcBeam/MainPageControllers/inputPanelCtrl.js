angular.module('rcBeam').controller('inputPanelCtrl',['$scope','$rootScope', function ($scope, $rootScope) {
    //$scope.concrete = "C12/15";
    //$scope.steel = "500A";

    $scope.$on('concrete', function (event, arg) {
        $scope.concreteGrade = arg.grade;
    });
    $scope.$on('steel', function (event, arg) {
        $scope.steelGrade = arg.grade;
    });
    $scope.$on('loads', function (event, arg) {
        $scope.loadCases = arg;
        //if ($scope.selectedLoadCase == null) {
        $scope.selectedLoadCase = $scope.loadCases[0];
        //}
    });
    $scope.changeLoad = function () {
        $rootScope.$broadcast('currentLoadCaseName', $scope.selectedLoadCase.name);
    };
    (function init() {
        var concrete = {
            grade: "C12/15",
            fck: 12,
            acc: 1,
            gammaC: 1.5,
            n: 2,
            ec2: 0.002,
            ecu2: 0.0035,
        };
        var steel = {
            grade: "500A",
            fyk: 500,
            Es: 200000,
            gammaS: 1.15,
            k: 1.05,
            euk: 0.025,
            eudToEuk: 0.9,
        };
        var loadCases = [
            {
                name: "load1",
                normalForce: 100000,
            },
            {
                name: "load2",
                normalForce: 200000,
            }
        ];
        $rootScope.$broadcast('concrete', concrete);
        $rootScope.$broadcast('steel', steel);
        $rootScope.$broadcast('loads', loadCases);
        $rootScope.$broadcast('currentLoadCaseName', loadCases[0].name);
    })();

}]);