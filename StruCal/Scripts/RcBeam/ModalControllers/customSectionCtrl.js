angular.module('rcBeam').controller('customSectionCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
    $scope.sectionCoordinates = "0;0 200;0 200;200 0;200"
    $scope.barCoordinates = "100;50;10";

    $scope.$watchGroup(['sectionCoordinates', 'barCoordinates'], () => updateDrawing());
    $('#modalCustomSection').on('shown.bs.modal', () => updateDrawing());

    var drawing;
    function updateDrawing() {
        var canvasObject = $('#customDrawing');
        drawing = new customSectionDrawing(canvasObject);
        drawing.fillCanvas($scope.sectionCoordinates, $scope.barCoordinates);
    }
    $scope.save = function () {
        $('#modalCustomSection').modal('toggle');
        $rootScope.$broadcast('coordinates', drawing.coordinates);
        $rootScope.$broadcast('bars', drawing.bars);
        $rootScope.$broadcast('dirty', true);
    }
}]);