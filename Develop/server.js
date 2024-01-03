const express = require("express")
const path = require("path")
const { readFromFile, readAndAppend } = require('./helper/fsUtils');

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

app.listen(PORT, ()=> console.log(`APP listening on port ${PORT}`));