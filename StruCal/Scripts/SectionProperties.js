
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

function createCircularDrawing() {
    var canvasObject = $('#canvas');

    var radious = $("#Radious").val();


    var xString = "";
    var yString = "";

    for (i = 0; i <= 360; i=i+10) {
        var alfa = (i - 90) * Math.PI / 180;
        var x = (radious * Math.sin(alfa)).toFixed(2);  
        var y = (radious * Math.cos(alfa)).toFixed(2);
        xString = xString + x + ";";
        yString = yString + y + ";";
    }
    //add to the end starting values

    console.log(xString);
    console.log(yString);

    var x = splitCoordinates(xString);
    var y = splitCoordinates(yString);

    if (x.length != y.length) {
        return;
    }

    fillCanvas(x, y, canvasObject);
}