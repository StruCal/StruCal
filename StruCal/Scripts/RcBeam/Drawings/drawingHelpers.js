function convertCoordinatesToLineInput(x1, y1, x2, y2) {
    var result = x1.toString() + ',' + y1.toString() + ' ' + x2.toString() + ',' + y2.toString();
    return result;
}
//transfers arrays of x and y coordinates to the following string
function transferCoordinatesToPlot(xCoordinates, yCoordinates) {
    var coordinates = "";
    for (i = 0; i < xCoordinates.length; i++) {
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