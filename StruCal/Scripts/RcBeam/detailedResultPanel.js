﻿angular.module('rcBeam').controller('detailedResultPanelCtrl', function ($scope) {
    var results;
    var loadCaseResults;
    var currentLoadCase;
    var currentLoadCaseName;

    $scope.$on('currentLoadCaseName', function (event, arg) {
        currentLoadCaseName = arg;
        updateLoadCase();
    });
    $scope.$on('results', function (event, arg) {
        results = arg;
        loadCaseResults = results.LoadCaseResults;

        $scope.H = results.H;
        $scope.Cz = results.Cz;
        $scope.concreteGrade = results.Concrete.Grade;
        $scope.steelGrade = results.Steel.Grade;
        $scope.Fcd = results.Concrete.Fcd;
        $scope.Fyd = results.Steel.Fyd;
        $scope.Eud = results.Steel.Eud;

        updateLoadCase();
    });

    function updateLoadCase() {
        $scope.currentLoadCase = loadCaseResults.filter(e=>e.LoadCase.Name == currentLoadCaseName)[0];
        //$scope.normalForce = currentLoadCase.LoadCase.NormalForce;
    };
});