import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css';
import Admin from './pages/admin/Admin';
import TeamChoice from './pages/team-choice/TeamChoice';
import Buzzer from './pages/team-choice/Buzzer';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={TeamChoice} />
        <Route path="/buzzer" Component={Buzzer} />
        <Route path="/admin" Component={Admin} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
