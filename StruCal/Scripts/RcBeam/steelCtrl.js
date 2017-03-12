angular.module('rcBeam').controller('steelCtrl', function ($scope, $rootScope, steelService,chartService) {
    $scope.steels = steelService.getSteelClasses();
    $scope.selectedSteel = $scope.steels[0].grade;
    $scope.eudToEuk = 0.9;
    $scope.fyk = 500;
    $scope.E = 200;
    var gammaS = 1.15;

    $scope.save = function () {
        let steel = {
            grade: $scope.selectedSteel,
            E: $scope.E,
            fyk: $scope.fyk,
            k: $scope.k,
            euk: $scope.euk,
            eud:$scope.eud,
        }
        $rootScope.$broadcast('steel', steel);
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
        updateValues();
    });
    function updateProperties() {
        var steel = $scope.steels.find(function (e) {
            return e.grade == $scope.selectedSteel;
        });
        $scope.fyd = $scope.fyk / gammaS;
        $scope.euk = steel.euk;
        $scope.k = steel.k;
        $scope.eud =$scope.euk * $scope.k;
        updateChart();
    }
    function updateChart() {
        var chartValues = steelService.getChartValues($scope.fyd, $scope.fyk, $scope.eud, $scope.euk, $scope.k, $scope.E*1000);
        $scope.steelLabels = chartValues.strain;
        $scope.steelData = [chartValues.designStress, chartValues.charStress];
         
    }
});

angular.module('rcBeam').service('steelService', function () {
    var self = this;
    this.getSteelClasses = function () {
        return [
        {
            grade: "A",
            k: 1.05,
            euk:0.025,
        },
        {
            grade: "B",
            k: 1.08,
            euk: 0.05,
        },
        {
            grade: "C",
            k: 1.15,
            euk: 0.075,
        },
        ]
    };
    
    this.getChartValues = function (fyd,fyk,eud,euk,k,E) {
        var sigmaK = function (e) {
            var result;
            if (e <= fyk / E) {
                result = e * E;
            }
            else {
                var a = (k * fyk - fyk) / (euk - fyk / E);
                var b = fyk - a * fyk / E;
                result = a * e + b;
            }
            return result;
        }
        var sigmaD = function (e) {
            var result;
            if (e <= fyd / E) {
                result = e * E;
            }
            else {
                var a = (k * fyd - fyd) / (euk - fyd / E);
                var b = fyd - a * fyd / E;
                result = a * e + b;
            }
            return result;
        }

        var strain = new Array();
        var charStress = new Array();
        var designStress = new Array();

        for (var i = 0; i < euk; i = i+0.0001) {
            strain.push(i.toFixed(3));
            charStress.push(sigmaK(i));
            designStress.push(sigmaD(i));
        }
        return {
            strain: strain,
            charStress: charStress,
            designStress: designStress,
        }
    }
});