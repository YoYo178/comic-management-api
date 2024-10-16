import { Router } from "express";
const router = Router();

import ComicBookModel from "../../../db/models/ComicBookModel.js"

// Create comic book by id
router.post("/:id", async (req, res) => {
    const errors = [];
    const id = +req.params.id;

    // Check if id is a number, if not, return an error to client
    if (isNaN(id))
        return res.send({ status: "failed", message: "An invalid type for 'id' was provided, expected of type 'number'." }).status(400);

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

// "/api/comic" route to check api status
router.get('/', (req, res) => {
    res.send({ status: "success", timestamp: Date.now() });
});

export default router;
