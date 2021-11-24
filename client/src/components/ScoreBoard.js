import React, { useState, useEffect } from 'react';

const ScoreBoard = ({ teamSelected, setTeamSelected, teamsInfo, setTeamsInfo }) => {

    const [teamAWrongAnswers, setTeamAWrongAnswers] = useState([]);
    const [teamBWrongAnswers, setTeamBWrongAnswers] = useState([]);

    useEffect(() => {
        let teamAWrong = teamsInfo[0].wrongAnswers;
        let teamBWrong = teamsInfo[1].wrongAnswers;

        setTeamAWrongAnswers(new Array(teamAWrong).fill(0));
        setTeamBWrongAnswers(new Array(teamBWrong).fill(0));
    }, [teamsInfo]);

    let removeWrongAnswer = (teamSelected) => {
        let teams = [...teamsInfo]
        let team = [...teams][teamSelected];
        if(team.wrongAnswers <= 0) return;
        team.wrongAnswers--;
        setTeamsInfo(teams);
    }

    return (
        <div className="score-board">
            <div className="score-board-team-1">
                <div>
                    <button className={teamSelected === 0 ? "team-1-name selected" : "team-1-name"} onClick={() => setTeamSelected(0)}>
                        {teamsInfo[0].name}
                    </button>
                    <div className="team-1-score">
                        {teamsInfo[0].score}
                    </div>
                </div>
                <div className="wrong-answers" onClick={() => removeWrongAnswer(0)}>
                    {teamAWrongAnswers.map((_, i )=> (
                        <div key={i}><i class="far fa-times-circle wrong-answer-x"></i></div>
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
                <div className="wrong-answers" onClick={() => removeWrongAnswer(1)}>
                    {teamBWrongAnswers.map((_, i )=> (
                        <div key={i}><i class="far fa-times-circle wrong-answer-x"></i></div>
                    ))}
                </div>
                <div>
                    <button className={teamSelected === 1 ? "team-2-name selected" : "team-2-name"} onClick={() => setTeamSelected(1)}>
                        {teamsInfo[1].name}
                    </button>
                    <div className="team-2-score">
                        {teamsInfo[1].score}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ScoreBoard;