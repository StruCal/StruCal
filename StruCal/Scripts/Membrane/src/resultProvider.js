var RESULT_TYPE = {
    Sxx: 0,
    Syy: 1,
    Txy: 2,
};

function resultProvider() {
    var membraneOutput;
    var resultType = RESULT_TYPE.Sxx;

    this.smoothing = true;

    this.setMembraneOutput = function(membraneOutputData) {
        membraneOutput = membraneOutputData;
        return this;
    }

    this.setSxx = function() {
        resultType = RESULT_TYPE.Sxx;
        return this;
    }

    this.setSyy = function() {
        resultType = RESULT_TYPE.Syy;
        return this;
    }

    this.setTxy = function() {
        resultType = RESULT_TYPE.Txy;
        return this;
    }

    this.getResult = function(triangle) {
        if (this.smoothing)
            return getSmoothResult(triangle);
        else
            return getCentreResult(triangle);
    }

    this.getCenterValue = function(triangle) {
        switch (resultType) {
            case RESULT_TYPE.Sxx:
                return triangle.Sxx;
                break;
            case RESULT_TYPE.Syy:
                return triangle.Syy;
                break;
            case RESULT_TYPE.Txy:
                return triangle.Txy;
                break;
        }
    }

    function getCentreResult(triangle) {
        switch (resultType) {
            case RESULT_TYPE.Sxx:
                return {
                    resultType0: triangle.Sxx,
                    resultType1: triangle.Sxx,
                    resultType2: triangle.Sxx
                };
                break;
            case RESULT_TYPE.Syy:
                return {
                    resultType0: triangle.Syy,
                    resultType1: triangle.Syy,
                    resultType2: triangle.Syy
                };
                break;
            case RESULT_TYPE.Txy:
                return {
                    resultType0: triangle.Txy,
                    resultType1: triangle.Txy,
                    resultType2: triangle.Txy
                };
                break;
        }
    }

    function getSmoothResult(triangle) {
        switch (resultType) {
            case RESULT_TYPE.Sxx:
                return {
                    resultType0: triangle.Nodes[0].AvgSxx,
                    resultType1: triangle.Nodes[1].AvgSxx,
                    resultType2: triangle.Nodes[2].AvgSxx
                };
                break;
            case RESULT_TYPE.Syy:
                return {
                    resultType0: triangle.Nodes[0].AvgSyy,
                    resultType1: triangle.Nodes[1].AvgSyy,
                    resultType2: triangle.Nodes[2].AvgSyy
                };
                break;
            case RESULT_TYPE.Txy:
                return {
                    resultType0: triangle.Nodes[0].AvgTxy,
                    resultType1: triangle.Nodes[1].AvgTxy,
                    resultType2: triangle.Nodes[2].AvgTxy
                };
                break;
        }
    }
}