function scaleCalculator(width, height) {

    var margin = 50;
    var maxDimension = Math.max(width, height);
    var membraneInput;
    var membraneOutput;

    var maxX, minX, maxY, minY, centreX, centreY;

    var maxLoad;

    this.setMembraneInput = function(membraneInputData) {
        membraneInput = membraneInputData;
        calculateExtremes();
        calculateMaxLoad();
        return this;
    }

    this.setMembraneOutput = function(membraneOutputData) {
        membraneOutput = membraneOutputData;
        this.setMembraneInput(membraneOutput.InputData);
        return this;
    }

    this.getCentreTranslation = function() {
        return {
            x: centreX,
            y: centreY
        };
    }

    this.getSupportScale = function() {

        var x = maxX - minX;
        var y = maxY - minY;
        var maxDimension = Math.max(x, y);
        var factor = 0.02;
        return maxDimension * factor;
    }

    this.getPointLoadScale = function () {
        var x = maxX - minX;
        var y = maxY - minY;
        var maxDimension = Math.max(x, y);
        var factor = 0.02;
        return maxDimension * factor;
    }

    this.getDisplacementScale = function() {
        var max = Math.max(membraneOutput.MaxUx, membraneOutput.MaxUy);
        var disp = 5;
        var scale = disp / max;
        return scale;
    }


    this.getPointLoadLengthScale = function(loadValue) {
        var scale = Math.abs(loadValue) / maxLoad;
        return scale;
    }

    function calculateExtremes() {
        var xs = membraneInput.Vertices.map(function(v) { return v.X; });
        var ys = membraneInput.Vertices.map(function(v) { return v.Y; });
        maxX = Math.max.apply(Math, xs);
        minX = Math.min.apply(Math, xs);
        maxY = Math.max.apply(Math, ys);
        minY = Math.min.apply(Math, ys);

        centreX = minX + (maxX - minX) / 2;
        centreY = minY + (maxY - minY) / 2;
    }

    function calculateMaxLoad() {
        var xLoads = membraneInput.Vertices.map(function(v) { return Math.abs(v.LoadX) });
        var yLoads = membraneInput.Vertices.map(function(v) { return Math.abs(v.LoadY) });
        var loads = xLoads.concat(yLoads);
        maxLoad = Math.max.apply(Math, loads);
    }

    this.getCameraZ = function () {
        var factor = 2;

        var sectionWidth = maxX - minX;
        var sectionHeight = maxY - minY;
        var positionZ = Math.max(sectionWidth, sectionHeight);
        return positionZ * factor;
    }
}