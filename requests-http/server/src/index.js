const express = require('express');
// const cors = require('cors');
const bodyParser = require('body-parser');
const multipart = require('connect-multiparty');

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// const corsOptions = {
//     origin: '*',
//     optionsSuccessStatus: 200
// }

// app.use(cors(corsOptions));

const multipartMiddleware = multipart({uploadDir: './uploads'});
app.post('/upload', multipartMiddleware, (req, res) => {
    const files = req.files;
    console.log(files)
    res.json({message: files});
})

app.get('/downloadexcel', (req, res) => {
    res.download('./uploads/report.xlsx');
})

app.get('/downloadpdf', (req, res) => {
    res.download('./uploads/report.pdf');
})

app.use((err, req, res, next) => res.json({error: err.message}));

app.listen(8000, () => {
    console.log('Servidor iniciado na porta 8000.')
});