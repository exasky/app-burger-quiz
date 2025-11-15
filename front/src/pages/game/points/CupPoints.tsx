import { memo } from 'react';
import type { Range } from '../../../utils/types/range';
import { PointElement } from './PointElement';

const cupParts = ['cup', 'top-cup', 'straw'] as const;

interface CupPartsProps {
  activeParts: Range<0, typeof cupParts.length>;
}

export const CupParts = memo(function (props: CupPartsProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column-reverse', alignItems: 'center' }}>
      {cupParts.map((part, index) => (
        <PointElement key={index} elementId={part} active={props.activeParts > index} />
      ))}
    </div>
  );
});
