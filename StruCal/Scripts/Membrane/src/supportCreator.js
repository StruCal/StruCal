function supportCreator(scene, nodeTransformation, scaleCalculator) {

    var supportProv = new supportProvider();
    var membraneInput;
    var transformationFunction = nodeTransformation;

    var supports = new Array();

    this.setMembraneInput = function (membraneInputData) {
        membraneInput = membraneInputData;
        return this;
    }

    this.remove = function () {
        for (var i = 0; i < supports.length; i++) {
            var support = supports[i];
            scene.remove(support);
        }
    }

    this.update = function () {

        var vertices = membraneInput.Vertices;
        var scale = scaleCalculator.getSupportScale();
        supportProv.setScale(scale);
        for (var i = 0; i < vertices.length; i++) {
            var vertex = vertices[i];
            var coords = transformationFunction.getTransformationInput(vertex);

            var x = coords.x;
            var y = coords.y;

            if (vertex.SupportX) {
                var supportX = supportProv.support0deg(x, y);
                scene.add(supportX);
                supports.push(supportX);
            }
            if (vertex.SupportY) {
                var supportY = supportProv.support90deg(x, y);
                scene.add(supportY);
                supports.push(supportY);
            }

        }
    }

}