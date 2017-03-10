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


class customSectionDrawing {
    constructor(canvasObject) {
        this.canvasObject = canvasObject;
    }

    fillCanvas(sectionCoordinates, barCoordinates) {
        this.canvasObject.empty();
        var canvasWidth = this.canvasObject.width();
        var canvasHeight = canvasWidth * 0.5;
        this.canvasObject.height(canvasHeight);

        var xCoordinates = this.getXCoordinates(sectionCoordinates);
        var yCoordinates = this.getYCoordinates(sectionCoordinates);
        var bars = this.getBarsCoordinates(barCoordinates);
        //console.log(xCoordinates);
        var drawing = SVG(this.canvasObject.attr('id')).size(canvasWidth, canvasHeight);

        var drawingCreator = new rcDrawing(drawing);
        drawingCreator.drawBackgroundPattern(canvasWidth, canvasHeight)
        drawingCreator.drawSection(xCoordinates, yCoordinates, this.canvasObject);
        drawingCreator.drawBars(bars)
    }

    getXCoordinates(sectionCoordinates) {
        var xCoordinates = new Array();

        var splitedCoordinates = sectionCoordinates.split(' ');

        for (var i = 0; i < splitedCoordinates.length; i++) {
 
            let tempCoord = splitedCoordinates[i].split(';');
            //console.log(tempCoord);
            xCoordinates.push(Number(tempCoord[0]));
        }

        return xCoordinates;
    }
    getYCoordinates(sectionCoordinates) {
        var yCoordinates = new Array();
        var splitedCoordinates = sectionCoordinates.split(' ');

        for (var i = 0; i < splitedCoordinates.length; i++) {
            
            let tempCoord = splitedCoordinates[i].split(';');
            //console.log(tempCoord);
            yCoordinates.push(Number(tempCoord[1]));
        }

        return yCoordinates;
    }
    getBarsCoordinates(barCoordinates) {
        var bars = new Array();

        var splitedBars = barCoordinates.split(' ');

        for (var i = 0; i < splitedBars.length; i++) {
            var tempBar = splitedBars[i].split(';');
            var x = tempBar[0];
            var y = tempBar[1];
            var d = tempBar[2];
            bars.push({ x, y, d });
        }

        
        return bars;
    }
}
