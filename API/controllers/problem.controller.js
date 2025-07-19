import  Problem  from "../models/problem.model.js";

export const createProblem = async (req,res,next) => {
  try {
    const problem = await Problem.create(req.body);
    return res.status(201).json({problem});
  } catch (error) {
    next(error);
  }
};
