import { memo } from 'react';
import type { Range } from '../../../../utils/types/range';
import { PointElement } from '../PointElement';
import styles from './condiments.module.scss';

const condimentParts = [
  { e: 'salt-pepper', a: undefined },
  { e: 'empty-mayo-ketchup', a: 'tube-mayo' },
  { e: 'empty-mayo-ketchup', a: 'tube-ketchup' },
];

interface CupPartsProps {
  activeParts: Range<0, typeof condimentParts.length>;
}

export const CondimentParts = memo(function (props: CupPartsProps) {
  return (
    <div className={styles.container}>
      {condimentParts.map((part, index) => (
        <PointElement key={index} elementId={part.e} active={props.activeParts > index} activeElementId={part.a} />
      ))}
    </div>
  );
});
