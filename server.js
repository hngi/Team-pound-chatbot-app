require('dotenv').config({ path: 'var.env' });

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const processMessage = require('./process');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.post('/chat', (req,res) => {
    const {message} = req.body;
    processMessage(message);
});

app.set('port', process.env.PORT || 5000);

const server = app.listen(app.get('port'), () => {
    console.log(`app is listening at port ${server.address().port}`);
});
