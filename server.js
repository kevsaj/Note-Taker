const express = require('express');
const uniqid = require('uniqid');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public/'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
})

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/db/db.json'));
});





const writeDatabase = (data) => {
    fs.writeFile(__dirname + '/db/db.json', JSON.stringify(data), err => {
        if (err) throw err;
    });
}


app.listen(PORT, () => {
    console.log(`App now listening at localhost:${PORT}`);
});