angular.module('rcBeam').controller('resultPanelCtrl',['$scope', function ($scope) {
    $scope.compressionForce = "";
    $scope.tensionForce = "";
    $scope.currentLoadCaseName = "load1";

    $scope.highlight = function(loadCaseIndex)
    {
        let currentValue = $scope.loadCaseResults.find(e=>e.LoadCase.Name == $scope.currentLoadCaseName);
        let index = $scope.loadCaseResults.indexOf(currentValue)
        return index == loadCaseIndex;
    }

    $scope.$on('currentLoadCaseName', function (event, arg) {
        $scope.currentLoadCaseName = arg;
    });
    $scope.$on('results', function (event, arg) {
        $scope.loadCaseResults = arg.LoadCaseResults;
        $scope.tensionForce = arg.MaxTensionForce;
        $scope.compressionForce = arg.MaxCompressionForce;
    });

}]);