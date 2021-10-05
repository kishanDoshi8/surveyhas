import React from 'react';

const ErrorModal = ({message, removeError}) => {
    return (
        <div className="error-modal"> 
            <p className="error-message">{message}</p>
            <br />
            <button className="error-okay-btn" onClick={removeError}>Ok</button>
        </div>
    );
}

export default ErrorModal;