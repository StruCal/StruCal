class circularSectionDrawing {
    constructor(canvasObject) {
        this.canvasObject = canvasObject;
    }

    fillCanvas(diameter, barDiameter, barCount, cover) {
        this.canvasObject.empty();
        var canvasWidth = this.canvasObject.width();
        var canvasHeight = canvasWidth * 0.5;
        this.canvasObject.height(canvasHeight);

        var xCoordinates = this.getXCoordinates(diameter);
        var yCoordinates = this.getYCoordinates(diameter);
        var bars = this.getBarsCoordinates(diameter, barDiameter, barCount, cover);

        var drawing = SVG(this.canvasObject.attr('id')).size(canvasWidth, canvasHeight);

        var drawingCreator = new rcDrawing(drawing);
        drawingCreator.drawBackgroundPattern(canvasWidth, canvasHeight)



        drawingCreator.drawSection(xCoordinates, yCoordinates, this.canvasObject);

        //var bars = new Array();
        //bars.push({ x: 2, y: 2, d: 1 });
        //bars.push({ x: 7, y: 2, d: 2 });
        //console.log(bars);
        drawingCreator.drawBars(bars)
    }

    getXCoordinates(diameter) {
        var xCoordinates = new Array();

        for (var i = 0; i < 360; i++) {
            var alpha = (i - 90) * Math.PI / 180;
            var x = diameter / 2 * Math.sin(alpha);
            xCoordinates.push(x);
        }

        return xCoordinates;
    }
    getYCoordinates(diameter) {
        var yCoordinates = new Array();
        for (var i = 0; i < 360; i++) {
            var alpha = (i - 90) * Math.PI / 180;
            var y = diameter / 2 * Math.cos(alpha);
            yCoordinates.push(y);
        }
        return yCoordinates;
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