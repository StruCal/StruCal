function pointLoadProvider() {
    var material = new THREE.MeshPhongMaterial({ color: 0x9370DB });
    var self = this;
    var scale = 1;

    var headRadious = 1;
    var headHeight = 2;
    var bodyRadious = 0.2;
    var bodyHeight = 5;

    function createHead(x, y) {
        var geometry = new THREE.ConeGeometry(headRadious, headHeight, 10);
        geometry.scale(scale, scale, scale);

        var cone = new THREE.Mesh(geometry, material);
        cone.translateY(-headHeight * scale / 2);
        cone.translateX(x);
        cone.translateY(y);


        return cone;
    }

    function createBody(x, y, lengthScale) {
        var geometry = new THREE.CylinderGeometry(bodyRadious, bodyRadious, bodyHeight * lengthScale, 10);
        geometry.scale(scale, scale, scale);

        var cylinder = new THREE.Mesh(geometry, material);
        cylinder.translateY(-bodyHeight / 2 * scale * lengthScale - headHeight * scale);
        cylinder.translateY(y);
        cylinder.translateX(x);

        return cylinder;
    }

    function pointLoadTemplate(x, y, lengthScale) {
        var group = new THREE.Group();
        var body = createBody(x, y, lengthScale);
        var head = createHead(x, y);
        group.add(body);
        group.add(head);
        return group;

    }

    this.pointLoad0deg = function(x, y, lengthScale) {
        var pointLoad = pointLoadTemplate(x, y, lengthScale);
        return pointLoad;
        //scene.add(pointLoad);
    }

    this.pointLoad90deg = function(x, y, lengthScale) {
        var pointLoad = pointLoadTemplate(y, -x, lengthScale); //due to problem with rotaton of THREE.Group
        pointLoad.rotateZ(Math.PI / 2);
        return pointLoad;
        //scene.add(pointLoad);
    }

    this.pointLoad180deg = function(x, y, lengthScale) {
        var pointLoad = pointLoadTemplate(-x, -y, lengthScale);
        pointLoad.rotateZ(Math.PI);
        return pointLoad;
        //scene.add(pointLoad);
    }
    this.pointLoad270deg = function(x, y, lengthScale) {
        var pointLoad = pointLoadTemplate(-y, x, lengthScale);
        pointLoad.rotateZ(-Math.PI / 2);
        return pointLoad;
        //scene.add(pointLoad);
    }

    this.setScale = function(value) {
        scale = value;
    }
}