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

    drawSection(drawing, xCoordinates, yCoordinates, canvasObject);

}

//drawing functions. Coordinates are provides as array
function drawSection(drawing, xCoordinates, yCoordinates, canvasObject) {

    var maxX = getMaxValue(xCoordinates);
    var minX = getMinValue(xCoordinates);
    var maxY = getMaxValue(yCoordinates);
    var minY = getMinValue(yCoordinates);
    var sectionWidth = getSectionDimension(maxX, minX);
    var sectionHeight = getSectionDimension(maxY, minY);

    //var sectionCentreX = ((maxX - minX) / 2)+minX;
    //var sectionCentreY = ((maxY - minY) / 2)+minY;
    var sectionCentreX = getSectionCentre(minX, maxX);
    var sectionCentreY = getSectionCentre(minY, maxY);

    //console.log('centers: ' + sectionCentreX + '   ' + sectionCentreY);

    var canvasWidth = canvasObject.width();
    var canvasHeight = canvasObject.height();

    var scale = getDrawingScale(canvasWidth, canvasHeight, sectionWidth, sectionHeight);
    //convert coordinates to canvas
    var transferedX = [];
    var transferedY = [];
    for (i = 0; i < xCoordinates.length; i++) {
        transferedX[i] = transferXToCanvasSystem(xCoordinates[i], sectionCentreX, scale, canvasWidth);
        transferedY[i] = transferYToCanvasSystem(yCoordinates[i], sectionCentreY, scale, canvasHeight);

        //console.log(String(transferedX[i]) + " " + String(transferedY[i]));
    }

    var chainCoordinates = transferCoordinatesToPlot(transferedX, transferedY);
    //console.log('chaincoordinates:' + chainCoordinates);
    var polygon = drawing.polygon(chainCoordinates).fill({ color: '#3276b1', opacity: 0.9 }).stroke({ width: 3, color: '#054072' });
}

function drawBackgroundPattern(drawing, width, height) {
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
    var pattern = drawing.pattern(patternSize, patternSize, function (add) {
        add.line(0, patternCentre, patternSize, patternCentre).stroke({ width: 1, color: 'LightGrey' });
        add.line(patternCentre, 0, patternCentre, patternSize).stroke({ width: 1, color: 'LightGrey' });
    });
    var rectangle = drawing.rect(correctedWidth, correctedHeight).fill(pattern);
    //bottom and right line
    //var bottomLine = drawing.rect(correctedWidth, correctedHeight).stroke({ width: 1, color: 'grey' }).fill('none').move(2,2);

}
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

function convertCoordinatesToLineInput(x1, y1, x2, y2) {
    var result = x1.toString() + ',' + y1.toString() + ' ' + x2.toString() + ',' + y2.toString();
    return result;
}

//transfers arrays of x and y coordinates to the following string
function transferCoordinatesToPlot(xCoordinates, yCoordinates) {
    var coordinates = "";
    for (i = 0; i < xCoordinates.length - 1; i++) {
        var x = xCoordinates[i].toFixed(2);
        var y = yCoordinates[i].toFixed(2);
        //console.log(xCoordinates[i].toFixed(2) + " " + yCoordinates[i].toFixed(2));
        //console.log(x + " " + y);
        //console.log("======");
        var insert = x + "," + y;
        coordinates = coordinates + insert + " ";
    }
    console.log("plot: " + coordinates);
    return coordinates;
}

function transferXToCanvasSystem(pointX, centreX, scale, canvasWidth) {

    var x = ((pointX - centreX) * scale) + canvasWidth / 2;
    //console.log('poinX:' + pointX + ' centreX:' + centreX + ' scale:' + scale + ' canvasWidth:' + canvasWidth + ' x:' + x);
    return x;
}

function transferYToCanvasSystem(pointY, centreY, scale, canvasHeight) {
    var y = (-(pointY - centreY) * scale) + canvasHeight / 2;
    return y;
}

function getMaxValue(array) {
    return Math.max.apply(null, array);
}

function getMinValue(array) {
    return Math.min.apply(null, array);
}

function getSectionCentre(minCoordinate, maxCoordinate) {
    return ((maxCoordinate - minCoordinate) / 2) + minCoordinate;
}

function getSectionDimension(maxCoordinates, minCoordinates) {
    var dimension = maxCoordinates - minCoordinates;
    return dimension;
}

function getDrawingScale(canvasWidth, canvasHeight, sectionWidth, sectionHeight) {
    var factor = 2;

    var scale1 = canvasHeight / sectionHeight / factor;
    var scale2 = canvasWidth / sectionWidth / factor;

    var scale = Math.min(scale1, scale2);
    return scale;
}

function splitCoordinates(coordinates) {
    var splitedCoordinates = coordinates.split(";");
    console.log("Splited coordinates: "+splitedCoordinates);
    return splitedCoordinates
}