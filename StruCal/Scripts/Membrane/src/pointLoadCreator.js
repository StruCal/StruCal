function pointLoadCreator(scene, nodeTransformation, scaleCalculator) {

    var pointLoadProv = new pointLoadProvider();
    var membraneInput;
    var transformationFunction = nodeTransformation;
    var pointLoads = new Array();

    this.setMembraneInput = function(membraneInputData) {
        membraneInput = membraneInputData;
        return this;
    }

    this.remove = function () {
        for (var i = 0; i < pointLoads.length; i++) {
            var load = pointLoads[i];
            scene.remove(load);
        }
    }

    this.update = function() {
        var vertices = membraneInput.Vertices;
        var scale = scaleCalculator.getPointLoadScale();
        pointLoadProv.setScale(scale);
        for (var i = 0; i < vertices.length; i++) {
            var vertex = vertices[i];
            var coords = transformationFunction.getTransformationInput(vertex);

            var x = coords.x;
            var y = coords.y;
            var lengthScaleX = scaleCalculator.getPointLoadLengthScale(vertex.LoadX);
            var lengthScaleY = scaleCalculator.getPointLoadLengthScale(vertex.LoadY);
            if (vertex.LoadX > 0) {
                var pointLoadX = pointLoadProv.pointLoad90deg(x, y, lengthScaleX);
            } else if (vertex.LoadX < 0) {
                var pointLoadX = pointLoadProv.pointLoad270deg(x, y, lengthScaleX);
            }
            scene.add(pointLoadX);
            pointLoads.push(pointLoadX);


            if (vertex.LoadY > 0) {
                var pointLoadY = pointLoadProv.pointLoad0deg(x, y, lengthScaleY);
            } else if (vertex.LoadY < 0) {
                var pointLoadY = pointLoadProv.pointLoad180deg(x, y, lengthScaleY);
            }
            scene.add(pointLoadY);
            pointLoads.push(pointLoadY);
        }
    }
}