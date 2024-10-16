import { Router } from "express";
const router = Router();

import ComicBookModel from "../../../db/models/ComicBookModel.js"

// Create comic book by id
router.post("/:id", async (req, res) => {
    const errors = [];
    const id = +req.params.id;

    // Check if id is a number, if not, return an error to client
    if (isNaN(id))
        return res.send({ status: "failed", message: "An invalid type for 'id' was provided, expected of type 'number'.", errors }).status(400);

    // Check if the book already exists under the specified id
    const existingBook = await ComicBookModel.findOne({ bookId: id });
    if (existingBook)
        return res.send({ status: "failed", message: "A book already exists for the specified id.", errors }).status(400);

    // Create and validate book data
    const book = new ComicBookModel(req.body);
    book.bookId = id;
    const error = await book.validate();

    // Handle validation errors
    if (error) {
        for (const [_, err] of Object.entries(error.errors)) {
            if (!err.properties.message)
                continue;
            errors.push(err.properties.message)
        }

        return res.send({ status: "failed", message: "An error occured while creating the comic book.", errors }).status(400)
    }

    // Attempt to save the book data to database, and handle any potential errors
    try {
        await book.save();
    } catch (err) {
        errors.push(err);
        return res.send({ status: "failed", message: "An error occured while saving the comic book to the database.", errors }).status(500);
    }

    // At the end everything was successful, send response to client
    res.send({ status: "success", timestamp: Date.now(), data: req.body, errors })
})

// Edit (Update) comic book by id
router.patch("/:id", async (req, res) => {
    const errors = [];
    const id = +req.params.id;

    // Check if id is a number, if not, return an error to client
    if (isNaN(id))
        return res.send({ status: "failed", message: "An invalid type for 'id' was provided, expected of type 'number'.", errors }).status(400);

    // Check if comic book exists under the specified id, if not, send an error to client
    const existingBook = await ComicBookModel.findOne({ bookId: id });
    if (!existingBook)
        return res.send({ status: "failed", message: "No book exists under the specified id.", errors }).status(400);

    // Update data, and handle type mismatches
    for (const [key, value] of Object.entries(req.body)) {
        // User provided an unknown key
        if (!existingBook[key]) {
            return res.send({ status: "failed", message: `The property '${key}' does not exist on the comic book data.`, errors });
        }

        // User provided an unknown value
        if (typeof (existingBook[key]) != typeof (value)) {
            return res.send({ status: "failed", message: `Invalid value type '${typeof (value)}' provided for property '${key}', expected '${typeof (existingBook[key])}`, errors }).status(400)
        }

        // Key and Value are validated, finally assign it to the book object
        existingBook[key] = value;
    }

    // Validate once again just to be sure
    await existingBook.validate();

    // Attempt to save data to database, and catch errors
    try {
        await existingBook.save();
    } catch (err) {
        errors.push(err);
        return res.send({ status: "failed", message: "An error occured while saving the comic book to the database.", errors }).status(500);
    }

    // All went well, saved data to database, send reponse to client
    res.send({ status: "success", timestamp: Date.now(), data: req.body, errors })
})

// Delete comic book by id
router.delete("/:id", async (req, res) => {
    const errors = [];
    const id = +req.params.id;

    // Check if id is a number, if not, return an error to client
    if (isNaN(id))
        return res.send({ status: "failed", message: "An invalid type for 'id' was provided, expected of type 'number'.", errors }).status(400);

    // Check if the book exists first, if not, send an error to the client
    const existingBook = await ComicBookModel.findOne({ bookId: req.params.id })
    if (!existingBook)
        return res.send({ status: "failed", message: "No book exists under the specified id.", errors }).status(400);

    // Attempt to delete the book from the database and catch errors
    try {
        await ComicBookModel.deleteOne({ bookId: req.params.id });
    } catch (err) {
        errors.push(err);
        return res.send({ status: "failed", message: "An error occured while deleting the comic book from the database.", errors }).status(500);
    }

    // All went well, saved data to database, send reponse to client
    res.send({ status: "success", timestamp: Date.now(), data: req.body, errors })
})

// Get comic book by id
router.get('/:id', async (req, res) => {
    const errors = [];
    const id = +req.params.id;

    // Check if id is a number, if not, return an error to client
    if (isNaN(id))
        return res.send({ status: "failed", message: "An invalid type for 'id' was provided, expected of type 'number'.", errors }).status(400);

    // Check if the book exists first, if not, send an error to the client
    let book = await ComicBookModel.findOne({ bookId: req.params.id });
    if (!book)
        return res.send({ status: "failed", message: "No comic book exists for the specified id.", errors }).status(404);

    // Book exists, send data to client
    res.send({ status: "success", timestamp: Date.now(), book, errors });
});

// Get all books from the database
router.get('/', async (req, res) => {
    const errors = []; // Not required, but added to keep consistency
    const books = await ComicBookModel.find();
    res.send({ status: "success", timestamp: Date.now(), books, errors });
});

export default router;
