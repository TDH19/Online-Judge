import express from "express";
import { createProblem, deleteProblem } from "../controllers/problem.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post('/create',verifyToken,createProblem);

router.delete('/delete/:id',verifyToken,deleteProblem);

export default router;