function supportProvider() {
    var supportMaterial = new THREE.MeshPhongMaterial({ color: 0xffff00 });
    var scale = 1;
    var height = 2;
    var radious = 1;

    function supportTemplate(x, y) {

        var geometry = new THREE.ConeGeometry(radious, height, 10);
        geometry.scale(scale, scale, scale);

        var cone = new THREE.Mesh(geometry, supportMaterial);
        cone.translateY(-height * scale / 2);
        cone.translateX(x);
        cone.translateY(y);

        return cone;
    }

    this.setScale = function(value) {
        scale = value;
    }

    this.support0deg = function(x, y) {
        var support = supportTemplate(x, y);
        return support;

    }

    this.support90deg = function(x, y) {
        var support = supportTemplate(x, y);
        support.rotateZ(Math.PI / 2);
        support.translateX(radious * scale);
        support.translateY(-height * scale / 2);

        return support;

    }

    this.support180deg = function(x, y) {
        var support = supportTemplate(x, y);
        support.rotateZ(Math.PI);

        support.translateY(-height * scale);
        return support;
    }

    this.support270deg = function(x, y) {
        var support = supportTemplate(x, y);
        support.rotateZ(-Math.PI * 0.5);

        support.translateY(-height / 2 * scale);
        support.translateX(-radious * scale);
        return support;
    }
}