function inputCreator(scene, scaleCalc) {
    var material = new THREE.MeshBasicMaterial({ color: 0x3276B1 });
    var pointMaterial = new THREE.MeshPhongMaterial({ color: 0x3276B1 });

    var mesh;
    var points = [];
    this.membraneInput;

    this.setMembraneInput = function (membraneInputData) {
        this.membraneInput = membraneInputData;
        return this;
    }

    this.updateInput = function () {
        createGeometry.call(this);
        createPoints.call(this);

        scene.add(mesh);
        points.forEach(function (point) {
            scene.add(point);
        });
        return this;
    }

    this.remove = function () {
        scene.remove(mesh);
        points.forEach(function (point) {
            scene.remove(point);
        });
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
        mesh = new THREE.Mesh(meshGeometry, material);
    }

    function createPoints() {
        points = [];
        var pointScale = scaleCalc.getInputPointScale();
        var nodes = this.membraneInput.Vertices;
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            var geometry = new THREE.SphereGeometry(1);

            geometry.scale(pointScale, pointScale, pointScale);
            var point = new THREE.Mesh(geometry, pointMaterial);
            point.translateX(node.X);
            point.translateY(node.Y);
            points.push(point);
        }
    }
}