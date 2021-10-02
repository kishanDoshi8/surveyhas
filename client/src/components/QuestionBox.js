import React from 'react';

const QuestionBox = ({question, currentQuestion}) => {
    return (
        <div className="question-container">
            {question && (<p>{currentQuestion}. {question}</p>)}
        </div>
    );
}

export default QuestionBox;