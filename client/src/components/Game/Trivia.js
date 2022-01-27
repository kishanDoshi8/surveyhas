import React, { useState } from 'react';

const Trivia = () => {

    const auto_grow = (e) => {
        const el = e.target;
        el.style.height = "5px";
        el.style.height = (el.scrollHeight)+"px";
    }

    return (
        <div className="question-container" >
            <textarea onInput={e => auto_grow(e)} className="trivia-textarea" ></textarea>
        </div>
    );
}

export default Trivia;