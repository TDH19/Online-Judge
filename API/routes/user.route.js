import express from 'express';
import { test } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/test', test);

export default router;

// This code defines a simple Express router for the user route.
// It exports a GET endpoint that responds with a JSON message indicating that the user route is working.
// This can be used to test if the user route is set up correctly in the application.