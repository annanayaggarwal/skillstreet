const express = require('express');
const { check, validationResult } = require('express-validator');
const Note = require('../models/note');

const router = express.Router();

// Create Note
router.post('/', [
  check('title').notEmpty().withMessage('Title is required').isLength({ max: 255 }),
  check('content').notEmpty().withMessage('Content is required'),
], async (req, res) => {
  try {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, content } = req.body;

    // Create a new note
    const newNote = new Note({ title, content });
    await newNote.save();

    res.status(201).json(newNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Retrieve Notes
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.status(200).json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update Note
router.put('/:id', [
  check('title').notEmpty().withMessage('Title is required').isLength({ max: 255 }),
  check('content').notEmpty().withMessage('Content is required'),
], async (req, res) => {
  try {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, content } = req.body;

    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content, updatedAt: Date.now() },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.status(200).json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete Note
router.delete('/:id', async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
