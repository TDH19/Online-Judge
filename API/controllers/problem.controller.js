import  Problem  from "../models/problem.model.js";
import errorHandler from "../utils/error.js";

export const createProblem = async (req,res,next) => {
  try {
    const problem = await Problem.create(req.body);
    return res.status(201).json({problem});
  } catch (error) {
    next(error);
  }
};

export const deleteProblem = async (req,res,next) => {
  const problem = await Problem.findById(req.params.id);
  if(!problem){
    return next(errorHandler(404,"Problem not found"));
  };
  if(req.user.id !== problem.userRef.toString()){
    return next(errorHandler(401,"You can only delete your own problems"));
  };
  try {
    await Problem.findByIdAndDelete(req.params.id);
    return res.status(200).json({message:"Problem deleted successfully"});
  } catch (error) {
    next(error);
  }
};

export const updateProblem = async (req,res,next) => {
  const problem = await Problem.findById(req.params.id);
  if(!problem){
    return next(errorHandler(404,"Problem not found"));
  };
  if(req.user.id !== problem.userRef){
    return next(errorHandler(401,"You can only update your own problems"));
  };
  try {
    const updatedProblem = await Problem.findByIdAndUpdate(req.params.id,req.body,{new:true});
    
    return res.status(200).json({updatedProblem});
  } catch (error) {
    next(error);
  }
}

export const getProblem = async (req,res,next) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if(!problem){
     return next(errorHandler(404,"Problem not found"));
    }
    return res.status(200).json({problem});
  } catch (error) {
    next(error);
  }
}
