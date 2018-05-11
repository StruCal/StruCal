angular.module('rcBeam').controller('rectangularSectionCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
    $scope.width = 500;
    $scope.height = 200;
    $scope.cover = 20;
    $scope.bottomBarDiameter = 20;
    $scope.bottomBarCount = 5;
    $scope.topBarDiameter = 10;
    $scope.topBarCount = 2;

    var drawing;

    $scope.$watchGroup(['width', 'height', 'cover', 'bottomBarDiameter', 'bottomBarCount', 'topBarDiameter', 'topBarCount'], () => updateDrawing());
    $('#modalRectangularSection').on('shown.bs.modal', () => updateDrawing());

    function updateDrawing() {
        var canvasObject = $('#rectangleDrawing');
        var parentObject = canvasObject.siblings(".form-horizontal");
        //alert(parentObject.width());
        //fillCanvas(canvasObject,"", "");
        drawing = new rectangleSectionDrawing(canvasObject);
        drawing.fillCanvas($scope.width, $scope.height, $scope.topBarDiameter, $scope.topBarCount, $scope.bottomBarDiameter, $scope.bottomBarCount, $scope.cover);
    }

    $scope.save = function () {
        $('#modalRectangularSection').modal('toggle');

        $rootScope.$broadcast('coordinates', drawing.coordinates);
        $rootScope.$broadcast('bars', drawing.bars);
        $rootScope.$broadcast('dirty', true);
    }
}]);