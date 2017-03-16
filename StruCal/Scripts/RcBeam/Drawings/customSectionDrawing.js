class customSectionDrawing {
    constructor(canvasObject) {
        this.canvasObject = canvasObject;
    }

    fillCanvas(sectionCoordinates, barCoordinates) {
        this.canvasObject.empty();
        var canvasWidth = this.canvasObject.width();
        var canvasHeight = canvasWidth * 0.5;
        this.canvasObject.height(canvasHeight);

        this.coordinates = this.getCoordinates(sectionCoordinates);
        this.bars = this.getBarsCoordinates(barCoordinates);
        //console.log(xCoordinates);
        var drawing = SVG(this.canvasObject.attr('id')).size(canvasWidth, canvasHeight);

        var drawingCreator = new rcDrawing(drawing);
        drawingCreator.drawBackgroundPattern(canvasWidth, canvasHeight)
        drawingCreator.drawSection(this.coordinates, this.canvasObject);
        drawingCreator.drawBars(this.bars)
    }

    getCoordinates(sectionCoordinates) {
        var coordinates = new Array();

        var splitedCoordinates = sectionCoordinates.split(' ');

        for (var i = 0; i < splitedCoordinates.length; i++) {
            let tempCoord = splitedCoordinates[i].split(';');
            coordinates.push({ x: tempCoord[0], y: tempCoord[1] });
        }

        return coordinates;
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