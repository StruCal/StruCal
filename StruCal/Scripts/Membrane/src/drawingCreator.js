function drawingCreator(canvas) {

    var membraneOutput;
    var membraneInput;

    var width = canvas.clientWidth;
    var height = canvas.clientHeight;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xFFFFFF);
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    canvas.appendChild(this.renderer.domElement);

    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.camera.position.z = 50;



    var result = new resultProvider();
    var scaleCalc = new scaleCalculator(width, height);
    var transformationFunction = new nodeTransformation(scaleCalc);
    var text = new textCreator(this.scene, this.camera, canvas, transformationFunction, result, this.controls, scaleCalc);
    var color = new colorProvider();
    var output = new outputCreator(this.scene, transformationFunction, result, color);
    var support = new supportCreator(this.scene, transformationFunction, scaleCalc);
    var pointLoad = new pointLoadCreator(this.scene, transformationFunction, scaleCalc);
    var input = new inputCreator(this.scene);

    var directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
    this.scene.add(directionalLight1);
    var directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight2.position.set(100, 100, 100);
    this.scene.add(directionalLight2);

    this.setMembraneOutput = function(membraneOutputData) {
        membraneOutput = membraneOutputData;
        membraneInput = membraneOutputData.InputData;

        text.setMembraneOutput(membraneOutput);
        result.setMembraneOutput(membraneOutput);
        color.setMembraneOutput(membraneOutput);
        output.setMembraneOutput(membraneOutput);
        scaleCalc.setMembraneOutput(membraneOutput);

        this.setMembraneInput(membraneInput);

        return this;
    }

    this.setMembraneInput = function(membraneInputData) {
        membraneInput = membraneInputData;
        input.setMembraneInput(membraneInput);
        support.setMembraneInput(membraneInput);
        pointLoad.setMembraneInput(membraneInput);
        scaleCalc.setMembraneInput(membraneInput);
        return this;
    }

    this.updateInput = function() {

        input.updateInput();
        support.updateSupports();
        pointLoad.updatePointLoad();

        updatePosition.call(this);
    }

    this.updateOutput = function() {

        output.setMembraneOutput(membraneOutput).updateOutput();
        transformationFunction.setMembraneOutput(membraneOutput);
        text.setMembraneOutput(membraneOutput);

        support.updateSupports();
        pointLoad.updatePointLoad();

        updatePosition.call(this);
    }

    this.updateText = function() {
        text.updateText();
    }

    this.setSxx = function() {
        result.setSxx();
        color.setSxx();
        return this;
    }

    this.setSyy = function() {
        result.setSyy();
        color.setSyy();
        return this;
    }

    this.setTxy = function() {
        result.setTxy();
        color.setTxy();
        return this;
    }


    function updatePosition() {
        var translation = scaleCalc.getCentreTranslation();
        this.scene.translateX(-translation.x);
        this.scene.translateY(-translation.y);
    }

}