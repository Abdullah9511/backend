const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Notes");
const router = express.Router();
const { body, validationResult } = require("express-validator");

// ROUTE 1 : Fetch all notes using : GET "api/notes/getuser". Login required

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error");
  }
});

// ROUTE 1 : Add a note using : POST "api/notes/addnote". Login required

router.get(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Password should be atleat 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //If there are any errors , Return bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server Error");
    }
  }
);

module.exports = router;
