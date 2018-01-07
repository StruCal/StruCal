const Rainbow = require('rainbowvis.js');

const range = 100;
const minColor = '00FF00';
const middleColor = 'FFFF00';
const maxColor = 'FF0000';

export class ColorProvider {
    private minValue: number;
    private maxValue: number;
    private rainbow: any;
    constructor(maxValue: number, minValue: number) {
        this.rainbow = new Rainbow();
        this.rainbow.setSpectrum(minColor, middleColor, maxColor);
        this.rainbow.setNumberRange(0, range);

        this.maxValue = maxValue;
        this.minValue = minValue;
    }

    public getColor(value: number): string {
        const valueRange = this.maxValue - this.minValue;

        let valueToCalculations;

        if (value <= this.minValue) {
            valueToCalculations = this.minValue;
        } else if (value >= this.maxValue) {
            valueToCalculations = this.maxValue;
        } else {
            valueToCalculations = value;
        }

        const colorIndex = Math.round((valueToCalculations / valueRange) * range);
        const color = this.rainbow.colourAt(colorIndex);
        return '#' + color;

    }
}
