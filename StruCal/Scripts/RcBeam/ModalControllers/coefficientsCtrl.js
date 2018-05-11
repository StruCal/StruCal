angular.module('rcBeam').controller('coefficientsCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
    $scope.gammaS = 1.15;
    $scope.gammaC = 1.5;

    $scope.save = function () {
        $rootScope.$broadcast('gammaS', $scope.gammaS);
        $rootScope.$broadcast('gammaC', $scope.gammaC);
        $rootScope.$broadcast('dirty', true);
        $('#modalCoefficients').modal('toggle');
    };
}]);