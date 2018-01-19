import { Perimeter } from '../structure/perimeter';
import { Section } from '../structure/section';

const bottomWidth = 1;
const topWidth = 1.5;
const webDivisionCount = 4;
const deckElevationToHeight = 1 / 2;
const deckThicknessToWebThickness = 1;

export function section1Builder() {
    let height: number;
    let topFlangeWidth: number;
    let bottomFlangeWidth: number;
    let topFlangeThickness: number;
    let bottomFlangeThickness: number;
    let webThickness: number;

    const perimeters = new Array<Perimeter>();
    return { setHeight };
    function setHeight(value: number) {
        height = value;
        return { setWebThickness };
    }
    function setWebThickness(value: number) {
        webThickness = value;
        return { setTopFlangeWidth };
    }
    function setTopFlangeWidth(value: number) {
        topFlangeWidth = value;
        return { setTopFlangeThickness };
    }
    function setTopFlangeThickness(value: number) {
        topFlangeThickness = value;
        return { setBottomFlangeWidth };
    }
    function setBottomFlangeWidth(value: number) {
        bottomFlangeWidth = value;
        return { setBottomFlangeThickness };
    }
    function setBottomFlangeThickness(value: number) {
        bottomFlangeThickness = value;
        return { build };
    }
    function build(): Section {
        generateTopFlange();
        genertateBottomFlange();
        generateWeb();
        generateDeck();

        const section = new Section();
        section.perimeters = perimeters;
        return section;
    }

    function generateDeck() {
        const elevation = deckElevationToHeight * height;
        const deckThickness = deckThicknessToWebThickness * webThickness;

        const deltaWidth = topWidth - bottomWidth - webThickness;

        const additionalWidthBottom = elevation * deltaWidth / height;
        const additionWidthTop = (elevation + deckThickness) * deltaWidth / height;

        const xbl = -additionalWidthBottom - bottomWidth;
        const xbr = 0;
        const ybl = elevation;
        const ybr = elevation;

        const xtl = -additionWidthTop - bottomWidth;
        const xtr = 0;
        const ytl = elevation + deckThickness;
        const ytr = elevation + deckThickness;

        const coordinates = [{ x: xbl, y: ybl }, { x: xbr, y: ybr }, { x: xtr, y: ytr }, { x: xtl, y: ytl }];
        const perimeter = new Perimeter();
        perimeter.coordinates = coordinates;
        perimeters.push(perimeter);
    }

    function generateWeb() {
        const webHeight = height - topFlangeThickness - bottomFlangeThickness;
        const webPartHeight = webHeight / webDivisionCount;
        const webPartWidth = (topWidth - bottomWidth) / webDivisionCount;

        const parts = Array.from(Array(webDivisionCount).keys());
        parts.forEach((part, index) => {
            const xbl = -index * webPartWidth - webThickness / 2 - bottomWidth;
            const xbr = -index * webPartWidth + webThickness / 2 - bottomWidth;
            const ybl = index * webPartHeight + bottomFlangeThickness;
            const ybr = ybl;

            const xtl = -(index + 1) * webPartWidth - webThickness / 2 - bottomWidth;
            const xtr = -(index + 1) * webPartWidth + webThickness / 2 - bottomWidth;
            const ytl = (index + 1) * webPartHeight + bottomFlangeThickness;
            const ytr = ytl;

            const coordinates = [{ x: xbl, y: ybl }, { x: xbr, y: ybr }, { x: xtr, y: ytr }, { x: xtl, y: ytl }];
            const perimeter = new Perimeter();
            perimeter.coordinates = coordinates;
            perimeters.push(perimeter);
        });

    }

    function genertateBottomFlange() {
        const xl = -topWidth - topFlangeWidth / 2;
        const xr = -topWidth + topFlangeWidth / 2;
        const yt = height;
        const yb = height - topFlangeThickness;
        const coordinates = [{ x: xl, y: yb }, { x: xr, y: yb }, { x: xr, y: yt }, { x: xl, y: yt }];
        const perimeter = new Perimeter();
        perimeter.coordinates = coordinates;
        perimeters.push(perimeter);
    }
    function generateTopFlange() {
        // top flange
        const xl = -bottomWidth - bottomFlangeWidth / 2;
        const xr = -bottomWidth + bottomFlangeWidth / 2;
        const yt = bottomFlangeThickness;
        const yb = 0;
        const coordinates = [{ x: xl, y: yb }, { x: xr, y: yb }, { x: xr, y: yt }, { x: xl, y: yt }];
        const perimeter = new Perimeter();
        perimeter.coordinates = coordinates;
        perimeters.push(perimeter);
    }

}
