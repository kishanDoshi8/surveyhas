const express = require("express");
const router = express.Router();
const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('../../client_secret.json');

let fileId = '';
let sheetNumber = 0;
// @route   POST /api/gameSetup
router.post("/", async (req, res) => {
    fileId = req.body.fileId;
    sheetNumber = +req.body.sheetNumber;
    if(typeof sheetNumber !== 'number') return res.status(400).json({ msg: "Sheet number should be a number." })
    const valid = await validateAndCreate();
    if(!valid) {
        return res.status(400).json({ msg: "The link provided is Invalid" });
    }

    return res.status(200).json({ fileId, sheetNumber });
});

const validateAndCreate = async () => {
    const doc = new GoogleSpreadsheet(fileId);
    await doc.useServiceAccountAuth({
        client_email: creds.client_email,
        private_key: creds.private_key,
    });
    
    try {
        await doc.loadInfo();
    } catch(err) {
        return false;
    }
    
    const sheet = doc.sheetsByIndex[sheetNumber]; // or use doc.sheetsById[id]

    const rows = await sheet.getRows();

    let totalQuestions = rows[0]._rawData.length;
    
    const newSheet = await doc.addSheet({ 
        title: `Top answers`,
        headerValues: ["questionNumber", "question", "A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "Points1", "Points2", "Points3", "Points4", "Points5", "Points6", "Points7", "Points8", "Points9"]
    });
    
    for(let questionNumber=1; questionNumber<=totalQuestions; questionNumber++) {
        let question = rows[0][questionNumber];
        if(!question) continue;

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
                responses.set(response, 1);
            }
        }
        
        responses = [...responses].sort((a, b) => b[1] - a[1]);
    
        let result = {
            question,
            questionNumber
        }

        Array.from(responses.entries());
        for(let i=0; i<=responses.length; i++) {
            if(!responses[i]) continue;
            result["A"+(i+1)] = responses[i][0];
            result[`Points${i+1}`] = Math.round((responses[i][1] / numberOfResponses) * 100);
        }

        await newSheet.addRow(result);
    }
 
    return true;
}

const getFileId = () => {
    return fileId;
}

const getSheetNumber = () => {
    return sheetNumber;
}

module.exports = { getFileId, getSheetNumber, router };