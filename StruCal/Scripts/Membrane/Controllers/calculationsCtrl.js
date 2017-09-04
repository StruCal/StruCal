angular.module('membraneFEM').controller('calculationsCtrl', ['$scope', '$rootScope', 'drawingService', '$http', function ($scope, $rootScope, drawingService, $http) {
    var inputData = {};
    var outputData = {};

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


        $http.post("/api/MembraneApi", inputData)
        .then(
        function (response) {
            outputData = angular.copy(response.data);
            updateDrawing(outputData);
            $scope.test = response.data;
            $scope.valid = true;
            $scope.dirty = false;
            $scope.error = false;
            $scope.progress = false;
            $scope.message = "Results are up to date"
        },
        function (response) {
            $scope.valid = false;
            $scope.dirty = false;
            $scope.error = true;
            $scope.progress = false;
            $scope.message = "An error has occured. Please try again."
        });

    };

    $scope.setResult = function (value) {
        switch (value) {
            case 'sxx':
                $scope.sxx = true;
                $scope.syy = false;
                $scope.txy = false;
                drawingService.setSxx();
                break;
            case 'syy':
                $scope.sxx = false;
                $scope.syy = true;
                $scope.txy = false;
                drawingService.setSyy();
                break;
            case 'txy':
                $scope.sxx = false;
                $scope.syy = false;
                $scope.txy = true;
                drawingService.setTxy();
                break;
            default:
                $scope.sxx = true;
                $scope.syy = false;
                $scope.txy = false;
                drawingService.setSxx();
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
        if (drawingService.drawOutput)
            drawingService.drawText($scope.text);
    });
    $scope.$watch('displacement', function () {
        if (drawingService.drawOutput) {
            drawingService.drawDisplacement($scope.displacement, $scope.supports, $scope.forces);
        }
    });
    $scope.$on('properties', function (event, arg) {
        inputData.Properties = arg;
    });
    $scope.$on('vertices', function (event, arg) {
        inputData.Vertices = arg;
    });
    $scope.$on('edges', function (event, arg) {
        inputData.Edges = arg;
    });


    function updateDrawing() {
            drawingService.setOutput(outputData);
            drawingService.drawSupports($scope.supports);
            drawingService.drawPointLoads($scope.forces);
            drawingService.drawText($scope.text);
            drawingService.drawDisplacement($scope.displacement, $scope.supports, $scope.forces);
    }

}]);