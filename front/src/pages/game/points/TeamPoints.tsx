import { clamp } from '../../../utils/math';
import type { Range } from '../../../utils/types/range';
import { BurgerParts } from './burger/BurgerPoints';
import { CondimentParts } from './condiments/CondimentPoints';
import { Counter } from './counter/Counter';
import { CupParts } from './CupPoints';
import { FriesParts } from './FriesPoints';

interface TeamPointScreenProps {
  team: 'mayo' | 'ketchup';
  points: number;
}

export function TeamPointScreen(props: TeamPointScreenProps) {
  const burgerPoints = clamp(props.points, 0, 10) as Range<0, 10>;
  const cupPoints = clamp(props.points - 10, 0, 3) as Range<0, 3>;
  const cPoints = clamp(props.points - 13, 0, 3) as Range<0, 3>;
  const friesPoints = clamp(props.points - 16, 0, 9) as Range<0, 9>;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '2rem',
        justifyContent: 'space-around',
        maxHeight: 'calc(50vh - 1rem)',
      }}
    >
      <BurgerParts activeParts={burgerPoints} />
      <CupParts activeParts={cupPoints} />
      <CondimentParts activeParts={cPoints} />
      <FriesParts activeParts={friesPoints} />
      <Counter team={props.team} points={props.points} />
    </div>
  );
}
