angular.module('rcBeam').controller('circularSectionCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
    $scope.diameter = 500;
    $scope.cover = 20;
    $scope.barDiameter = 20;
    $scope.barCount = 5;

    $scope.$watchGroup(['diameter', 'cover', 'barDiameter', 'barCount'], () => updateDrawing());
    $('#modalCircularSection').on('shown.bs.modal', () => updateDrawing());

    var drawing;
    function updateDrawing() {
        var canvasObject = $('#circleDrawing');
        drawing = new circularSectionDrawing(canvasObject);
        drawing.fillCanvas($scope.diameter, $scope.barDiameter, $scope.barCount, $scope.cover);
    }

    $scope.save = function () {
        $('#modalCircularSection').modal('toggle');
        $rootScope.$broadcast('coordinates', drawing.coordinates);
        $rootScope.$broadcast('bars', drawing.bars);
        $rootScope.$broadcast('dirty', true);
    }
}]);