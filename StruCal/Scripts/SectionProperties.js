
function createCustomDrawing() {
    var canvasObject = $('#canvas');
    //var xString = $("#XCoordinates").val() == "" ? $("#XCoordinates").attr("placeholder") : $("#XCoordinates").val();
    //var yString = $("#YCoordinates").val() == "" ? $("#YCoordinates").attr("placeholder") : $("#YCoordinates").val();
    var coordinates = getInputValue("#Coordinates");
    //var yString = getInputValue("#YCoordinates");

    var xCoord = "";
    var yCoord = "";

    var splitedCoordinates = coordinates.split(" ");

    for (var i = 0; i < splitedCoordinates.length; i++) {
        var tempCoord = splitedCoordinates[i].split(";");
        xCoord = xCoord + tempCoord[0] + ";";
        yCoord = yCoord + tempCoord[1] + ";";
    }

    var x = splitCoordinates(xCoord);
    var y = splitCoordinates(yCoord);

    if (x.length != y.length) {
        return;
    }

    fillCanvas(x, y, canvasObject);

    function splitCoordinates(coordinates) {
        var splitedCoordinates = coordinates.split(";");
        //console.log("Splited coordinates: " + splitedCoordinates);

        var result = new Array();
        for (var i = 0; i < splitedCoordinates.length; i++) {
            if (splitedCoordinates[i] != "")
                result[i] = splitedCoordinates[i];
        }

        return result;
    }
}
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
function createRectangularDrawing() {
    var canvasObject = $('#canvas');

    //var width = $("#Width").val() == "" ? $("#Width").attr("placeholder") : $("#Width").val();
    //var height = $("#Height").val() == "" ? $("#Height").attr("placeholder") : $("#Height").val();
    var width = getInputValue("#Width");
    var height = getInputValue("#Height");

    var xString = "0;" + width + ";" + width + ";0;";
    var yString = "0;0;" + height + ";" + height + ";";

    var x = splitCoordinates(xString);
    var y = splitCoordinates(yString);

    if (x.length != y.length) {
        return;
    }

    fillCanvas(x, y, canvasObject);
}

function createCircularDrawing() {
    var canvasObject = $('#canvas');

    //var radious = $("#Radious").val() == "" ? $("#Radious").attr("placeholder") : $("#Radious").val();
    var radious = getInputValue("#Radious");

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

function createTSectionDrawing() {
    var canvasObject = $('#canvas');

    var height = getInputValue("#Height");
    var webThickness = getInputValue("#WebThickness");
    var flangeThickness = getInputValue("#FlangeThickness");
    var flangeWidth = getInputValue("#FlangeWidth");

    var x = new Array();
    x.push(0);
    x.push(0);
    x.push(flangeWidth / 2 - webThickness / 2);
    x.push(flangeWidth / 2 - webThickness / 2);
    x.push(flangeWidth / 2 + webThickness / 2);
    x.push(flangeWidth / 2 + webThickness / 2);
    x.push(flangeWidth);
    x.push(flangeWidth);

    var y = new Array();
    y.push(height);
    y.push(height - flangeThickness);
    y.push(height - flangeThickness);
    y.push(0);
    y.push(0);
    y.push(height - flangeThickness);
    y.push(height - flangeThickness);
    y.push(height);

    var xString = x.join(";");
    var yString = y.join(";");

    var x = splitCoordinates(xString);
    var y = splitCoordinates(yString);

    if (x.length != y.length) {
        return;
    }

    fillCanvas(x, y, canvasObject);
}

function createISectionDrawing() {
    var canvasObject = $('#canvas');

    var height = getInputValue("#Height");
    var webThickness = getInputValue("#WebThickness");
    var topFlangeThickness = getInputValue("#TopFlangeThickness");
    var topFlangeWidth = getInputValue("#TopFlangeWidth");
    var bottomFlangeThickness = getInputValue("#BottomFlangeThickness");
    var bottomFlangeWidth = getInputValue("#BottomFlangeWidth");

    var x = new Array();
    x.push(-topFlangeWidth / 2);//upper left corner
    x.push(-topFlangeWidth / 2);
    x.push(-webThickness / 2);
    x.push(-webThickness / 2);
    x.push(-bottomFlangeWidth / 2);
    x.push(-bottomFlangeWidth / 2);
    x.push(bottomFlangeWidth / 2);
    x.push(bottomFlangeWidth / 2);
    x.push(webThickness / 2);
    x.push(webThickness / 2);
    x.push(topFlangeWidth / 2);
    x.push(topFlangeWidth / 2);

    var y = new Array();
    y.push(height);
    y.push(height - topFlangeThickness);
    y.push(height - topFlangeThickness);
    y.push(bottomFlangeThickness);
    y.push(bottomFlangeThickness);
    y.push(0);
    y.push(0);
    y.push(bottomFlangeThickness);
    y.push(bottomFlangeThickness);
    y.push(height - topFlangeThickness);
    y.push(height - topFlangeThickness);
    y.push(height);

    var xString = x.join(";");
    var yString = y.join(";");

    var x = splitCoordinates(xString);
    var y = splitCoordinates(yString);

    if (x.length != y.length) {
        return;
    }

    fillCanvas(x, y, canvasObject);
}

function getInputValue(id)
{
    return $(id).val() == "" ? $(id).attr("placeholder") : $(id).val();
}