import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import errorHandler from "../utils/error.js";
import jwt from "jsonwebtoken";


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

export const signin = async (req,res,next) =>{
    const {username,password} = req.body;
    try {
        const validUser = await User.findOne({ username });
        if (!validUser) next(errorHandler(404, "User not found!"));
        const isPasswordValid = bcrypt.compareSync(password, validUser.password);
        if (!isPasswordValid) next(errorHandler(401, "Invalid password!"));
        const token = jwt.sign({id : validUser._id}, process.env.JWT_SECRET);
        const {password:pass, ...rest} = validUser._doc; // Exclude password from response
        res.cookie("access_token", token, {httpOnly: true, secure: true, expires: new Date(Date.now() + 24*60*60*1000)}).status(200).json(rest); // 1 hour expiration
    } catch (error) {
        next(error);
    }
};