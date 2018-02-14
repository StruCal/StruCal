import { section1Input } from './section1/section1Input';
import { section1FromInput } from './section1/section1FromInput';
import { ModelInput } from '../../input/modelInput';
import { SectionType } from '../../../common/types/sectionTypes';
import { section2Input } from './section2/section2Input';
import { section2FromInput } from './section2/section2FromInput';



export function sectionInputFactory() {

    return { getInput, getSectionBuilder };

    function getInput(type: SectionType | string): Array<ModelInput> {
        switch (type) {
            case SectionType.Section1: {
                return JSON.parse(JSON.stringify(section1Input));
            }
            case SectionType.Section2: {
                return JSON.parse(JSON.stringify(section2Input));
            }
        }
    }

    function getSectionBuilder(type: SectionType) {
        switch (type) {
            case SectionType.Section1: {
                return { sectionFromInput: section1FromInput };
            }
            case SectionType.Section2: {
                return { sectionFromInput: section2FromInput };
            }
        }
    }
}
