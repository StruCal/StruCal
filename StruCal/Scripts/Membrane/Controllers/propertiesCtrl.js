angular.module('membraneFEM').controller('propertiesCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
    $scope.E = 200;
    $scope.v = 0.25;
    $scope.t = 200;


    $scope.$watch('E', send);
    $scope.$watch('v', send);
    $scope.$watch('t', send);

    function send() {
        $rootScope.$broadcast('propertiesMsg', {
            ModulusOfElasticity: $scope.E * 1000000000,//Pa
            PoissonsRation: $scope.v,
            Thickness: $scope.t,
        });
    }
}]);