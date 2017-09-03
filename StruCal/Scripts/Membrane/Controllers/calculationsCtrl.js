angular.module('membraneFEM').controller('calculationsCtrl', ['$scope', '$rootScope','drawingService', function ($scope, $rootScope,drawingService) {
    

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
        if (drawingService.drawOutput)
            drawingService.drawDisplacement($scope.displacement,$scope.supports,$scope.forces);
    });

    

    

}]);