import React, { useState } from 'react';

const Controlls = ({currentQuestion, totalQuestions, changeQuestion}) => {

    const previousQuestion = () => {
        changeQuestion(--currentQuestion);
    }

    const nextQuestion = () => {
        changeQuestion(++currentQuestion);
    }

    return (
        <div className="controlls-panel">
            {currentQuestion != 1 && <button onClick={previousQuestion}>prev</button>}
            {currentQuestion < totalQuestions && <button onClick={nextQuestion}>next</button>}
        </div>
    );
}

export default Controlls;