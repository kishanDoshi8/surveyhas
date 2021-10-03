import React from 'react';
import usTypewriter from '../customHooks/usTypewriter';

const QuestionBox = ({question, currentQuestion}) => {
    return (
        <div className="question-container" >
            {question && (<p>{currentQuestion}. {question}</p>)}
        </div>
    );
}

export default QuestionBox;