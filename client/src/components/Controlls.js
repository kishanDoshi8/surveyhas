import React from 'react';

const Controlls = ({currentQuestion, totalQuestions, changeQuestion}) => {

    const previousQuestion = () => {
        if(currentQuestion > 0) {
            changeQuestion(--currentQuestion);
        }
    }

    const nextQuestion = () => {
        if(currentQuestion <= totalQuestions) {
            changeQuestion(++currentQuestion);
        }
    }

    return (
        <div className="controlls-panel">
            {currentQuestion != 1 && <button onClick={previousQuestion}><i className="fas fa-chevron-circle-left"></i></button>}
            {currentQuestion < totalQuestions && <button onClick={nextQuestion}><i className="fas fa-chevron-circle-right"></i></button>}
        </div>
    );
}

export default Controlls;