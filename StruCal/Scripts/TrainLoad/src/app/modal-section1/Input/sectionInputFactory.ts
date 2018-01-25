import { SectionType } from '../../../common/sectionBuilders/sectionTypes';
import { SectionModalInput } from './sectionModalInput';
import { section1Input } from './section1/section1Input';
import { section1FromInput } from './section1/section1FromInput';



export function sectionInputFactory() {

    return { getInput, getSectionBuilder };

    function getInput(type: SectionType|string): Array<SectionModalInput> {
        switch (type) {
            case SectionType.Section1: {
                return section1Input;
            }
        }
    }

    function getSectionBuilder(type: SectionType) {
        switch (type) {
            case SectionType.Section1: {
                return section1FromInput;
            }
        }
    }
}
