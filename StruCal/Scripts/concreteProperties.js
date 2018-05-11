var charts = angular.module('charts', ['chart.js']);

charts.controller('chartCtrl', ['$scope', 'concreteFunctions', function ($scope, concreteFunctions) {
    $scope.series = ['fcm',];

    $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
    $scope.options = {
        scales: {
            yAxes: [
                {
                    id: 'y-axis-1',
                    type: 'linear',
                    display: true,
                    position: 'left'
                }
            ],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: "t [Days]",
                    fontSize: 15
                },
                display: true,
                ticks: {
                    maxRotation: 0,
                    autoSkipPadding: 20,
                }
            }],
        },
        //title: {
        //    text: '\(f_{cm} [MPa]\)',
        //    display: true,
        //},
        tooltips: {
            enabled: true,
        },
        legend: {
        },
        elements:
        {
            point: {
                radius: 0,
                hitRadius: 0,
                hoverRadius: 10,
            },
        },
    };

    $scope.$on('concreteChange', function (event, arg) {
        var data = concreteFunctions.getFunctions(arg.fck, arg.fcm, arg.fctm, arg.Ecm, arg.cementClass);

        var fckValues = data.fck();
        $scope.fckLabels = fckValues.x;
        $scope.fckData = [fckValues.y];

        var EcmValues = data.Ecm();
        $scope.EcmLabels = EcmValues.x;
        $scope.EcmData = [EcmValues.y];

        var fcmValues = data.fcm();
        $scope.fcmLabels = fcmValues.x;
        $scope.fcmData = [fcmValues.y];

        var fctmValues = data.fctm();
        $scope.fctmLabels = fctmValues.x;
        $scope.fctmData = [fctmValues.y];
    });
}]);

var application = angular.module('concretePropertiesApp', ['charts']);
application.controller("mainCtrl", ['$scope', '$rootScope', 'concreteFactory', 'concreteProperties', 'nameConverter', function ($scope, $rootScope, concreteFactory, concreteProperties, nameConverter) {
    $scope.convert = nameConverter.convertName;

    $scope.concretes = concreteFactory.concreteClass;//.classes()
    $scope.selectedConcrete = concreteFactory.concreteClass[0];//.classes()[0];

    $scope.cementes = concreteFactory.cementType;
    $scope.selectedCement = concreteFactory.cementType[0];

    $scope.$watch('selectedConcrete', () => update());
    $scope.$watch('selectedCement', () => update());

    var update = function () {
        //properties = new concretePropertiesProvider($scope.selectedClass)
        var properties = concreteProperties.getProperties($scope.selectedConcrete);

        $scope.fck = properties.fck;
        $scope.fckcube = properties.fckcube;
        $scope.properties = properties;

        $rootScope.$broadcast('concreteChange',
            {
                fck: $scope.fck,
                fcm: properties.fcm,
                fctm: properties.fctm,
                Ecm: properties.Ecm,
                cementClass: $scope.selectedCement
            });

        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    }
}]);

application.factory('concreteFactory', function () {
    return {
        concreteClass: ["C12/15", "C16/20", "C20/25", "C25/30", "C30/37", "C35/45", "C40/50", "C45/55", "C50/60", "C55/67", "C60/75", "C70/85", "C80/95", "C90/105"],
        cementType: ["S", "N", "R"],
    }
});

application.service('concreteProperties', function () {
    this.getProperties = function (concreteClass) {
        var strength = concreteClass.replace("C", "").split("/");

        var fck = Number(strength[0]);
        var fckcube = Number(strength[1]);

        var fcm = fck + 8;
        var fctm = fck <= 50 ? 0.3 * Math.pow(fck, 2 / 3) : 2.12 * Math.log(1 + fcm / 10);
        var fctk005 = 0.7 * fctm;
        var fctk095 = 1.3 * fctm;
        var Ecm = 22 * Math.pow(fcm / 10, 0.3);

        var ec1 = 0.7 * Math.pow(fcm, 0.31) > 2.8 ? 2.8 : 0.7 * Math.pow(fcm, 0.31);
        var ecu1 = fck < 50 ? 3.5 : 2.8 + 27 * Math.pow((98 - fcm) / 100, 4);
        var ec2 = fck < 50 ? 2.0 : 2.0 + 0.085 * Math.pow(fck - 50, 0.53);
        var ecu2 = fck < 50 ? 3.5 : 2.6 + 35 * Math.pow((90 - fck) / 100, 4);
        var n = fck < 50 ? 2 : 1.4 + 23.4 * Math.pow((90 - fck) / 100, 4);
        var ec3 = fck < 50 ? 1.75 : 1.75 + 0.55 * ((fck - 50) / 40)
        var ecu3 = fck < 50 ? 3.5 : 2.6 + 35 * Math.pow((90 - fck) / 100, 4);

        var result = {
            fck: fck,
            fckcube: fckcube,
            fcm: fcm,
            fctm: formatNumber(fctm),
            fctk005: formatNumber(fctk005),
            fctk095: formatNumber(fctk095),
            Ecm: formatNumber(Ecm),
            ec1: formatNumber(ec1),
            ecu1: formatNumber(ecu1),
            ec2: formatNumber(ec2),
            ecu2: formatNumber(ecu2),
            n: formatNumber(n),
            ec3: formatNumber(ec3),
            ecu3: formatNumber(ecu3),
        }
        return result;
    }

    function formatNumber(value) {
        return (Math.round(value * 100) / 100).toFixed(2);
    }
});

application.service('concreteFunctions', function () {
    const startDay = 3;
    const endDay = 60;

    this.getFunctions = function timeFunctions(fck, fcm, fctm, Ecm, cementType) {
        var cementFactor = (function () {
            var result;
            switch (cementType) {
                case "R":
                    result = 0.2;
                    break;
                case "N":
                    result = 0.25;
                    break;
                case "S":
                    result = 0.38;
                    break;
                default: result = 1
            }
            return result;
        })();
        var betaCC = function (t) {
            var result = Math.exp(cementFactor * (1 - (Math.sqrt(28 / t))));
            return result;
        };

        var fctmFunction = function (t) {
            var alpha = t >= 28 ? 2 / 3 : 1;

            var result = Math.pow(betaCC(t), alpha) * fctm;
            return result;
        };

        var fcmFunction = function (t) {
            var result = betaCC(t) * fcm;
            return result;
        }

        var fckFunction = function (t) {
            var result = t <= 28 ? fcmFunction(t) - 8 : fck;
            return result;
        }
        var EcmFunction = function (t) {
            var result = Math.pow(fcmFunction(t) / fcm, 0.3) * Ecm;
            return result;
        }

        var fcmValues = function () {
            var x = new Array();
            var y = new Array();
            for (var i = startDay; i < endDay; i++) {
                var value = fcmFunction(i);
                x.push(i);
                y.push(value);
            }
            return { x: x, y: y };
        }
        var fctmValues = function () {
            var x = new Array();
            var y = new Array();
            for (var i = startDay; i < endDay; i++) {
                var value = fctmFunction(i);
                x.push(i);
                y.push(value);
            }
            return { x: x, y: y };
        }
        var fckValues = function () {
            var x = new Array();
            var y = new Array();
            for (var i = startDay; i < endDay; i++) {
                var value = fckFunction(i);
                x.push(i);
                y.push(value);
            }
            return { x: x, y: y };
        }
        var EcmValues = function () {
            var x = new Array();
            var y = new Array();
            for (var i = startDay; i < endDay; i++) {
                var value = EcmFunction(i);
                x.push(i);
                y.push(value);
            }
            return { x: x, y: y };
        }
        return {
            fcm: fcmValues,
            fctm: fctmValues,
            fck: fckValues,
            Ecm: EcmValues,
        }
    }
})

application.service('nameConverter', function () {
    this.convertName = function convert(name) {
        var names = {
            fck: "\\(f_{ck} [{\\small MPa}]\\)",
            fckcube: "\\(f_{ck,cube} [{\\small MPa}]\\)",
            fcm: "\\(f_{cm} [{\\small MPa}]\\)",
            fctm: "\\(f_{ctm} [{\\small MPa}]\\)",
            fctk005: "\\(f_{ctk,005} [{\\small MPa}]\\)",
            fctk095: "\\(f_{ctk,095} [{\\small MPa}]\\)",
            Ecm: "\\(E_{cm} [{\\small GPa}]\\)",
            ec1: "\\(\\varepsilon_{c1} [{\\small^0/_{00}}]\\) ",
            ecu1: "\\(\\varepsilon_{cu1} [{\\small^0/_{00}}]\\)",
            ec2: "\\(\\varepsilon_{c2} [{\\small^0/_{00}}]\\)",
            ecu2: "\\(\\varepsilon_{cu2} [{\\small^0/_{00}}]\\)",
            n: "\\(n [{\\small-}]\\)",
            ec3: "\\(\\varepsilon_{c3} [{\\small^0/_{00}}]\\)",
            ecu3: "\\(\\varepsilon_{cu3} [{\\small^0/_{00}}]\\)",
        }
        return names[name];
    }
})