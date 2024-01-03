const express = require("express")
const path = require("path")
const dbFile = require('./db/db.json')

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

const PORT = process.env.PORT || 3001;

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);


app.listen(PORT, ()=> console.log(`APP listening on port ${PORT}`));