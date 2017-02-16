angular.module('rcBeam').controller('concreteCtrl', function ($scope, $rootScope, concreteService, chartService) {
    $scope.concretes = concreteService.getConcreteClasses();
    $scope.selectedConcrete = $scope.concretes[0];
    $scope.alphaCC = 1;
    $scope.fck = 20;
    var gammaC = 1.5;

    $scope.save = function () {
        $rootScope.$broadcast('fcd', $scope.fcd);
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
        updateValues();
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

angular.module('rcBeam').service('concreteService', function () {
    var self = this;
    this.getConcreteClasses = function () {
        return ["C12/15", "C16/20", "C20/25", "C25/30", "C30/37", "C35/45", "C40/50", "C45/55", "C50/60", "C55/67", "C60/75", "C70/85", "C80/95", "C90/105"]
    };
    this.getProperties = function (concreteClass) {

        var fck = convertFck(concreteClass);
        var ec2 = fck < 50 ? 2.0 : 2.0 + 0.085 * Math.pow(fck - 50, 0.53);
        var ecu2 = fck < 50 ? 3.5 : 2.6 + 35 * Math.pow((90 - fck) / 100, 4);
        var n = fck < 50 ? 2 : 1.4 + 23.4 * Math.pow((90 - fck) / 100, 4);

        var result = {
            fck: format(fck, 2),
            ec2: format(ec2 / 1000, 4),
            ecu2: format(ecu2 / 1000, 4),
            n: format(n, 2),
        }
        return result;

        function format(value, decimals) {
            return Number(value.toFixed(decimals));
        }

    }
    this.getChartValues = function (concreteClass, gammaC, alphaCC) {
        var properties = self.getProperties(concreteClass);

        var fck = properties.fck;
        var fcd = fck / gammaC * alphaCC;
        var ec2 = properties.ec2;
        var ecu2 = properties.ecu2;
        var n = properties.n;

        var currentStrain = 0;
        var increase = 0.0001;
        var strain = new Array();
        var charStress = new Array();
        var designStress = new Array();

        while (currentStrain <= ecu2) {
            strain.push(currentStrain.toFixed(4));

            var currentCharStress = currentStrain <= ec2 ? fck * (1 - Math.pow(1 - currentStrain / ec2, n)) : fck;
            charStress.push(currentCharStress);
            designStress.push(currentCharStress / gammaC * alphaCC);
            currentStrain = currentStrain + increase;

        }
        return {
            strain: strain,
            charStress: charStress,
            designStress: designStress,
        }
    }

    var convertFck = function (concreteClass) {
        var strength = concreteClass.toString().replace("C", "").split("/");

        var fck = Number(strength[0]);
        return fck;
    }

});