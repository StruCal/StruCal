angular.module('rcBeam').service('steelService', function () {
    var self = this;
    this.getSteelClasses = function () {
        return [
        {
            grade: "A",
            k: 1.05,
            euk: 0.025,
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

    this.getChartValues = function (fyd, fyk, eud, euk, k, E) {
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

        for (var i = 0; i < euk; i = i + 0.0001) {
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