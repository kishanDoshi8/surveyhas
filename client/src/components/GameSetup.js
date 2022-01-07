import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Loading from './Loading';
import ErrorModal from './ErrorModal';
import useLocalStorage from '../customHooks/useLocalStorage';

const GameSetup = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [copied, setCopied] = useState(false);
    const [fileId, setFileId] = useState('');
    const [sheetNumber, setSheetNumber] = useState(0);
    const [setup, setSetup] = useLocalStorage("setup", { fileId: "11svrHuLT8RhYmTxIIsyjoy8-vcIURe_iB8ny2ZJ3oCE", sheetNumber: 1 });

    useEffect(() => {
        console.log(setup);
    }, [])

    const setupGame = e => {
        e.preventDefault();
        setLoading(true);
        setSetup({ fileId, sheetNumber })
        axios.post("/api/gameSetup",{
            // sheetNumber: 1,
            // fileId: '11svrHuLT8RhYmTxIIsyjoy8-vcIURe_iB8ny2ZJ3oCE'
            sheetNumber,
            fileId,
        }).then(res => {
            if(res.status === 200) navigate('/teams');
        }).catch(err => {
            let message = typeof err.response !== "undefined" ? err.response.data.msg : err.message;
            setError(message);
        }).finally(() => {
            setLoading(false);
        });
    }

    const copyEmailToClipboard = () => {
        navigator.clipboard.writeText("gamefued@gamefued.iam.gserviceaccount.com");
        setCopied(!copied);
    }

    return (
        <div className="game-setup">
            <form className="game-setup-form" onSubmit={setupGame}>
                <label id="share-email">Copy email address 
                    {!copied && <span onClick={copyEmailToClipboard}><i className="far fa-copy"></i></span>}
                    {copied && <span onClick={copyEmailToClipboard}><i className="fas fa-copy"></i></span>}
                </label>
                
                <div className="game-sheet-id">
                    <label htmlFor="game-sheet-link">Game sheet link: </label>
                    <input value={fileId} onChange={e => setFileId(e.target.value)} type="text" className="game-sheet-link" required />
                </div>
                <div className="game-sheet-id">
                    <label htmlFor="game-sheet-number">Game sheet number: </label>
                    <input value={sheetNumber} onChange={e => setSheetNumber(e.target.value)} type="number" min="0" max="99" className="game-sheet-number" required/>
                </div>

                <button className="btn-add-teams">Add teams</button>
                {loading && <Loading />}
                {error && <ErrorModal message={error.toString()} removeError={() => setError('')}/>}
            </form>
        </div>
    );
}

export default GameSetup;