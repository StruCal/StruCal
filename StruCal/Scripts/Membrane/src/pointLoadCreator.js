function pointLoadCreator(scene, nodeTransformation, scaleCalculator) {

    var pointLoadProv = new pointLoadProvider(scene);
    var membraneInput;
    var transformationFunction = nodeTransformation;

    this.setMembraneInput = function(membraneInputData) {
        membraneInput = membraneInputData;
        return this;
    }

    this.updatePointLoad = function() {
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
                pointLoadProv.pointLoad90deg(x, y, lengthScaleX);
            } else if (vertex.LoadX < 0) {
                pointLoadProv.pointLoad270deg(x, y, lengthScaleX);
            }
            if (vertex.LoadY > 0) {
                pointLoadProv.pointLoad0deg(x, y, lengthScaleY);
            } else if (vertex.LoadY < 0) {
                pointLoadProv.pointLoad180deg(x, y, lengthScaleY);
            }
        }
    }
}