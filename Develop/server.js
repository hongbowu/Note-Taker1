const express = require("express")
const path = require("path")
const { readFromFile, writeToFile, readAndAppend } = require('./helper/fsUtils');

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));


const PORT = process.env.PORT || 3001;

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);
app.get('/api/notes', (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});
app.post('/api/notes', (req, res) => {
  readAndAppend(req.body , './db/db.json').then(() => {
    res.json({ message: 'Note saved successfully!' });
  });
});
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.delete('/api/notes/:id', (req, res) => {
  const noteId = req.params.id;
  
  readFromFile('./db/db.json').then((data)=>{
    const notes = JSON.parse(data);
  })
  // Find the note in your data source (e.g., array or database) based on the ID
  const updatedNotes = notes.filter((note) => note.id !== parseInt(noteId));

  // Write the updated notes back to the data source
  writeToFile('./db/db.json', updatedNotes);

  // Respond with the updated notes
  res.json(updatedNotes);
});

app.listen(PORT, ()=> console.log(`APP listening on port ${PORT}`));