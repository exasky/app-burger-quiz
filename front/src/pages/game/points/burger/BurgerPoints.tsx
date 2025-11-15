import { memo } from 'react';
import type { Range } from '../../../../utils/types/range';
import { PointElement } from '../PointElement';
import styles from './burgerpoints.module.scss';

const burgerParts = [
  'base-burger',
  'salad',
  'base-meat',
  'base-tomato',
  'middle-burger',
  'salad',
  'cheese',
  'top-meat',
  'top-tomato',
  'top-bread',
] as const;

interface BurgerPartsProps {
  activeParts: Range<0, typeof burgerParts.length>;
}

export const BurgerParts = memo(function (props: BurgerPartsProps) {
  return (
    <div className={styles.container}>
      {burgerParts.map((part, index) => (
        // <div className={styles[part]} key={index}>
        <PointElement key={index} elementId={part} active={props.activeParts > index} />
        // </div>
      ))}
    </div>
  );
});
