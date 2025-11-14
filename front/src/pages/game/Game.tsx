import { Route, Routes } from 'react-router';
import { PointScreen } from './PointsScreen';
import { WaitScreen } from './WaitScreen';

export function Game() {
  return (
    <Routes>
      <Route path="/" Component={WaitScreen} />
      <Route path="/points" Component={PointScreen} />
    </Routes>
  );
}
