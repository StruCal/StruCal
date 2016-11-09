
function createCustomDrawing() {
    var canvasObject = $('#canvas');
    var xString = $("#XCoordinates").val();
    var yString = $("#YCoordinates").val();

    var x = splitCoordinates(xString);
    var y = splitCoordinates(yString);

    if (x.length != y.length) {
        return;
    }

    fillCanvas(x, y, canvasObject);
}

function createRectangularDrawing() {
    var canvasObject = $('#canvas');

    var width = $("#Width").val();
    var height = $("#Height").val();

    var xString = "0;" + width + ";" + width + ";0;";
    var yString = "0;0;" + height + ";" + height + ";";

    //var xString = $("#XCoordinates").val();
    //var yString = $("#YCoordinates").val();

    var x = splitCoordinates(xString);
    var y = splitCoordinates(yString);

    if (x.length != y.length) {
        return;
    }

    fillCanvas(x, y, canvasObject);
}