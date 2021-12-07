require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

app.use("/api/questions", require("./routes/api/questions"));
app.use("/api/gameSetup", require("./routes/api/gameSetup").router);

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