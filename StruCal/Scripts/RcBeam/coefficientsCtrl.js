angular.module('rcBeam').controller('coefficientsCtrl', function ($scope, $rootScope) {
    $scope.gammaS = 1.15;
    $scope.gammaC = 1.5;

    $scope.save = function () {
        $rootScope.$broadcast('gammaS', $scope.gammaS);
        $rootScope.$broadcast('gammaC', $scope.gammaC);
        $('#modalCoefficients').modal('toggle');
    };
});