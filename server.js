const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const allNotes = require('./db/db.json');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.get('/api/notes', (req, res) => {
    res.json(allNotes.slice(1));
});

//calls apon the two different htmls
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

app.get('/api/notes', (req, res) => {
    return res.json(notes)
});
//
function createNewNote(body, notesList) {
    const newNote = body;
    if (!Array.isArray(notesList)){
        notesList = [];
    }
    if (notesList.length === 0){
        notesList.push(0);
    }
    body.id = notesList[0];
    notesList[0]++;

    notesList.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notesList, null, 2)
    );
    return newNote;
}

app.post('/api/notes', (req, res) => {
    const newNote = createNewNote(req.body, allNotes);
    res.json(newNote);
});


function deleteNote(id, notesList) {
    for (let i = 0; i < notesList.length; i++) {
        let note = notesList[i];

        if (note.id == id) {
            notesList.splice(i, 1);
            fs.writeFileSync(
            path.join(__dirname, './db/db.json'),
            JSON.stringify(notesList, null ,2)
            );
        }}}
        // app.delete('/api/notes/:id', (req, res) => {
        //     deleteNote(req.params.id, allNotes);
        // });




app.listen(PORT, () =>{
    console.log(`Server on PORT ${PORT}!`);
    //do i need to add http://localhost:${PORT}
} );