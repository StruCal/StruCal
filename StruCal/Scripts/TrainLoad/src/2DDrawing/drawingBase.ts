
const svg = require('svg.js');


export class DrawingBase {

    private drawing: any;

    constructor(canvasID: string) {
        this.drawing = svg.SVG(canvasID);
    }
}
