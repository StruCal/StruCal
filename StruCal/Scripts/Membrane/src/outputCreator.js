function outputCreator(scene, nodeTransformation, resultProvider, colorProvider) {

    var membraneOutput;
    var materialTriangle = new THREE.MeshBasicMaterial({
        vertexColors: THREE.VertexColors,
        side: THREE.DoubleSide
    });

    var materialLine = new THREE.LineBasicMaterial({ color: 0x808080 });
    var meshGeometry = new THREE.Geometry();
    var lineGeometry = new THREE.Geometry();
    var transformationFunction = nodeTransformation;

    this.drawMesh = true;

    this.setMembraneOutput = function(membraneOutputData) {
        membraneOutput = membraneOutputData;
        return this;
    }

    this.updateOutput = function() {

        createNodes.call(this);
        createGeometry.call(this);

        var mesh = new THREE.Mesh(meshGeometry, materialTriangle);
        scene.add(mesh);
        var lines = new THREE.LineSegments(lineGeometry, materialLine);
        scene.add(lines);

    }

    function createNodes() {
        var nodes = membraneOutput.Nodes;

        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            var point = transformationFunction.getTransformationOutput(node);
            meshGeometry.vertices.push(new THREE.Vector3(point.x, point.y, 0.0))
        }
    }

    function createGeometry() {
        var triangles = membraneOutput.Triangles;

        for (var i = 0; i < triangles.length; i++) {
            var triangle = triangles[i];
            createFace(triangle, i);

            if (this.drawMesh) {
                createLine(triangle);
            }
        }
    }

    function createFace(triangle, index) {
        //need to numbered from 0
        meshGeometry.faces.push(new THREE.Face3(triangle.Nodes[0].Number - 1, triangle.Nodes[1].Number - 1, triangle.Nodes[2].Number - 1));

        var result = resultProvider.getResult(triangle);
        meshGeometry.faces[index].vertexColors[0] = new THREE.Color(colorProvider.getColor(result.resultType0));
        meshGeometry.faces[index].vertexColors[1] = new THREE.Color(colorProvider.getColor(result.resultType1));
        meshGeometry.faces[index].vertexColors[2] = new THREE.Color(colorProvider.getColor(result.resultType2));
    }

    function createLine(triangle) {

        var point0 = transformationFunction.getTransformationOutput(triangle.Nodes[0]);
        var point1 = transformationFunction.getTransformationOutput(triangle.Nodes[1]);
        var point2 = transformationFunction.getTransformationOutput(triangle.Nodes[2]);

        lineGeometry.vertices.push(new THREE.Vector3(point0.x, point0.y, 0.0))
        lineGeometry.vertices.push(new THREE.Vector3(point1.x, point1.y, 0.0))
        lineGeometry.vertices.push(new THREE.Vector3(point1.x, point1.y, 0.0))
        lineGeometry.vertices.push(new THREE.Vector3(point2.x, point2.y, 0.0))
        lineGeometry.vertices.push(new THREE.Vector3(point2.x, point2.y, 0.0))
        lineGeometry.vertices.push(new THREE.Vector3(point0.x, point0.y, 0.0))
    }


}