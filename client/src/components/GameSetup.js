import React, { useState } from 'react';

const GameSetup = () => {
    return (
        <div className="game-setup">
            <div className="game-sheet-id">
                <label htmlFor="game-sheet-link">Game sheet link: </label>
                <input type="text" className="game-sheet-link" />
            </div>
            <div className="game-sheet-id">
                <label htmlFor="game-sheet-number">Game sheet number: </label>
                <input type="number" className="game-sheet-number" />
            </div>

            <button className="btn-add-teams">Add teams</button>
        </div>
    );
}

export default GameSetup;