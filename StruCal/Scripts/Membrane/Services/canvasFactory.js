angular.module('membraneFEM').factory('canvasFactory', function () {
    var canvas = document.getElementById("membraneCanvas");
    canvas.setAttribute("style", "height:" + (canvas.offsetWidth).toFixed(0) + "px");
    return {
        getCanvas: function () {
            return canvas;
        }
    }
    });