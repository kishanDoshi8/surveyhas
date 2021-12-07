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
    const valid = await validate();
    if(!valid) {
        return res.status(400).json({ msg: "The link provided is Invalid" });
    }

    return res.status(200).json({ fileId, sheetNumber });
});

const validate = async () => {
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
    return true;
}

const getFileId = () => {
    return fileId;
}

const getSheetNumber = () => {
    return sheetNumber;
}

module.exports = { getFileId, getSheetNumber, router };