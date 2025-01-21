const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const { message } = require('statuses');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
require('dotenv').config()
const fileUpload = require('express-fileupload');
const db = require('./models');
app.use(fileUpload());
app.use(morgan('tiny'));
app.use(cors());
app.options('*', cors());
const v2 = require('./index');

const { where } = require('sequelize');
app.use(`/api`, v2);
// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));
// db.sequelize.sync().then(() => {
//     console.log('Database synced');
// });
app.use(`/document`, express.static(path.join(__dirname, '/public')))

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));


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

app.post('/books', async (req, res) => {
    const data = req.body;
    console.log("dtatta", data)
    try {
        const books = await db.book.create(data)
        res.status(201).send({ data: books });  // Use 201 status code for resource creation
    } catch (err) {
        res.status(500).send({ error: 'An error occurred while creating the book', details: err.message });
    }

})

// app.get('/getbooks/:id', async (req, res) => {
//     const id = req.params.id;
//     console.log("idd", id)
//     try {
//         const books = await db.book.findOne({
//             where: {
//                 id: id
//             }
//         })
//         res.status(200).send({ data: books })
//     } catch (err) {
//         res.status(500).send({ error: 'An error occurred while creating the book', details: err.message });
//     }
// })

// app.get('/getAllData', async (req, res) => {
//     try {
//         const allData = await db.book.findAll();
//         res.status(200).send({ data: allData })
//     }
//     catch (err) {
//         res.status(500).send({ error: 'An error occurred while creating the book', details: err.message });
//     }
// })

// app.put('/update/:id', async (req, res) => {
//     const id = req.params.id;
//     const data = req.body;
//     try {
//         const update = await db.book.update(data, {
//             where: {
//                 id: id
//             }
//         })
//         res.send('book updated')
//     } catch (err) {
//         res.status(500).send({ error: 'An error occurred while creating the book', details: err.message });
//     }
// })

// app.delete('/deleteData/:id', async (req, res) => {
//     const id = req.params.id;
//     try {
//         const deleteData = await db.book.destroy({
//             where: {
//                 id
//             }
//         })
//         res.send('deleted data')
//     }
//     catch (err) {
//         res.status(500).send({ error: 'An error occurred while creating the book', details: err.message });
//     }
// })















app.listen(process.env.PORT, () => {
    console.log(`Listening to Port ${process.env.PORT}`)
})

