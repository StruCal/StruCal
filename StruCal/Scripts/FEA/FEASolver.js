class ElemStiff2DTwoNodeBar {
    Get(x1, y1, x2, y2, E, A) {
        var dx = x2 - x1;
        var dy = y2 - y1;
        var L = Math.sqrt(Math.Pow(dx, 2) + Math.Pow(dy, 2));
        var cos = dx / L;
        var sin = dy / L;
        var Ke = [
            [E * A / L * Math.Pow(cos, 2), E * A / L * cos * sin, -E * A / L * Math.Pow(cos, 2), -E * A / L * cos * sin],
            [E * A / L * cos * sin, E * A / L * Math.Pow(sin, 2), -E * A / L * sin * cos, -E * A / L * Math.Pow(sin, 2)],
            [-E * A / L * Math.Pow(cos, 2), -E * A / L * sin * cos, E * A / L * Math.Pow(cos, 2), E * A / L * sin * cos],
            [-E * A / L * sin * cos, -E * A / L * Math.Pow(sin, 2), E * A / L * sin * cos, E * A / L * Math.Pow(sin, 2)]
        ];
        return Ke;
    }
}

class AssembleMasterStiff {
    ElemStiff2DTwoNodeBar elemStiff;
    MergeElemIntoMasterStiff masterStiff;

    Matrix K;
    Matrix Ke;

    constructor(nEq) {
        elemStiff = new ElemStiff2DTwoNodeBar();
        masterStiff = new MergeElemIntoMasterStiff(nEq);
    }

    Get(nodCoord, elCon, nEl) {
        K = masterStiff.K;
        for (elConRow = 0; elConRow < nEl; elConRow++) {
            Ke = elemStiff.Get(
                nodCoord[0, elCon[elConRow, 2]],
                nodCoord[0, elCon[elConRow, 3]],
                nodCoord[0, elCon[elConRow, 4]],
                nodCoord[0, elCon[elConRow, 5]],
                elCon[elConRow, 1],
                elCon[elConRow, 0]);
            K = masterStiff.Get(Ke, elCon.GetRow(elConRow), K);
        };
        return K;
    }
}

class IntForce2DTwoNodeBar {
    Get(x1, y1, x2, y2, E, A, eftab, u) {
        var dx = x2 - x1;
        var dy = y2 - y1;
        var L = Math.Sqrt(Math.Pow(dx, 2) + Math.Pow(dy, 2));
        var cos = dx / L;
        var sin = dy / L;

        var ubar =
            [
                cos * u[eftab[0, 2], 0] + sin * u[eftab[0, 3], 0],
                - sin * u[eftab[0, 2], 0] + cos * u[eftab[0, 3], 0],
                cos * u[eftab[0, 4], 0] + sin * u[eftab[0, 5], 0],
                - sin * u[eftab[0, 4], 0] + cos * u[eftab[0, 5], 0]
            ];
        var e = ((ubar[0, 2] - ubar[0, 0]) / L);
        var p = E * A * e;
        return p;
    }
}

class MergeElemIntoMasterStiff {
	var K;

constructor(nEq) {
    K = Matrix.ZeroMatrix(nEq, nEq);
}

Get(Ke, elCon, K) {
    var ii = 0;
    var jj = 0;
    for (i = 0; i < elCon.cols - 2; i++) {	// - 2 due to area and material definition in global elCon
        ii = elCon[0, i + 2];	// + 2 due to area and material definition in global elCon
        for (j = 0; j < elCon.cols - 2; j++) {
            jj = elCon[0, j + 2];	// + 2 due to area and material definition in global elCon
            K[ii, jj] += Ke[i, j];
        }
    }
    return K;
}
}

class ModifiedMasterForcesForDBC {
	var fmod;

Get(constrDispl, f) {
    fmod = f.Duplicate();
    var np = constrDispl.cols;
    var i = 0;
    for (k = 0; k < np; k++) {
        i = constrDispl[0, k];
        fmod[0, i] = 0;
    }
    return fmod;
}
}

class ModifiedMasterStiffForDBC {
	var Kmod;

Get(constrDispl, K) {
    Kmod = K.Duplicate();
    var nk = Kmod.rows;
    var np = constrDispl.cols;
    var i = 0;
    for (k = 0; k < np; k++) {
        i = constrDispl[0, k];
        for (j = 0; j < nk; j++) {
            Kmod[i, j] = 0;
            Kmod[i, i] = 1;
        }
    }
    return Kmod;
}
}

class Solver {
	var nEl;
var nodCoord;
var elCon;

var constrDispl;
var nodForce;

var K = new AssembleMasterStiff(nEq).Get(nodCoord, elCon, nEl);
var Kmod = new ModifiedMasterStiffForDBC().Get(constrDispl, K);
var Kinv = Kmod.InvertCholesky();
var fmod = new ModifiedMasterForcesForDBC().get(constrDispl, nodForce);
var u = Kinv * Matrix.Transpose(fmod);
var stress = new IntStress().Get(u, nEl, nodCoord, elCon);
}