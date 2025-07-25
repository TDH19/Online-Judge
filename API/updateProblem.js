import mongoose from "mongoose";
import Problem from "./models/problem.model.js";
import dotenv from "dotenv";
dotenv.config();



async function addTestCasesField() {
  console.log("MONGO URI:", process.env.MONGO); // Add this line
  await mongoose.connect(process.env.MONGO);
  console.log("Connected to MongoDB");
  // Add testCases: [] to all problems that don't have it
  const result = await Problem.updateMany(
    { testCases: { $exists: false } },
    { $set: { testCases: [{input:"sampleInput",expectedOutput:"sampleOutput"}] } }
  );

  console.log(`Updated ${result.modifiedCount} documents.`);
  await mongoose.disconnect();
}

addTestCasesField();