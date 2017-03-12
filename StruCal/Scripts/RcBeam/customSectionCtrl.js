angular.module('rcBeam').controller('customSectionCtrl', function ($scope, $rootScope) {
    $scope.sectionCoordinates= "0;0 200;0 200;200 0;200"
    $scope.barCoordinates = "100;50;10";

    
    $scope.$watchGroup(['sectionCoordinates', 'barCoordinates'], () =>updateDrawing());
    $('#modalCustomSection').on('shown.bs.modal', () =>updateDrawing());
    
    function updateDrawing() {
        var canvasObject = $('#customDrawing');
        var drawing = new customSectionDrawing(canvasObject);
        drawing.fillCanvas($scope.sectionCoordinates, $scope.barCoordinates);
    }

});



