import React, { useState, useEffect, useRef } from 'react'
import Typewriter from '../../customHooks/Typewriter';

export default function AnswerBox({ responses, teamSelected, teamsInfo, setTeamsInfo, setError }) {

    const [answered, _setAnswered] = useState([]);
    const answeredRef = useRef(answered);
    const setAnswered = data => {
        answeredRef.current = data;
        _setAnswered(data);
    }

    useEffect(() => {
        if(!responses || responses.length <= 0) return;
        
        document.addEventListener("keyup", keyUpEvent);

        return () => {
            document.removeEventListener("keyup", keyUpEvent);
        }
    }, [responses, teamSelected]);

    useEffect(() => {
        return () => {
            setAnswered([]);
            resetWrongAnswers();
        }
    }, [responses])

    let resetWrongAnswers = () => {
        let teams = [...teamsInfo]
        let teamA = [...teams][0];
        teamA.wrongAnswers = 0;
        let teamB = [...teams][1];
        teamB.wrongAnswers = 0;
        setTeamsInfo(teams);
    }
    
    let keyUpEvent = (event) => {
        if(teamSelected === -1) {
            setError("Please select a team."); 
            return;
        }
        const isKeyX = event.key === 'x';
        if(isKeyX) {
            let teams = [...teamsInfo]
            let team = [...teams][teamSelected];
            if(team.wrongAnswers >= 3) return;
            team.wrongAnswers++;
            setTeamsInfo(teams);
        } 
        
        const number = +event.key;
        if(isNaN(number)) return;
        console.log(teamsInfo[teamSelected.wrongAnswers]);
        showAnswer(number-1);
    }
    
    const showAnswer = (index) => {
        // if(teamsInfo[teamSelected].wrongAnswers <= 3) {
        //     setError(`Team: ${teamsInfo[teamSelected].name} cannot play this round. A Maximum of 3 strikes are allowed.`);
        //     return;
        // }
        if(index >= responses.length) return;
        if(answeredRef.current.includes(index)) return;
        setAnswered([...answeredRef.current, index] );
        const answerDiv = document.getElementById("answer-box-answer-" + index);
        const pointsDiv = document.getElementById("answer-box-points-" + index);

        const answerBoxDiv = document.getElementById("answer-box-" + index);
        answerBoxDiv.classList.add('answered');

        Typewriter(responses[index].answer, answerDiv);
        setTimeout(() => {
            var points = +responses[index].points;
            Typewriter(points.toString(), pointsDiv);

            // Only update team score when a team is selected
            if(teamSelected > -1) {
                let teams = [...teamsInfo]
                let team = [...teams][teamSelected];
                team.score += points;
                setTeamsInfo(teams);
            }
        }, 1500);
    }

    return (
        <div className="answer-container">
            {responses?.map((res, i) => (
                <div id={"answer-box-" + i} className="answer-box" key={i} onClick={() => showAnswer(+i)}>
                    <p id={"answer-box-answer-" + i} className="answer">{i+1} ?</p>
                    <p id={"answer-box-points-" + i} className="points"></p>
                </div>    
            ))}
        </div>
    )
}
