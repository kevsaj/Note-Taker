const express = require('express');
const uniqid = require('uniqid');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({
    extended: true
}));
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


app.post('/api/notes', (req, res) => {
    req.body.id = uniqid();
    const newNote = req.body;
    
    fs.readFile(path.join(__dirname + '/db/db.json'), (err, data) => {
        
        let oldNotes;
        try {
            oldNotes = JSON.parse(data);
        } catch {
            oldNotes = [];
        }
        oldNotes.push(newNote);
        writeDatabase(oldNotes);
        console.log(`Added note with id ${req.body.id}`);
        res.send(`Added note with id ${req.body.id}`);
    
    });

});

const writeDatabase = (data) => {
    fs.writeFile(__dirname + '/db/db.json', JSON.stringify(data), err => {
        if (err) throw err;
    });
}


app.listen(PORT, () => {
    console.log(`App now listening at localhost:${PORT}`);
});