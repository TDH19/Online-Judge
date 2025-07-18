import errorHandler from "../utils/error.js";
import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import Problem from "../models/problem.model.js";
export const test = (req, res) => {
  res.json({
    message: "User route is working!",
  });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id != req.params.id)
    return next(errorHandler(401, "You can only update your own account!"));
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const {password, ...rest} = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async(req,res,next) => {
  if(req.user.id !== req.params.id){
    return next(errorHandler(401,"You can only delete your own account!"));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json({message : "User has been deleted successfully!"});
  } catch (error) {
    next(error);
  }
};

export const getUserProblems = async(req,res,next) => {
  if(req.user.id === req.params.id){
    try {
      const problems = await Problem.find({userRef: req.params.id});
      res.status(200).json(problems);
    } catch (error) {
      next(error);
    }
  }else{
    return next(errorHandler(401,"You can only view your own problems!"));
  }
  
};