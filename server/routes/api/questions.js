const express = require("express");
const router = express.Router();
const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('../../client_secret.json');

// const sheetNumber = require("./gameSetup").sheetNumber;
// const fileId  = '11svrHuLT8RhYmTxIIsyjoy8-vcIURe_iB8ny2ZJ3oCE';

// @route   GET /api/questions/:id
router.get("/:id", async (req, res) => {
    const fileId  = require("./gameSetup").getFileId();
    const sheetNumber  = require("./gameSetup").getSheetNumber();
    const questionNumber = req.params.id;
    
    let response = await getResponses(fileId, sheetNumber, questionNumber);
    if(!response) return res.status(404).json({ msg: "Question not found" });

    res.status(200).json(response);
});

// Private methods
async function getResponses(fileId, sheetNumber, questionNumber) {
    const doc = new GoogleSpreadsheet(fileId);
    await doc.useServiceAccountAuth({
        client_email: creds.client_email,
        private_key: creds.private_key,
    });

    await doc.loadInfo(); // loads document properties and worksheets

    const sheet = doc.sheetsByIndex[sheetNumber]; // or use doc.sheetsById[id]

    const rows = await sheet.getRows();

    let question = rows[0][questionNumber];
    let totalQuestions = rows[0]._rawData.length;

    if(questionNumber > totalQuestions) return;
    
    let responses = new Map();
    let numberOfResponses = 0;
    for(let i=1; i<rows.length; i++) {
        let response = rows[i][questionNumber];
        if(!response) continue;
        ++numberOfResponses;
        if(responses.has(response)) {
            let r = responses.get(response);
            responses.set(response, ++r);
        } else {
            responses.set(response, 1)
        }
    }

    
    responses = [...responses].sort((a, b) => b[1] - a[1]);

    let result = {
        totalQuestions,
        question,
        responses: [],
        currentQuestion: questionNumber,
    }

    for(let response of responses) {
        let newResposne = {
            answer: response[0],
            numberOfResponses: response[1],
            points: Math.round((response[1] / numberOfResponses) * 100)
        }
        result.responses.push(newResposne)
    }

    return result;
}

module.exports = router;