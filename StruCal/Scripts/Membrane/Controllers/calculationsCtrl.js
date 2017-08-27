﻿angular.module('membraneFEM').controller('calculationsCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
    
    var canvas;
    var drawing;

    $scope.forces = true;
    $scope.supports = true;
    $scope.text = false;
    $scope.displacement = false;
    $scope.sxx = true;
    $scope.syy = false;
    $scope.txy = false;


    $scope.dirty = true;
    $scope.message = "Results are NOT up to date."

    $scope.calculate = function () {
        $scope.message = "Processing..."
        $scope.progress = true;
        $scope.dirty = false;
        startProgress();
    };

    $scope.setResult = function (value) {
        switch (value) {
            case 'sxx':
                $scope.sxx = true;
                $scope.syy = false;
                $scope.txy = false;
                break;
            case 'syy':
                $scope.sxx = false;
                $scope.syy = true;
                $scope.txy = false;
                break;
            case 'txy':
                $scope.sxx = false;
                $scope.syy = false;
                $scope.txy = true;
                break;
            default:
                $scope.sxx = true;
                $scope.syy = false;
                $scope.txy = false;
        }
    }
    $scope.setSettings = function (value) {
        $scope[value] = !($scope[value]);
    }
    
    function update() {

    }

    (function init() {
        canvas = document.getElementById("membraneCanvas");

        canvas.setAttribute("style", "height:" + (canvas.offsetWidth / 2).toFixed(0) + "px");
        var membraneOutput = getMembraneOutput();

        drawing = new drawingCreator(canvas);

        drawing.setMembraneOutput(membraneOutput).setSxx().updateOutput();

        //drawing.setMembraneInput(membraneOutput.InputData).updateInput();

        function animate() {
            requestAnimationFrame(animate);
            drawing.renderer.render(drawing.scene, drawing.camera);
            drawing.controls.update();

            drawing.updateText();
        }
        animate();
    })();

}]);