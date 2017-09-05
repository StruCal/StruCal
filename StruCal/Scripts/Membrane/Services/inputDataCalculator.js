angular.module('membraneFEM').factory('inputDataCalculator', function () {
    var edges;
    var inputData;

    function createEdges(vertices) {
        edges = new Array();

        for (var i = 0; i < vertices.length - 1; i++) {
            var vertexStart = vertices[i];
            var vertexEnd = vertices[i + 1];
            edges.push({
                Number: i + 1,
                Start: vertexStart,
                End: vertexEnd,
            });
        }
        edges.push({
            Number: vertices.length,
            Start: vertices[vertices.length - 1],
            End: vertices[0],
        });
    }
    function numerateVerticesAndMultiplyLoad(vertices) {
        for (var i = 0; i < vertices.length; i++) {
            inputData.Vertices[i].Number = i + 1;
            inputData.Vertices[i].LoadX *= 1000;
            inputData.Vertices[i].LoadY *= 1000;
        }
    }
    function createInput(vertices) {
        inputData = {
            Vertices: vertices,
            Edges: edges,
        };
    }

    return {
        getInputData: function (vertices) {
            var verticesCopy = angular.copy(vertices);
            createEdges(verticesCopy);
            createInput(verticesCopy);
            numerateVerticesAndMultiplyLoad(verticesCopy);
            
            return inputData;
        }
    }

});