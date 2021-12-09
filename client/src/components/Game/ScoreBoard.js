import React, { useState, useEffect } from 'react';
import { REMOVE_WRONG_ASNWER } from '../../actions/TeamsActions';
import { useTeams, useUpdateTeams } from '../../Providers/TeamsContext';

const ScoreBoard = ({ teamSelected, setTeamSelected }) => {

    const [teamAWrongAnswers, setTeamAWrongAnswers] = useState([]);
    const [teamBWrongAnswers, setTeamBWrongAnswers] = useState([]);
    const updateTeams = useUpdateTeams();
    const teamsInfo = useTeams();

    useEffect(() => {
        let teamAWrong = teamsInfo[0].wrongAnswers;
        let teamBWrong = teamsInfo[1].wrongAnswers;
        
        setTeamAWrongAnswers(new Array(teamAWrong).fill(0));
        setTeamBWrongAnswers(new Array(teamBWrong).fill(0));
    }, [teamsInfo]);

    return (
        <div className="score-board">
            <div className="score-board-team-1">
                <div className="player-list">
                    {teamsInfo[0].players.map((player, i) => (
                        <p className={teamSelected == 0 ? 
                            (teamsInfo[0].currentPlayer === i ? "player-name player-selected" : "player-name")
                            : (teamsInfo[0].currentPlayer === i ? "player-name player-selected-next" : "player-name")}>
                            {player}
                        </p>
                    ))}
                </div>
                <div>
                    <button className={teamSelected === 0 ? "team-1-name selected" : "team-1-name"} onClick={() => setTeamSelected(0)}>
                        {teamsInfo[0].teamName}
                    </button>
                    <div className="team-1-score">
                        {teamsInfo[0].score}
                    </div>
                </div>
                <div className="wrong-answers" onClick={() => updateTeams(REMOVE_WRONG_ASNWER, 0)}>
                    {teamAWrongAnswers.map((_, i )=> (
                        <div key={i}><i className="far fa-times-circle wrong-answer-x"></i></div>
                    ))}
                </div>
            </div>
            
            <button className={teamSelected === -1 ? "reset-team-selected selected" : "reset-team-selected"} onClick={() => setTeamSelected(-1)}>
                {teamSelected === -1 ? (
                    <i className="fas fa-question"></i>
                ) : (
                    <i className="fas fa-pause"></i>
                )}
            </button>

            <div className="score-board-team-2">
                <div className="wrong-answers" onClick={() => updateTeams(REMOVE_WRONG_ASNWER, 1)}>
                    {teamBWrongAnswers.map((_, i )=> (
                        <div key={i}><i class="far fa-times-circle wrong-answer-x"></i></div>
                    ))}
                </div>
                <div>
                    <button className={teamSelected === 1 ? "team-2-name selected" : "team-2-name"} onClick={() => setTeamSelected(1)}>
                        {teamsInfo[1].teamName}
                    </button>
                    <div className="team-2-score">
                        {teamsInfo[1].score}
                    </div>
                </div>
                <div className="player-list">
                    {teamsInfo[0].players.map((player, i) => (
                        <p className={teamSelected == 1 ? 
                            (teamsInfo[1].currentPlayer === i ? "player-name player-selected" : "player-name")
                            : (teamsInfo[1].currentPlayer === i ? "player-name player-selected-next" : "player-name")}>
                            {player}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ScoreBoard;