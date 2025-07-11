import { time } from "console";
import mongoose from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema({
  firstname:{
    type: String,
    required: true,
    },
  lastname:{
    type: String,
    required: true,
  },  
  username:{
    type: String,
    required: true,
    unique: true,
  },
  email:{
    type: String,
    required: true,
    unique: true,
  },
  password:{
    type: String,
    required: true,
   
  }
},{timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;

// This code defines a Mongoose schema for a User model in a MongoDB database.
// The schema includes fields for first name, last name, username, email, and password.
// Each field has validation requirements, such as being required or unique.
// The schema also includes timestamps to track when the user was created and last updated. 