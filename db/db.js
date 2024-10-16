import mongoose from "mongoose";

const uri = "mongodb+srv://comicproject:comicsmanager@comics-db.nlf04.mongodb.net/?retryWrites=true&w=majority&appName=comics-db";

try {
    await mongoose.connect(uri);
    console.log("[MongoDB] Connected to database successfully.");
} catch (err) {
    console.error("[MongoDB] There was an error connecting to the database!");
    console.error(err);
}