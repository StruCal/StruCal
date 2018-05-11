angular.module('rcBeam').controller('steelCtrl', ['$scope', '$rootScope', 'steelService', 'chartService', function ($scope, $rootScope, steelService, chartService) {
    $scope.steels = steelService.getSteelClasses();
    $scope.selectedSteel = $scope.steels[0].grade;
    $scope.eudToEuk = 0.9;
    $scope.fyk = 500;
    $scope.E = 200;
    var gammaS = 1.15;

    $scope.save = function () {
        let steel = {
            grade: $scope.fyk + $scope.selectedSteel,
            fyk: $scope.fyk,//N/mm2
            Es: $scope.E * 1000,//N/mm2
            gammaS: gammaS,
            k: $scope.k,
            euk: $scope.euk,
            eudToEuk: $scope.eudToEuk,
        }
        $rootScope.$broadcast('steel', steel);
        $rootScope.$broadcast('dirty', true);
        $('#modalSteel').modal('toggle');
    }
    $scope.$watch('selectedSteel', () => updateProperties());
    $scope.$watch('E', () => updateChart());
    $scope.$watch('fyk', () => updateChart());
    $scope.$watch('k', () => updateChart());
    $scope.$watch('euk', () => updateChart());
    $scope.$watch('eudToEuk', function () {
        $scope.eud = $scope.eudToEuk * $scope.euk;
        updateChart();
    });

    //chart
    $scope.series = chartService.series;
    $scope.datasetOverride = chartService.datasetOverride;
    $scope.options = chartService.options;

    $scope.$on('gammaS', function (event, arg) {
        gammaS = arg;
        updateProperties();
    });
    function updateProperties() {
        var steel = $scope.steels.find(function (e) {
            return e.grade == $scope.selectedSteel;
        });
        $scope.fyd = $scope.fyk / gammaS;
        $scope.euk = steel.euk;
        $scope.k = steel.k;
        $scope.eud = $scope.euk * $scope.k;
        updateChart();
    }
    function updateChart() {
        var chartValues = steelService.getChartValues($scope.fyd, $scope.fyk, $scope.eud, $scope.euk, $scope.k, $scope.E * 1000);
        $scope.steelLabels = chartValues.strain;
        $scope.steelData = [chartValues.designStress, chartValues.charStress];
    }
}]);