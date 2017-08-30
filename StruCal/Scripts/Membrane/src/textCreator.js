function textCreator(scene, camera, canvas, transformationFunction, result, controls, scaleCalculator) {
    var self = this;
    var membraneOutput;

    var boxRightMargin = 50;
    var boxLeftMargin = 10;

    var textHeight = 10;
    var textWidth = 10;

    var width = canvas.clientWidth;
    var height = canvas.clientHeight;
    var top = 0;//canvas.offsetTop;
    var left = 0;//canvas.offsetLeft;

    var minX = left + boxLeftMargin;
    var maxX = width + left - boxRightMargin;
    var minY = top;
    var maxY = top + height;

    var translation;

    this.update = function() {
        var triangles = membraneOutput.Triangles;
        translation = scaleCalculator.getCentreTranslation();
        for (var i = 0; i < triangles.length; i++) {
            var triangle = triangles[i];
            createText(triangle);
        }
    }
    this.remove = function () {
        var elements = document.querySelectorAll('[id^="triangle"');
        for (var i = 0; i < elements.length; i++) {
            canvas.removeChild(elements[i]);
        }
    }

    function createText(triangle) {
        camera.updateMatrixWorld();
        camera.updateProjectionMatrix();
        var centre = calculateCentre(triangle);

        var position = getTextPosition(centre);

        if (checkPosition(position)) {
            addText(position, triangle);
        } else {
            removeText(triangle);
        }
    }

    this.setMembraneOutput = function(membraneOutputData) {
        membraneOutput = membraneOutputData;
        return this;
    }

    function checkPosition(position) {
        var x = position.x;
        var y = position.y;

        var result = (x >= minX && x <= maxX && y >= minY && y <= maxY)
        return result;
    }

    function getTextPosition(point) {

        var x = point.x - translation.x;
        var y = point.y - translation.y;

        var p = new THREE.Vector3(x, y, 0);
        var vector = p.project(camera);

        vector.x = (vector.x + 1) / 2 * width;
        vector.y = -(vector.y - 1) / 2 * height;
        return vector;
    }

    function removeText(triangle) {
        var id = getId(triangle);
        var text = document.getElementById(id);
        if (text != null)
            canvas.removeChild(text);
    }

    function addText(point, triangle) {

        var id = getId(triangle);

        var text = document.getElementById(id);

        if (!(text)) {
            text = document.createElement('div');
            canvas.appendChild(text);
            controls.addElement(text);
        }

        text.id = id;
        text.style.position = 'absolute';
        //text.style.borderColor = 'blue';
        //text.style.borderStyle = 'solid';
        //text.style.borderWidth = '1px';
        //text.style.width = 100;
        //text.style.height = 100;
        //text.style.background = "blue";
        text.style.cursor = 'default';
        text.innerHTML = result.getCenterValue(triangle).toFixed(2);
        text.style.top = point.y-textHeight + 'px';
        text.style.left = point.x-textWidth + 'px';

    }

    function calculateCentre(triangle) {
        var nodes = triangle.Nodes;

        var p0 = transformationFunction.getTransformationOutput(nodes[0]);
        var p1 = transformationFunction.getTransformationOutput(nodes[1]);
        var p2 = transformationFunction.getTransformationOutput(nodes[2]);


        var x = (p0.x + p1.x + p2.x) / 3;
        var y = (p0.y + p1.y + p2.y) / 3;

        return { x: x, y: y };

    }

    function getId(triangle) {
        return 'triangle' + triangle.Number;
    }

}