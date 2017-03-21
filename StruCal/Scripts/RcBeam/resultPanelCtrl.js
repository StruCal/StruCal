angular.module('rcBeam').controller('resultPanelCtrl', function ($scope) {
    $scope.compressionForce = "";
    $scope.tensionForce = "";

    $scope.$on('currentLoadCaseName', function (event, arg) {
        $scope.currentLoadCaseName = arg;
    });
    $scope.$on('results', function (event, arg) {
        $scope.loadCaseResults = arg.LoadCaseResults;
        $scope.tensionForce = arg.MaxTensionForce;
        $scope.compressionForce = arg.MaxCompressionForce;
    });

});