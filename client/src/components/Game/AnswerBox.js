import React, { useState, useEffect, useRef, useContext } from 'react'
import { ADD_SCORES, ADD_WRONG_ASNWER, RESET_WRONG_ASNWER } from '../../actions/TeamsActions';
import Typewriter from '../../customHooks/Typewriter';
import { useTeams, useUpdateTeams } from '../../Providers/TeamsContext';

export default function AnswerBox({ responses, teamSelected, setError }) {

    const [answered, _setAnswered] = useState([]);
    const answeredRef = useRef(answered);
    const setAnswered = data => {
        answeredRef.current = data;
        _setAnswered(data);
    }

    const teamsInfo = useTeams();
    const updateTeams = useUpdateTeams();

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
            updateTeams(RESET_WRONG_ASNWER);
        }
    }, [responses]);
    
    let keyUpEvent = (event) => {
        if(teamSelected === -1) {
            setError("Please select a team."); 
            return;
        }
        const isKeyX = event.key === 'x';
        console.log(event.key);
        if(isKeyX) {
            updateTeams(ADD_WRONG_ASNWER, teamSelected);
        } 
        
        const number = +event.key;
        if(isNaN(number)) return;
        showAnswer(number-1);
    }
    
    const showAnswer = (index) => {
        if(teamsInfo[teamSelected].wrongAnswers >= 3) {
            setError(`Team: ${teamsInfo[teamSelected].teamName} cannot play this round. A Maximum of 3 strikes are allowed.`);
            return;
        }
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
                updateTeams(ADD_SCORES, { teamSelected, points });
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
