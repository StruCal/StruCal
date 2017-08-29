angular.module('membraneFEM').factory('canvasFactory', function () {
    var canvas = document.getElementById("membraneCanvas");
    return {
        getCanvas: function () {
            return canvas;
        }
    }
    });