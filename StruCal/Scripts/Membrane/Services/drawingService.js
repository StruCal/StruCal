angular.module('membraneFEM').service('drawingService', ['canvasFactory', function (canvasFactory) {

    var self = this;
   
    var text = true;
    var canvas = canvasFactory.getCanvas();
    var drawing;

    this.drawOutput =false;
    (function init() {
        var membraneOutput = getMembraneOutput();

        drawing = new drawingCreator(canvas);

        animate();
    })();
    function animate() {
            requestAnimationFrame(animate);
            drawing.renderer.render(drawing.scene, drawing.camera);
            drawing.controls.update();
            
            if (text && self.drawOutput) {
                drawing.updateText();
            }
        }
    this.drawSupports = function (value) {
        drawing.drawSupports(value);
    }
    this.drawPointLoads = function (value) {
        drawing.drawPointLoads(value);
    }
    this.drawText = function (value) {
        text = value;
        drawing.drawText(value);
    }
    this.drawDisplacement = function (drawDisplacement,drawSupports,drawPointLoads) {
        drawing.drawDisplacement(drawDisplacement, drawSupports, drawPointLoads);
    }
    this.setSxx=function(){
        drawing.setSxx();
    }
    this.setSyy=function(){
        drawing.setSyy();
    }
    this.setTxy=function(){
        drawing.setTxy();
    }

    this.setInput = function (inputData) {
        self.drawOutput = false;
        drawing.setMembraneInput(inputData).updateInput();
    }

    this.setOutput = function (outputData) {
        self.drawOutput = true;
        drawing.setMembraneOutput(outputData).updateOutput();
    }

}]);