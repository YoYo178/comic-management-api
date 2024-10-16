import { model, Schema, Error } from "mongoose";

const { ValidataionError } = Error

const ComicBook = new Schema({
    bookId: { type: Number, required: true },
    bookName: { type: String, required: true },
    authorName: { type: String, required: true, },
    publishedYear: { type: Number, required: true },
    price: { type: String, required: true },
    discount: { type: String, required: false },
    numberOfPages: { type: Number, required: true },
    condition: { type: String, enum: ["new", "used"], required: true },
    description: { type: String, required: false },
})

export default model("comicBooks", ComicBook);