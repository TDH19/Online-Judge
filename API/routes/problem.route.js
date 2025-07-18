import express from "express";
import { createProblem } from "../controllers/problem.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post('/create',verifyToken,createProblem);

export default router;