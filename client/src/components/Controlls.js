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
            {currentQuestion != 1 && <button onClick={previousQuestion}><i class="fas fa-chevron-circle-left"></i></button>}
            {currentQuestion < totalQuestions && <button onClick={nextQuestion}><i class="fas fa-chevron-circle-right"></i></button>}
        </div>
    );
}

export default Controlls;