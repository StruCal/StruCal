import { Perimeter } from '../structure/perimeter';
import { Section } from '../structure/section';
import * as _ from 'lodash';

const distanceBetweenGirders = 2;
const webDivisionCount = 4;

export function section2Builder() {
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

        const mirroredPerimeters = perimeters.map(e => Perimeter.mirrorVertical(e));
        const section = new Section();
        section.perimeters = [...perimeters, ...mirroredPerimeters];
        return section;
    }

    function generateWeb() {
        const webHeight = height - topFlangeThickness - bottomFlangeThickness;
        const webPartHeight = webHeight / webDivisionCount;

        const parts = _.range(0, webDivisionCount, 1)
            .forEach((part, index) => {

                const xl = -distanceBetweenGirders / 2 - webThickness / 2;
                const xr = -distanceBetweenGirders / 2 + webThickness / 2;
                const yt = (index + 1) * webPartHeight + bottomFlangeThickness;
                const yb = index * webPartHeight + bottomFlangeThickness;

                const coordinates = [{ x: xl, y: yb }, { x: xr, y: yb }, { x: xr, y: yt }, { x: xl, y: yt }];
                const perimeter = new Perimeter();
                perimeter.coordinates = coordinates;
                perimeters.push(perimeter);
            });

    }
    function genertateBottomFlange() {
        const xl = -distanceBetweenGirders / 2 - bottomFlangeWidth / 2;
        const xr = -distanceBetweenGirders / 2 + bottomFlangeWidth / 2;
        const yt = bottomFlangeThickness;
        const yb = 0;
        const coordinates = [{ x: xl, y: yb }, { x: xr, y: yb }, { x: xr, y: yt }, { x: xl, y: yt }];
        const perimeter = new Perimeter();
        perimeter.coordinates = coordinates;
        perimeters.push(perimeter);
    }
    function generateTopFlange() {
        // top flange
        const xl = -distanceBetweenGirders / 2 - topFlangeWidth / 2;
        const xr = -distanceBetweenGirders / 2 + topFlangeWidth / 2;
        const yt = height;
        const yb = height - topFlangeThickness;
        const coordinates = [{ x: xl, y: yb }, { x: xr, y: yb }, { x: xr, y: yt }, { x: xl, y: yt }];
        const perimeter = new Perimeter();
        perimeter.coordinates = coordinates;
        perimeters.push(perimeter);
    }

}
