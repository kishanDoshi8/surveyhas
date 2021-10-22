import React, { useEffect } from 'react';

const ScoreBoard = ({ teamSelected, setTeamSelected, teamsInfo, setTeamsInfo }) => {    
    return (
        <div className="score-board">
            <div className="score-board-team-1">
                <button className={teamSelected === 0 ? "team-1-name selected" : "team-1-name"} onClick={() => setTeamSelected(0)}>
                    {teamsInfo[0].name}
                </button>
                <div className="team-1-score">
                    {teamsInfo[0].score}
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
                <button className={teamSelected === 1 ? "team-1-name selected" : "team-1-name"} onClick={() => setTeamSelected(1)}>
                    {teamsInfo[1].name}
                </button>
                <div className="team-2-score">
                    {teamsInfo[1].score}
                </div>
            </div>
        </div>
    );
}

export default ScoreBoard;