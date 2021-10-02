import React from 'react'

export default function AnswerBox({responses}) {
    return (
        <div className="answer-container">
            {responses?.map((res, i) => (
                <div className="answer-box" key={i}>
                    <p>{res.answer}</p>
                    <p className="points">{res.points}</p>
                </div>    
            ))}
        </div>
    )
}
