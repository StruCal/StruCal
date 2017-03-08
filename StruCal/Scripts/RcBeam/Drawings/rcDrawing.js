
class rcDrawing {
    constructor(drawing) {
        this.drawing = drawing;
    }


    //drawing functions. Coordinates are provides as array
    drawSection(xCoordinates, yCoordinates, canvasObject) {
        this.maxX = getMaxValue(xCoordinates);
        this.minX = getMinValue(xCoordinates);
        this.maxY = getMaxValue(yCoordinates);
        this.minY = getMinValue(yCoordinates);
        this.sectionWidth = getSectionDimension(this.maxX, this.minX);
        this.sectionHeight = getSectionDimension(this.maxY, this.minY);

        //var sectionCentreX = ((maxX - minX) / 2)+minX;
        //var sectionCentreY = ((maxY - minY) / 2)+minY;
        this.sectionCentreX = getSectionCentre(this.minX, this.maxX);
        this.sectionCentreY = getSectionCentre(this.minY, this.maxY);

        //console.log('centers: ' + sectionCentreX + '   ' + sectionCentreY);

        this.canvasWidth = canvasObject.width();
        this.canvasHeight = canvasObject.height();

        this.scale = this.getDrawingScale();
        //console.log('scale: ' + this.scale);
        //convert coordinates to canvas
        var transferedX = [];
        var transferedY = [];
        for (var i = 0; i < xCoordinates.length; i++) {
            transferedX[i] = this.transferXToCanvasSystem(xCoordinates[i]);
            transferedY[i] = this.transferYToCanvasSystem(yCoordinates[i]);

            //console.log(String(transferedX[i]) + " " + String(transferedY[i]));
        }

        var chainCoordinates = transferCoordinatesToPlot(transferedX, transferedY);
        //console.log('chaincoordinates:' + chainCoordinates);
        var polygon = this.drawing.polygon(chainCoordinates).fill({ color: '#3276b1', opacity: 0.9 }).stroke({ width: 3, color: '#054072' });
    }

    drawBackgroundPattern(width, height) {
        //drawVerticalLines(drawing, width, height);
        //drawHorizontalLines(drawing, width, height);

        var patternSize = 20;

        //canvas width and height are rouned such way that they are multiplier of patternSize

        var correctedWidth = Math.floor(width / patternSize) * patternSize;
        var correctedHeight = Math.floor(height / patternSize) * patternSize;


        //var pattern = drawing.pattern(patternSize, patternSize, function (add) {
        //    add.line(0, 0, patternSize, 0).stroke({ width: 1, color: 'grey' });
        //    add.line(0, 0, 0, patternSize).stroke({ width: 1, color: 'grey' });
        //});
        var patternCentre = patternSize / 2;
        var pattern = this.drawing.pattern(patternSize, patternSize, function (add) {
            add.line(0, patternCentre, patternSize, patternCentre).stroke({ width: 1, color: 'LightGrey' });
            add.line(patternCentre, 0, patternCentre, patternSize).stroke({ width: 1, color: 'LightGrey' });
        });
        var rectangle = this.drawing.rect(correctedWidth, correctedHeight).fill(pattern);
        //bottom and right line
        //var bottomLine = drawing.rect(correctedWidth, correctedHeight).stroke({ width: 1, color: 'grey' }).fill('none').move(2,2);
        function drawVerticalLines(drawing, width, height) {
            var numberOfLines = 10;
            var distance = width / numberOfLines;

            for (i = 0; i <= numberOfLines; i++) {
                var x1 = 0 + i * distance;
                var x2 = x1;
                var y1 = 0;
                var y2 = height;

                //console.log(x1);
                var input = convertCoordinatesToLineInput(x1, y1, x2, y2);
                //console.log(input);
                var line = drawing.line(input).stroke({ width: 1, color: 'Gray' });
            }
        }
        function drawHorizontalLines(drawing, width, height) {
            var numberOfLines = 10;
            var distance = height / numberOfLines;

            for (i = 0; i <= numberOfLines; i++) {
                var x1 = 0;
                var x2 = width;
                var y1 = 0 + i * distance;
                var y2 = 0 + i * distance;

                //console.log(x1);
                var input = convertCoordinatesToLineInput(x1, y1, x2, y2);
                //console.log(input);
                var line = drawing.line(input).stroke({ width: 1, color: 'Gray' });
            }
        }
    }

    drawBars(bars) {
        for (var i = 0; i < bars.length; i++) {
            var bar = bars[i];
            var x = this.transferXToCanvasSystem(bar.x);
            var y = this.transferYToCanvasSystem(bar.y);
            var d = bar.d * this.scale;
            //console.log('x ' + x + ' y ' + y + ' d ' + d);
            var circle = this.drawing.circle(d).fill({ color: '#248f24' }).stroke({ width: 1, color: '#196619' });
            circle.x(x).y(y);
        }
    }


    //private methods
    transferXToCanvasSystem(pointX) {

        var x = ((pointX - this.sectionCentreX) * this.scale) + this.canvasWidth / 2;
        //console.log('poinX:' + pointX + ' centreX:' + this.sectionCentreX + ' scale:' + this.scale + ' canvasWidth:' + this.canvasWidth + ' x:' + x);
        return x;
    }
    transferYToCanvasSystem(pointY) {
        var y = (-(pointY - this.sectionCentreY) * this.scale) + this.canvasHeight / 2;
        return y;
    }
    getDrawingScale() {
        var factor = 2;

        var scale1 = this.canvasHeight / this.sectionHeight / factor;
        var scale2 = this.canvasWidth / this.sectionWidth / factor;

        var scale = Math.min(scale1, scale2);
        return scale;
    }
}









