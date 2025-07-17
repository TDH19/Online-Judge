import mongoose from "mongoose";
import User from "./models/user.model.js";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO;

async function addAvatarToExistingUser(){
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB");

        const result = await User.updateMany(
            {avatar : {$exists : false}},
            {$set : {avatar : "https://res.cloudinary.com/dxxzqzq9z/image/upload/v1721234567890/default-avatar.png"}}
        );

        console.log(`Updated ${result.modifiedCount} users`);
        
    } catch (error) {
        console.error("Error updating users:", error);
    } finally {
        mongoose.connection.close();
        console.log("Disconnected from MongoDB");
    }
}

addAvatarToExistingUser();