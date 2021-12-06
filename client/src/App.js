import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import GameSetup from './components/GameSetup';
import Game from './components/Game/Game';

function App() {

  return (
    <div className="App">
      <Router>
        <Routes >
            <Route path="/" element={<GameSetup />} />
            <Route path="/game" element={<Game />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
