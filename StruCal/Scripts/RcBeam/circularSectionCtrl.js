angular.module('rcBeam').controller('circularSectionCtrl', function ($scope, $rootScope) {
    $scope.diameter = 500;
    $scope.cover = 20;
    $scope.barDiameter = 20;
    $scope.barCount = 5;

    $scope.$watchGroup(['diameter', 'cover', 'barDiameter', 'barCount'], () =>updateDrawing());
    $('#modalCircularSection').on('shown.bs.modal', () =>updateDrawing());

    function updateDrawing() {
        var canvasObject = $('#circleDrawing');
        var drawing = new circularSectionDrawing(canvasObject);
        drawing.fillCanvas($scope.diameter, $scope.barDiameter, $scope.barCount, $scope.cover);
    }

});



