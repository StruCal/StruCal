angular.module('membraneFEM').controller('calculationsCtrl', ['$scope', '$rootScope','drawingService', function ($scope, $rootScope,drawingService) {
    
    drawingService.initialize();

    $scope.forces = true;
    $scope.supports = true;
    $scope.text = true;
    $scope.displacement = true;
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
    
    $scope.$watch('supports', function () {
        drawingService.drawSupports($scope.supports);
    });
    $scope.$watch('forces', function () {
        drawingService.drawPointLoads($scope.forces);
    });
    $scope.$watch('text', function () {
        drawingService.drawText($scope.text);
    });

    function update() {

    }

    (function init() {
        //canvas = document.getElementById("membraneCanvas");

        //canvas.setAttribute("style", "height:" + (canvas.offsetWidth / 2).toFixed(0) + "px");
        //var membraneOutput = getMembraneOutput();

        //drawing = new drawingCreator(canvas);

        //drawing.setMembraneOutput(membraneOutput).setSxx().updateOutput();

        ////drawing.setMembraneInput(membraneOutput.InputData).updateInput();

        //function animate() {
        //    requestAnimationFrame(animate);
        //    drawing.renderer.render(drawing.scene, drawing.camera);
        //    drawing.controls.update();

        //    drawing.updateText();
        //}
        //animate();
    })();

}]);