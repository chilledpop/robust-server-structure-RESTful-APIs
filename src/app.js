const express = require("express");
const app = express();

const notes = require("./data/notes-data");
app.use(express.json());

app.get("/notes/:noteId", (req, res) => {
  const noteId = Number(req.params.noteId);
  const foundNote = notes.find((note) => note.id === noteId);
  
  if (foundNote) {
    res.json({ data: foundNote }); 
  } else {
    res.status(400).send(`Note id not found: ${noteId}`);
  }
});

app.get("/notes", (req, res) => {
  res.json({ data: notes });
});

// TODO: Add ability to create a new note

let lastNoteId = notes.reduce((maxId, note) => Math.max(maxId, note.id), 0)

app.post("/notes", (req, res) => {
  const { data: { text } = {} } = req.body;
  if (text) {
    const newNote = {
      id: ++lastNoteId,
      text,
    };
    notes.push(newNote);
    res.status(201).json({ data: newNote});
  } else {
    res.sendStatus(400);
  }
})

// TODO: Add not-found handler

app.use((req, res, next) => {
  res.status(400).send(`Not found: ${req.originalUrl}`);
})

// TODO: Add error handler

app.use((err, req, res, next) => {
  res.sendStatus(400);
})

module.exports = app;