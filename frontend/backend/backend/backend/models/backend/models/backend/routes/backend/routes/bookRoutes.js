const express = require("express");
const axios = require("axios");
const Book = require("../models/Book");

const router = express.Router();

// Fetch book from Google API
router.get("/fetch/:isbn", async (req, res) => {
  try {
    const r = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${req.params.isbn}`
    );

    if (!r.data.items) return res.json({ error: "Book not found" });

    const b = r.data.items[0].volumeInfo;

    res.json({
      title: b.title,
      author: b.authors?.[0],
      image: b.imageLinks?.thumbnail,
      isbn: req.params.isbn
    });
  } catch {
    res.json({ error: "API error" });
  }
});

// Add book
router.post("/add", async (req, res) => {
  const book = await Book.create(req.body);
  res.json(book);
});

// Get all books
router.get("/", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

module.exports = router;
