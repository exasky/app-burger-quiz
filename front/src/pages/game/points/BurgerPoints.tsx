import { PointElement } from './PointElement';

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
];

// TODO how to pass point status to show active parts?

export function BurgerParts() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column-reverse', alignItems: 'center' }}>
      Point Screen
      {burgerParts.map((part, index) => (
        <PointElement key={part} elementId={part} index={index} active={false} />
      ))}
    </div>
  );
}
