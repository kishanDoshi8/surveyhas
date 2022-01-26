import React, { useState, useEffect } from 'react';

const Controlls = ({currentQuestion, totalQuestions, changeQuestion, toggleTrivia, hideTrivia}) => {

    const [emptyArray, setEmptyArray] = useState([])

    useEffect(() => {
        setEmptyArray([...Array(totalQuestions)]);
    }, [totalQuestions])

    const previousQuestion = () => {
        if(currentQuestion > 0) {
            hideTrivia();
            changeQuestion(--currentQuestion);
        }
    }

    const nextQuestion = () => {
        if(currentQuestion <= totalQuestions) {
            hideTrivia();
            changeQuestion(++currentQuestion);
        }
    }

    const goToQuestion = index => {
        hideTrivia();
        changeQuestion(index);
    }

    return (
        <div className="controlls-panel">
            <span className="go-to">
                <button onClick={e => toggleTrivia()}> ? </button>
                {emptyArray.map((_, i) => (
                    <button key={i} onClick={() => goToQuestion(i+1)} className={i+1 === +currentQuestion ? "go-to-question active" : "go-to-question"}>{i+1}</button>
                ))}
            </span>
            <span className="controll-panel-navigation">
                {+currentQuestion > 1 && <button onClick={previousQuestion}><i className="fas fa-chevron-circle-left"></i></button>}
                {currentQuestion < totalQuestions && <button onClick={nextQuestion}><i className="fas fa-chevron-circle-right"></i></button>}
            </span>

        </div>
    );
}

export default Controlls;