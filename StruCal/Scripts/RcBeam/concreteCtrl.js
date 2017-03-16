angular.module('rcBeam').controller('concreteCtrl', function ($scope, $rootScope, concreteService, chartService) {
    $scope.concretes = concreteService.getConcreteClasses();
    $scope.selectedConcrete = $scope.concretes[0];
    $scope.alphaCC = 1;
    $scope.fck = 20;
    var gammaC = 1.5;

    $scope.save = function () {
        let concrete = {
            grade: $scope.selectedConcrete,
            fck: $scope.fck,//kPa
            acc: $scope.alphaCC,
            gammaC: gammaC,
            n: $scope.n,
            ec2: $scope.ec2,
            ecu2: $scope.ecu2,
        };
        $rootScope.$broadcast('concrete', concrete);
        $('#modalConcrete').modal('toggle');
    }
    $scope.$watch('selectedConcrete', function () {
        updateProperties($scope.selectedConcrete);
    });
    $scope.$watch('alphaCC', function () {
        $scope.fcd = $scope.fck / gammaC * $scope.alphaCC;
        updateChart();
    });
    $scope.$watch('fck', function () {
        updateProperties($scope.fck)
    });

    //chart
    $scope.series = chartService.series;
    $scope.datasetOverride = chartService.datasetOverride;
    $scope.options = chartService.options;

    $scope.$on('gammaC', function (event, arg) {
        gammaC = arg;
        updateProperties();
    });
    function updateProperties(concreteClass) {
        var properties = concreteService.getProperties(concreteClass);
        $scope.fck = properties.fck;
        $scope.fcd = properties.fck / gammaC * $scope.alphaCC;
        $scope.n = properties.n;
        $scope.ec2 = properties.ec2;
        $scope.ecu2 = properties.ecu2;
        updateChart();
    }
    function updateChart() {
        var chartValues = concreteService.getChartValues($scope.fck, gammaC, $scope.alphaCC);
        $scope.concreteLabels = chartValues.strain;
        $scope.concreteData = [chartValues.designStress, chartValues.charStress];
    }


});

