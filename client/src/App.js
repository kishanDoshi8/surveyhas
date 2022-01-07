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
      <nav>
        <h1>Survey Has</h1>
        <ul>
          <li><a href="/">Setup</a></li>
          <li><a href="/teams">Teams</a></li>
          <li><a href="/game">Game</a></li>
        </ul>
      </nav>
      <TeamProvider className="container">
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
