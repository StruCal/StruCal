function inputCreator(scene) {

    var material = new THREE.MeshBasicMaterial({ color: 0xFF0000 });

    var meshGeometry = new THREE.Geometry();

    this.membraneInput;

    this.setMembraneInput = function(membraneInputData) {
        this.membraneInput = membraneInputData;
        return this;
    }

    this.updateInput = function() {

        createGeometry.call(this);

        var mesh = new THREE.Mesh(meshGeometry, material);
        scene.add(mesh);
        return this;
    }

    function createGeometry() {
        var nodes = this.membraneInput.Vertices;
        var shape = new THREE.Shape();

        shape.moveTo(nodes[0].X, nodes[0].Y);

        for (var i = 1; i < nodes.length; i++) {
            var node = nodes[i];
            shape.lineTo(node.X, node.Y);
        }
        shape.lineTo(nodes[0].X, nodes[0].Y);

        var extrudeSettings = {
            steps: 2,
            amount: 0.01,
            bevelEnabled: false,
            bevelThickness: 1,
            bevelSize: 1,
            bevelSegments: 1
        };

        meshGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    }
}