const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const { message } = require('statuses');

require('dotenv').config()
const fileUpload = require('express-fileupload');

app.use(fileUpload());
app.use(morgan('tiny'));
app.use(cors());
app.options('*', cors());
const v2 = require('./index')
app.use(`/api`, v2);
// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

app.use(`/document`, express.static(path.join(__dirname, '/public')))



app.get('/', function (req, res) {
    res.json({
        message: "Heartbeat Check"
    })
})

app.get('/test', function (req, res) {
    res.json({
        message: "Data Showw"
    })
})


app.listen(process.env.PORT, () => {
    console.log(`Listening to Port ${process.env.PORT}`)
})

