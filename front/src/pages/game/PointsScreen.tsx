import { useState } from 'react';
import { PointElement } from './points/PointElement';

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

const cupParts = ['cup', 'top-cup', 'straw'];

const condimentParts = [
  { e: 'salt-pepper', a: undefined },
  { e: 'empty-mayo-ketchup', a: 'tube-mayo' },
  { e: 'empty-mayo-ketchup', a: 'tube-ketchup' },
];

const friesParts = ['fries', 'fries-box'];

export function PointScreen() {
  const [active, setActive] = useState(false);

  setTimeout(() => {
    setActive(true);
  }, 2000);

  return (
    <div style={{ color: 'white', display: 'flex', flexDirection: 'column-reverse', alignItems: 'center' }}>
      Point Screen
      {burgerParts.map((part, index) => (
        <PointElement key={part} elementId={part} index={index} active={active} />
      ))}
      {cupParts.map((part, index) => (
        <PointElement key={part} elementId={part} index={index} active={active} />
      ))}
      {condimentParts.map((part, index) => (
        <PointElement key={part.a} elementId={part.e} index={index} active={active} activeElementId={part.a} />
      ))}
    </div>
  );
}
