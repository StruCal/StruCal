﻿angular.module('membraneFEM').service('drawingService', ['canvasFactory', function (canvasFactory) {

    var self = this;
    var text;
    var canvas = canvasFactory.getCanvas();
    var drawing;
    this.initialize = function () {

        canvas.setAttribute("style", "height:" + (canvas.offsetWidth / 2).toFixed(0) + "px");
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
    this.drawDisplacement = function (value) {
        drawing.drawDisplacement(value);
    }

}]);