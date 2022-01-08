import React, { useState } from 'react';
import ErrorModal from './ErrorModal';
import { useNavigate } from "react-router-dom";
import { useTeams, useUpdateTeamA, useUpdateTeamB } from '../Providers/TeamsContext';
import useLocalStorage from '../customHooks/useLocalStorage';

const AddTeams = () => {
    const teams = useTeams();
    const updateTeamA = useUpdateTeamA();
    const updateTeamB = useUpdateTeamB();
    const [error, setError] = useState(false);
    const [getTeams, setTeams] = useLocalStorage("teams");
    
    const navigate = useNavigate();

    const startGame = () => {
        if(!teams[0].teamName || !teams[1].teamName) {
            return setError("Please enter team names");
        }

        if(teams[0].players.length === 0 || teams[1].players.length === 0) {
            return setError("Both teams should have atleast 1 player");
        }

        teams[0].score = 0;
        teams[1].score = 0;
        teams[0].wrongAnswers = 0;
        teams[1].wrongAnswers = 0;
        teams[0].currentPlayer = 0;
        teams[1].currentPlayer = 0;

        setTeams(teams);

        navigate("/game");
    }

    return (
        <div className="add-teams">
            <div className="add-teams-inputs">
                <div className="add-team-1">
                    <input onChange={updateTeamA} name="team" className="add-team-name" type="text" placeholder="Team 1 name..." />
                    <br/>
                    <input onChange={updateTeamA} name="player1" className="add-player-name" type="text" placeholder="Player 1 name" />
                    <input onChange={updateTeamA} name="player2" className="add-player-name" type="text" placeholder="Player 2 name" />
                    <input onChange={updateTeamA} name="player3" className="add-player-name" type="text" placeholder="Player 3 name" />
                    <input onChange={updateTeamA} name="player4" className="add-player-name" type="text" placeholder="Player 4 name" />
                    <input onChange={updateTeamA} name="player5" className="add-player-name" type="text" placeholder="Player 5 name" />
                </div>
                <div className="add-team-2">
                    <input onChange={updateTeamB} name="team" className="add-team-name" type="text" placeholder="Team 2 name..." />
                    <br/>
                    <input onChange={updateTeamB} name="player1" className="add-player-name" type="text" placeholder="Player 1 name" />
                    <input onChange={updateTeamB} name="player2" className="add-player-name" type="text" placeholder="Player 2 name" />
                    <input onChange={updateTeamB} name="player3" className="add-player-name" type="text" placeholder="Player 3 name" />
                    <input onChange={updateTeamB} name="player4" className="add-player-name" type="text" placeholder="Player 4 name" />
                    <input onChange={updateTeamB} name="player5" className="add-player-name" type="text" placeholder="Player 5 name" />
                </div>
            </div>
            <button id="btn-start-game" onClick={startGame}>Start game</button>
            {error && <ErrorModal message={error.toString()} removeError={() => setError('')}/>}
        </div>
    );
}

export default AddTeams;