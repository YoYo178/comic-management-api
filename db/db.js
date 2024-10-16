import mongoose from "mongoose";

// The MongoDB URL to connect to
const uri = "mongodb+srv://comicproject:comicsmanager@comics-db.nlf04.mongodb.net/?retryWrites=true&w=majority&appName=comics-db";

try {
    // Try to connect to database
    await mongoose.connect(uri);
    console.log("[MongoDB] Connected to database successfully.");
} catch (err) {
    // An error occured
    console.error("[MongoDB] There was an error connecting to the database!");
    console.error(err);
}