import { memo } from 'react';
import type { Range } from '../../../utils/types/range';
import { PointElement } from './PointElement';

const friesParts = ['bucket', 'frie-1', 'frie-2', 'frie-3', 'frie-4', 'frie-1', 'frie-2', 'frie-3', 'frie-4'] as const;

interface BurgerPartsProps {
  activeParts: Range<0, 9>;
}

export const FriesParts = memo(function (props: BurgerPartsProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column-reverse', alignItems: 'center' }}>
      {<PointElement elementId={friesParts[0]} active={props.activeParts > 0} />}
      {
        <div>
          {friesParts.slice(1, 5).map((part, index) => (
            <PointElement key={index} elementId={part} active={props.activeParts > index + 1} />
          ))}
        </div>
      }{' '}
      {
        <div>
          {friesParts.slice(5).map((part, index) => (
            <PointElement key={index} elementId={part} active={props.activeParts > index + 5} />
          ))}
        </div>
      }
    </div>
  );
});
