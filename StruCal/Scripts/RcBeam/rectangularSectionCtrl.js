angular.module('rcBeam').controller('rectangularSectionCtrl', function ($scope, $rootScope) {
    
    

    $('#modalRectangularSection').on('shown.bs.modal', function () {
        var canvasObject = $('#rectangleDrawing');
        var parentObject = canvasObject.siblings(".form-horizontal");
        //alert(parentObject.width());
        fillCanvas(canvasObject,"", "");
    })

});




function fillCanvas(canvasObject, xCoordnates, yCoordinates, bars) {
    //var canvasObject = $('#' + canvasParentId);
    canvasObject.empty();

    var canvasWidth = canvasObject.width();
    var canvasHeight = canvasWidth * 0.5;
    canvasObject.height(canvasHeight);

    var drawing = SVG(canvasObject.attr('id')).size(canvasWidth, canvasHeight);

    //drawVerticalLines(drawing, canvasWidth, canvasHeight);
    //drawHorizontalLines(drawing, canvasWidth, canvasHeight);
    //drawBackgroundPattern(drawing, canvasWidth, canvasHeight);
    
    var drawingCreator = new rcDrawing(drawing);
    drawingCreator.drawBackgroundPattern(canvasWidth, canvasHeight)

    var xCoordinates = new Array();
    xCoordinates.push(0);
    xCoordinates.push(10);
    xCoordinates.push(10);
    xCoordinates.push(0);
    var yCoordinates = new Array();
    yCoordinates.push(0);
    yCoordinates.push(0);
    yCoordinates.push(10);
    yCoordinates.push(10);

    drawingCreator.drawSection(xCoordinates, yCoordinates, canvasObject);

    var bars = new Array();
    bars.push({ x: 2, y: 2, d: 1 });
    bars.push({ x: 7, y: 2, d: 2 });
    console.log(bars);
    drawingCreator.drawBars(bars)
}