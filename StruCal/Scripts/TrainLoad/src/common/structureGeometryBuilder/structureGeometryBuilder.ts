import { StructureGeometry } from '../structure/structureGeometry';
import { Section } from '../structure/section';
import { Span } from '../structure/span';
import { Bar } from '../structure/bar';
import { Point } from '../utils/point';
import { Point3D } from '../utils/point3d';
import { Support, OrtogonalSupportCreator } from '../structure/support';

const barSplitCount = 2;

export function structureGeometryBuilder() {
    const structure = new StructureGeometry();
    let _section: Section;
    let _span: Span;

    return { setSection };

    function setSection(section: Section) {
        _section = section;
        return { setSpan };
    }

    function setSpan(span: Span) {
        _span = span;
        return { build };
    }

    function build() {
        structure.bars = generateBars();
        structure.supports = genertateSupports();
        return structure;
    }

    function genertateSupports() {
        const supports: Array<Support> = [];
        supports.push(OrtogonalSupportCreator({ x: 0, y: 0, z: 0 }));
        supports.push(OrtogonalSupportCreator({ x: 0, y: 0, z: _span.lengths[0] }));
        if (_span.lengths.length === 2) {
            supports.push(OrtogonalSupportCreator({ x: 0, y: 0, z: _span.lengths[0] + _span.lengths[1] }));
        }

        return supports;
    }

    function generateBars(): Array<Bar> {
        const length = _span.lengths.reduce((a, e) => a + e);
        const bars: Array<Bar> = [];
        const barLength = _span.lengths[0] / barSplitCount;
        for (let i = 0; i < _span.lengths.length * barSplitCount; i++) {
            const bar = new Bar();
            bar.section = _section;
            bar.startPoint = { x: 0, y: 0, z: i * barLength };
            bar.endPoint = { x: 0, y: 0, z: (i + 1) * barLength };
            bars.push(bar);
        }

        return bars;
    }
}
