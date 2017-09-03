function nodeTransformation(scaleCalculator) {
    var self = this;
    var membraneOutput;

    var displacement = true;
    this.displacementScale = 1;


    this.drawDisplacement = false;

    this.setMembraneOutput = function(membraneOutputData) {
        membraneOutput = membraneOutputData;
        return this;
    }

    this.getTransformationOutput = function(node) {

        this.displacementScale = scaleCalculator.getDisplacementScale();
        var result;
        if (this.drawDisplacement) {
            result = outputTransform(node);
        } else {
            result = noTransformation(node);
        }
        return result;
    }

    this.getTransformationInput = function(vertex) {
        var result;
        if (this.drawDisplacement) {
            result = inputTransformation(vertex);
        } else {
            result = noTransformation(vertex);
        }
        return result;
    }

    function inputTransformation(vertex) {
        var nodes = membraneOutput.Nodes;

        var equivalentNode = nodes.find(findNode);

        return outputTransform(equivalentNode);

        function findNode(node) {
            return (node.X.isApproximatelyEqualTo(vertex.X) && node.Y.isApproximatelyEqualTo(vertex.Y));
        }
    }

    function noTransformation(node) {
        return { x: node.X, y: node.Y };
    }

    function outputTransform(node) {
        var x = node.X - node.Ux * self.displacementScale;
        var y = node.Y + node.Uy * self.displacementScale;
        return { x: x, y: y };
    }
}