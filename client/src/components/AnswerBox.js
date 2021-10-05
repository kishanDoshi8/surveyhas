import React, { useEffect } from 'react'
import typewriter from '../customHooks/typewriter';

export default function AnswerBox({responses}) {

    useEffect(() => {
        if(!responses || responses.length <= 0) return;
        
        document.addEventListener("keyup", keyUpEvent);

        return () => {
            document.removeEventListener("keyup", keyUpEvent);
        }
    }, [responses]);
    
    const keyUpEvent = (event) => {
        const number = +event.key;
        const isKeyX = event.key === 'x';

        if(isKeyX) console.log("Wrong answer!");

        if(isNaN(number)) return;
        showAnswer(number-1);
    }

    const showAnswer = (index) => {
        if(index >= responses.length) return;
        const answerDiv = document.getElementById("answer-box-answer-" + index);
        const pointsDiv = document.getElementById("answer-box-points-" + index);

        const answerBoxDiv = document.getElementById("answer-box-" + index);
        answerBoxDiv.classList.add('answered');

        typewriter(responses[index].answer, answerDiv);
        setTimeout(() => {
            typewriter(responses[index].points.toString(), pointsDiv);
        }, 1500);
    }

    return (
        <div className="answer-container">
            {responses?.map((res, i) => (
                <div id={"answer-box-" + i} className="answer-box" key={i} onClick={() => showAnswer(i)}>
                    <p id={"answer-box-answer-" + i} className="answer">{i+1} ?</p>
                    <p id={"answer-box-points-" + i} className="points"></p>
                </div>    
            ))}
        </div>
    )
}
