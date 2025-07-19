import express from "express";
import { createProblem, deleteProblem,updateProblem , getProblem } from "../controllers/problem.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post('/create',verifyToken,createProblem);

router.delete('/delete/:id',verifyToken,deleteProblem);

router.post('/update/:id',verifyToken,updateProblem);

router.get('/get/:id',getProblem); // we have not used verifyToken here because we are not updating the problem

export default router;