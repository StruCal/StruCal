
function createCustomDrawing() {
    var canvasObject = $('#canvas');
    //var xString = $("#XCoordinates").val() == "" ? $("#XCoordinates").attr("placeholder") : $("#XCoordinates").val();
    //var yString = $("#YCoordinates").val() == "" ? $("#YCoordinates").attr("placeholder") : $("#YCoordinates").val();
    var xString = getInputValue("#XCoordinates");
    var yString = getInputValue("#YCoordinates");


    var x = splitCoordinates(xString);
    var y = splitCoordinates(yString);

    if (x.length != y.length) {
        return;
    }

    fillCanvas(x, y, canvasObject);
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