class rectangleSectionDrawing {
    constructor(canvasObject) {
        this.canvasObject = canvasObject;
    }

    fillCanvas(width, height, topBarDiameter, topBarCount, bottomBarDiameter, bottomBarCount, cover) {
        this.canvasObject.empty();
        var canvasWidth = this.canvasObject.width();
        var canvasHeight = canvasWidth * 0.5;
        this.canvasObject.height(canvasHeight);

        this.coordinates = this.getCoordinates(width, height);

        this.bars = this.getBarsCoordinates(width, height, topBarDiameter, topBarCount, bottomBarDiameter, bottomBarCount, cover);

        var drawing = SVG(this.canvasObject.attr('id')).size(canvasWidth, canvasHeight);

        var drawingCreator = new rcDrawing(drawing);
        drawingCreator.drawBackgroundPattern(canvasWidth, canvasHeight)

        drawingCreator.drawSection(this.coordinates, this.canvasObject);

        drawingCreator.drawBars(this.bars)
    }

    getCoordinates(width,height){
        var coordinates = new Array();

        coordinates.push({x:0,y:0});
        coordinates.push({x:0.5 * width,y:0});
        coordinates.push({x:0.5 * width,y:-height});
        coordinates.push({x:-0.5 * width,y:-height});
        coordinates.push({x:-0.5 * width,y:0});
        coordinates.push({x:0,y:0});

        return coordinates;
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