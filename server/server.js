require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('./client_secret.json');

const sheetNumber = 1;
const fileId  = '11svrHuLT8RhYmTxIIsyjoy8-vcIURe_iB8ny2ZJ3oCE';

async function getResponses(questionNumber) {
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

app.get("/api/questions/:id", async (req, res) => {
    let response = await getResponses(req.params.id);
    if(!response) return res.status(404).json({ msg: "Question not found" });

    res.status(200).json(response);
});

// Server static assest if in production
if(process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('../client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
    })
}

const port = process.env.PORT || 5005;

app.listen(port, () => console.log(`Server started on ${port}`));