function supportCreator(scene, nodeTransformation, scaleCalculator) {

    var supportProv = new supportProvider(scene);
    var membraneInput;
    var transformationFunction = nodeTransformation;

    this.setMembraneInput = function(membraneInputData) {
        membraneInput = membraneInputData;
        return this;
    }

    this.updateSupports = function() {
        var vertices = membraneInput.Vertices;
        var scale = scaleCalculator.getSupportScale();
        supportProv.setScale(scale);
        for (var i = 0; i < vertices.length; i++) {
            var vertex = vertices[i];
            var coords = transformationFunction.getTransformationInput(vertex);

            var x = coords.x;
            var y = coords.y;

            if (vertex.SupportX) {
                supportProv.support0deg(x, y);
            }
            if (vertex.SupportY) {
                supportProv.support90deg(x, y);
            }
        }
    }

}