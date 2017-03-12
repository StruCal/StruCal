angular.module('rcBeam').controller('rectangularSectionCtrl', function ($scope, $rootScope) {
    $scope.width = 500;
    $scope.height = 200;
    $scope.cover = 20;
    $scope.bottomBarDiameter = 20;
    $scope.bottomBarCount = 5;
    $scope.topBarDiameter = 10;
    $scope.topBarCount = 2;
    
    $scope.$watchGroup(['width', 'height','cover','bottomBarDiameter','bottomBarCount','topBarDiameter','topBarCount'], ()=>updateDrawing());
    $('#modalRectangularSection').on('shown.bs.modal', () =>updateDrawing());

    function updateDrawing() {
        var canvasObject = $('#rectangleDrawing');
        var parentObject = canvasObject.siblings(".form-horizontal");
        //alert(parentObject.width());
        //fillCanvas(canvasObject,"", "");
        var drawing = new rectangleSectionDrawing(canvasObject);
        drawing.fillCanvas($scope.width, $scope.height, $scope.topBarDiameter, $scope.topBarCount, $scope.bottomBarDiameter, $scope.bottomBarCount, $scope.cover);
    }

});




//function fillCanvas(canvasObject, xCoordnates, yCoordinates, bars) {
//    //var canvasObject = $('#' + canvasParentId);
//    canvasObject.empty();

//    var canvasWidth = canvasObject.width();
//    var canvasHeight = canvasWidth * 0.5;
//    canvasObject.height(canvasHeight);

//    var drawing = SVG(canvasObject.attr('id')).size(canvasWidth, canvasHeight);

//    //drawVerticalLines(drawing, canvasWidth, canvasHeight);
//    //drawHorizontalLines(drawing, canvasWidth, canvasHeight);
//    //drawBackgroundPattern(drawing, canvasWidth, canvasHeight);
    
//    var drawingCreator = new rcDrawing(drawing);
//    drawingCreator.drawBackgroundPattern(canvasWidth, canvasHeight)

//    var xCoordinates = new Array();
//    xCoordinates.push(0);
//    xCoordinates.push(10);
//    xCoordinates.push(10);
//    xCoordinates.push(0);
//    var yCoordinates = new Array();
//    yCoordinates.push(0);
//    yCoordinates.push(0);
//    yCoordinates.push(10);
//    yCoordinates.push(10);

//    drawingCreator.drawSection(xCoordinates, yCoordinates, canvasObject);

//    var bars = new Array();
//    bars.push({ x: 2, y: 2, d: 1 });
//    bars.push({ x: 7, y: 2, d: 2 });
//    console.log(bars);
//    drawingCreator.drawBars(bars)
//}