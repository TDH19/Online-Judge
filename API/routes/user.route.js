import express from 'express';
import { deleteUser, test, updateUser, getUserProblems } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test', test);

router.post('/update/:id',verifyToken, updateUser);

router.delete('/delete/:id',verifyToken, deleteUser);

router.get('/user-problems/:id',verifyToken, getUserProblems);



export default router;

// This code defines a simple Express router for the user route.
// It exports a GET endpoint that responds with a JSON message indicating that the user route is working.
// This can be used to test if the user route is set up correctly in the application.