import React, { useState, useContext, createContext } from 'react';
import { ADD_SCORES, ADD_WRONG_ASNWER, REMOVE_WRONG_ASNWER, RESET_WRONG_ASNWER } from '../actions/TeamsActions';

const TeamContext = createContext();
const TeamAUpdateContext = createContext();
const TeamBUpdateContext = createContext();
const UpdateTeamsContext = createContext();

export const useTeams = () => {
    return useContext(TeamContext);
}

export const useUpdateTeamA = () => {
    return useContext(TeamAUpdateContext);
}

export const useUpdateTeamB = () => {
    return useContext(TeamBUpdateContext);
}

export const useUpdateTeams = () => {
    return useContext(UpdateTeamsContext);
}

export const TeamProvider = ({ children }) => {
    const [teams, setTeams] = useState([
        { teamName: "Team A", players: [], currentPlayer: 0, wrongAnswers: 0, score: 0 },
        { teamName: "Team B", players: [], currentPlayer: 0, wrongAnswers: 0, score: 0 }
    ]);

    const updateTeamA = e => {
        const { name, value } = e.target;
        if(name === "team") {
            setTeams(prevState => {
                let teamA = prevState[0];
                teamA.teamName = value;
                return [...prevState]
            })
        } else if (name.startsWith("player")) {
            let player = +name.slice(-1);
            setTeams(prevState => {
                let teamA = prevState[0];
                teamA.players[player-1] = value
                return [...prevState]
            })
        }
    }

    const updateTeamB = e => {
        const { name, value } = e.target;
        if(name === "team") {
            setTeams(prevState => {
                let teamA = prevState[1];
                teamA.teamName = value;
                return [...prevState]
            })
        } else if (name.startsWith("player")) {
            let player = +name.slice(-1);
            setTeams(prevState => {
                let teamA = prevState[1];
                teamA.players[player-1] = value
                return [...prevState]
            })
        }
    }

    const removeWrongAnswer = (teamSelected) => {
        let teamsInfo = [...teams]
        let team = [...teamsInfo][teamSelected];
        if(team.wrongAnswers <= 0) return;
        team.wrongAnswers--;
        if(team.currentPlayer == 0) {
            team.currentPlayer = team.players.length-1;
        } else {
            team.currentPlayer--;
        }
        setTeams(teamsInfo);
    }
    
    const resetWrongAnswers = () => {
        let teamsInfo = [...teams]
        let teamA = [...teamsInfo][0];
        teamA.wrongAnswers = 0;
        let teamB = [...teamsInfo][1];
        teamB.wrongAnswers = 0;
        setTeams(teamsInfo);
        console.log(teams);
    }

    const addWrongAnswer = teamSelected => {
        let teamsInfo = [...teams]
        let team = [...teamsInfo][teamSelected];
        if(team.wrongAnswers >= 3) return;
        team.wrongAnswers++;
        if(team.wrongAnswers <= 3) {
            if(team.players.length-1 <= team.currentPlayer) {
                team.currentPlayer = 0;
            } else {
                team.currentPlayer++;
            }
        }
        setTeams(teamsInfo);
        console.log(teams); 
    }

    const addScores = ({ teamSelected, points }) => {
        let teamsInfo = [...teams]
        let team = [...teamsInfo][teamSelected];
        team.score += points;
        setTeams(teamsInfo);
    }

    const updateTeams = (action, payload) => {
        switch (action) {
            case RESET_WRONG_ASNWER:
                return resetWrongAnswers();
                
            case REMOVE_WRONG_ASNWER:
                return removeWrongAnswer(payload);

            case ADD_WRONG_ASNWER:
                return addWrongAnswer(payload);
        
            case ADD_SCORES:
                return addScores(payload);
            default:
                break;
        }
    }

    return (
        <TeamContext.Provider value={teams} >
            <TeamAUpdateContext.Provider value={updateTeamA} >
                <TeamBUpdateContext.Provider value={updateTeamB} >
                        <UpdateTeamsContext.Provider value={updateTeams} >
                            {children}
                        </UpdateTeamsContext.Provider>
                </TeamBUpdateContext.Provider>
            </TeamAUpdateContext.Provider>
        </TeamContext.Provider>
    )
}