import React from 'react'
import usTypewriter from '../customHooks/usTypewriter';

export default function AnswerBox({responses}) {
    const showAnswer = (index) => {
        const answerDiv = document.getElementById("answer-box-answer-" + index);
        const pointsDiv = document.getElementById("answer-box-points-" + index);

        usTypewriter(responses[index].answer, answerDiv);
        usTypewriter(responses[index].points.toString(), pointsDiv);
    }

    return (
        <div className="answer-container">
            {responses?.map((res, i) => (
                <div className="answer-box" key={i} onClick={() => showAnswer(i)}>
                    <p id={"answer-box-answer-" + i} className="answer">{i+1} ?</p>
                    <p id={"answer-box-points-" + i} className="points"></p>
                </div>    
            ))}
        </div>
    )
}
