class rectangleSectionDrawing {
    constructor(canvasObject) {
        this.canvasObject = canvasObject;
    }

    fillCanvas(width, height, topBarDiameter, topBarCount, bottomBarDiameter, bottomBarCount, cover) {
        this.canvasObject.empty();
        var canvasWidth = this.canvasObject.width();
        var canvasHeight = canvasWidth * 0.5;
        this.canvasObject.height(canvasHeight);

        var xCoordinates = this.getXCoordinates(width);
        var yCoordinates = this.getYCoordinates(height);
        var bars = this.getBarsCoordinates(width, height, topBarDiameter, topBarCount, bottomBarDiameter, bottomBarCount, cover);

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

    getXCoordinates(width) {
        var xCoordinates = new Array();
        xCoordinates.push(0);
        xCoordinates.push(0.5 * width);
        xCoordinates.push(0.5 * width);
        xCoordinates.push(-0.5 * width);
        xCoordinates.push(-0.5 * width);
        xCoordinates.push(0);

        return xCoordinates;
    }
    getYCoordinates(height) {
        var yCoordinates = new Array();
        yCoordinates.push(0);
        yCoordinates.push(0);
        yCoordinates.push(-height);
        yCoordinates.push(-height);
        yCoordinates.push(0);
        yCoordinates.push(0);
        return yCoordinates;
    }
    getBarsCoordinates(width, height, topBarDiameter, topBarCount, bottomBarDiameter, bottomBarCount, cover) {
        var bars = new Array();

        var distanceBetweenTopBars = (width - 2 * cover - topBarDiameter) / (topBarCount + 1);
        var distnaceBetweenBottomBars = (width - 2 * cover - bottomBarDiameter) / (bottomBarCount + 1);

        //bottom bars
        for (var i = 1; i <= bottomBarCount; i++) {
            var x = i * distnaceBetweenBottomBars - (width / 2 - cover - bottomBarDiameter / 2);
            var y = -height + cover + bottomBarDiameter / 2;
            var d = bottomBarDiameter;
            bars.push({ x, y, d });
            //alert("height:" + height + " cover: " + cover + " d: " + bottomBarDiameter + " y: " + y);
        }
        //top bars
        for (var i = 1; i <= topBarCount; i++) {
            var x = i * distanceBetweenTopBars - (width / 2 - cover - topBarDiameter / 2);
            var y = -cover - topBarDiameter / 2;
            var d = topBarDiameter;
            bars.push({ x, y, d });
            //alert("width:" + width + " cover: " + cover + " d: " + bottomBarDiameter + " y: " + y);
        }
        return bars;
    }
}