import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";


export const signup = async (req,res,next) =>{
    const {firstname, lastname,username, email, password} = req.body;
    const hashedPassword =  bcrypt.hashSync(password, 10);
    const newUser = new User({firstname, lastname, username, email, password: hashedPassword});
    
    try{
        await newUser.save();
    console.log("User created successfully", newUser);
    res.status(201).json({
        message: "User created successfully",
        
});
    }catch(error){
        next(error);
    }
};

