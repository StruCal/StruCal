class circularSectionDrawing {
    constructor(canvasObject) {
        this.canvasObject = canvasObject;
    }

    fillCanvas(diameter, barDiameter, barCount, cover) {
        this.canvasObject.empty();
        var canvasWidth = this.canvasObject.width();
        var canvasHeight = canvasWidth * 0.5;
        this.canvasObject.height(canvasHeight);

        this.coordinates = this.getCoordinates(diameter);

        this.bars = this.getBarsCoordinates(diameter, barDiameter, barCount, cover);

        var drawing = SVG(this.canvasObject.attr('id')).size(canvasWidth, canvasHeight);

        var drawingCreator = new rcDrawing(drawing);
        drawingCreator.drawBackgroundPattern(canvasWidth, canvasHeight)

        drawingCreator.drawSection(this.coordinates, this.canvasObject);

        drawingCreator.drawBars(this.bars)
    }

    getCoordinates(diameter) {
        var coordinates = new Array();

        for (var i = 0; i < 360; i++) {
            var alpha = (i - 90) * Math.PI / 180;
            var x = diameter / 2 * Math.sin(alpha);
            var y = diameter / 2 * Math.cos(alpha);
            coordinates.push({ x, y });
        }

        return coordinates;
    }

    getBarsCoordinates(diameter, barDiameter, barCount, cover) {
        var bars = new Array();

        var deltaAlfa = 360 / barCount;
        for (var i = 1; i <= barCount; i++) {
            var alpha = (-180 + (i - 1) * deltaAlfa) * Math.PI / 180;
            var x = (diameter / 2 - cover - barDiameter / 2) * Math.sin(alpha);
            var y = (diameter / 2 - cover - barDiameter / 2) * Math.cos(alpha);
            var d = barDiameter;
            bars.push({ x, y, d });
            //alert("height:" + height + " cover: " + cover + " d: " + bottomBarDiameter + " y: " + y);
        }
        return bars;
    }
}