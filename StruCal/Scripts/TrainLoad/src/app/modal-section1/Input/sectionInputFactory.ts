import { section1Input } from './section1/section1Input';
import { section1FromInput } from './section1/section1FromInput';
import { ModelInput } from '../../input/modelInput';
import { SectionType } from '../../../common/types/sectionTypes';



export function sectionInputFactory() {

    return { getInput, getSectionBuilder };

    function getInput(type: SectionType|string): Array<ModelInput> {
        switch (type) {
            case SectionType.Section1: {
                return JSON.parse(JSON.stringify(section1Input));
            }
        }
    }

    function getSectionBuilder(type: SectionType) {
        switch (type) {
            case SectionType.Section1: {
                return {section1FromInput};
            }
        }
    }
}
