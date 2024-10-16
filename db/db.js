import mongoose from "mongoose";
import config from "../config.json" with { type: "json" };

try {
    // Try to connect to database
    await mongoose.connect(config.MONGODB_URL);
    console.log("[MongoDB] Connected to database successfully.");
} catch (err) {
    // An error occured
    console.error("[MongoDB] There was an error connecting to the database!");
    console.error(err);
}