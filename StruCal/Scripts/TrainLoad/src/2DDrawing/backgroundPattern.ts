
const patternSize = 20;

export function drawBackgroundPattern(canvas: any) {

    const width = canvas.node.clientWidth;
    const height = canvas.node.clientHeight;

    const correctedWidth = Math.floor(width / patternSize) * patternSize;
    const correctedHeight = Math.floor(height / patternSize) * patternSize;

    const patternCentre = patternSize / 2;
    const pattern = canvas.pattern(patternSize, patternSize, function (add) {
        add.line(0, patternCentre, patternSize, patternCentre).stroke({ width: 1, color: 'LightGrey' });
        add.line(patternCentre, 0, patternCentre, patternSize).stroke({ width: 1, color: 'LightGrey' });
    });
    const rectangle = canvas.rect(correctedWidth, correctedHeight).fill(pattern);

}
