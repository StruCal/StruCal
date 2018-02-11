
import { Section } from '../../../../common/structure/section';
import { section2Builder } from '../../../../common/sectionBuilders/section2Builder';
import { ModelInput } from '../../../input/modelInput';


const multiplier = 1000;

export function section2FromInput(input: Array<ModelInput>): Section {
    const result = section2Builder()
        .setHeight(input[0].value / 1000)
        .setWebThickness(input[1].value / 1000)
        .setTopFlangeWidth(input[2].value / 1000)
        .setTopFlangeThickness(input[3].value / 1000)
        .setBottomFlangeWidth(input[4].value / 1000)
        .setBottomFlangeThickness(input[5].value / 1000)
        .build();
    return result;
}
