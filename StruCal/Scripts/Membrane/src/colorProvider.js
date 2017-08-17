function colorProvider() {

    var membraneOutputData;


    var range = 100;
    var minColor = '00FF00';
    var middleColor = 'FFFF00';
    var maxColor = 'FF0000';

    var minValue;
    var maxValue;
    var percentile005;
    var percentile095;
    var rainbow = new Rainbow();
    rainbow.setSpectrum(minColor, middleColor, maxColor);
    rainbow.setNumberRange(0, range);

    this.setMembraneOutput = function(membraneOutput) {
        membraneOutputData = membraneOutput;
        return this;
    }

    this.getColor = function(value) {
        var valueRange = percentile095 - percentile005;

        var valueToCalculations;

        if (value <= percentile005) {
            valueToCalculations = percentile005;
        } else if (value >= percentile095) {
            valueToCalculations = percentile095;
        } else {
            valueToCalculations = value;
        }
        var valueTransformed = valueToCalculations - percentile005;

        var colorIndex = Math.round((valueTransformed / valueRange) * range);
        var color = rainbow.colourAt(colorIndex);
        return '#' + color;

    }

    this.setSxx = function() {
        minValue = membraneOutputData.MinSxx;
        maxValue = membraneOutputData.MaxSxx;

        percentile005 = membraneOutputData.SxxPercentile005;
        percentile095 = membraneOutputData.SxxPercentile095;

        return this;
    }
    this.setSyy = function() {
        minValue = membraneOutputData.minSyy;
        maxValue = membraneOutputData.maxSyy;

        percentile005 = membraneOutputData.SyyPercentile005;
        percentile095 = membraneOutputData.SyyPercentile095;
        return this;
    }
    this.setTxy = function() {
        minValue = membraneOutputData.minTxy;
        maxValue = membraneOutputData.maxTxy;

        percentile005 = membraneOutputData.TxyPercentile005;
        percentile095 = membraneOutputData.TxyPercentile095;
        return this;
    }



}