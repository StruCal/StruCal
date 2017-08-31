angular.module('membraneFEM').service('drawingService', ['canvasFactory', function (canvasFactory) {

    var self = this;
    var text;
    var canvas = canvasFactory.getCanvas();
    var drawing;
    this.initialize = function () {

        
        var membraneOutput = getMembraneOutput();

        drawing = new drawingCreator(canvas);

        drawing.setMembraneOutput(membraneOutput).setSxx().updateOutput();

        //drawing.setMembraneInput(membraneOutput.InputData).updateInput();

        
        animate();
    }
    function animate() {
            requestAnimationFrame(animate);
            drawing.renderer.render(drawing.scene, drawing.camera);
            drawing.controls.update();
            
            if (text) {
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

}]);