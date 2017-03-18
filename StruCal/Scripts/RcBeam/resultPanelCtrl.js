angular.module('rcBeam').controller('resultPanelCtrl', function ($scope) {

    $scope.$on('results', function (event, arg) {
        $scope.test = arg;
    });

});