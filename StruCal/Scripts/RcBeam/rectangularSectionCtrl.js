angular.module('rcBeam').controller('rectangularSectionCtrl', function ($scope, $rootScope) {
    
    var canvasObject = $('#rectangleDrawing');
    var parentObject = canvasObject.siblings(".form-horizontal");
    alert(parentObject.width());
    fillCanvas("", "", canvasObject);
});

function fillCanvas(xCoordinates, yCoordinates, canvasObject) {
    //var canvasObject = $('#' + canvasParentId);
    canvasObject.empty();

    var canvasWidth = canvasObject.width();
    var canvasHeight = canvasWidth * 0.5;
    canvasObject.height(canvasHeight);

    var drawing = SVG(canvasObject.attr('id')).size(canvasWidth, canvasHeight);

    //drawVerticalLines(drawing, canvasWidth, canvasHeight);
    //drawHorizontalLines(drawing, canvasWidth, canvasHeight);
    drawBackgroundPattern(drawing, canvasWidth, canvasHeight);

    //drawSection(drawing, xCoordinates, yCoordinates, canvasObject);

}