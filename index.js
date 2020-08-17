require('./db-connection')();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('./config.json');
const users = require('./routes/user');

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => res.status(200).send("API is working..."));
app.use('/users', users);

app.listen(process.env.PORT || config.port, () => console.log('API started.'));