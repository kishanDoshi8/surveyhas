import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import GameSetup from './components/GameSetup';
import Game from './components/Game/Game';
import AddTeams from './components/AddTeams';
import { TeamProvider } from './Providers/TeamsContext';

function App() {

  return (
    <div className="App">
      <TeamProvider>
        <Router>
          <Routes >
              <Route path="/" element={<GameSetup />} />
              <Route path="/game" element={<Game />} />
              <Route path="/teams" element={<AddTeams />} />
          </Routes>
        </Router>
      </TeamProvider>
    </div>
  );
}

export default App;
