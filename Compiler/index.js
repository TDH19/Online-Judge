import express from "express";
import generateFile from "./generateFile.js";
import executeCpp from "./executeCpp.js";
import generateInputFile from "./generateInputFile.js";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.listen(8000, '0.0.0.0' , () => {
  console.log("Server is running on port 8000!!!");
});

app.post("/run", async (req, res) => {
  console.log("BODY RECEIVED:", req.body);
  const { language = "cpp", code , input } = req.body;
  if (code === undefined) {
    return res.status(400).json({
      success: false,
      message: "Code is required",
    });
  }
  try {
    const filePath = generateFile(language, code);
    const inputFilePath = generateInputFile(input);
    const output = await executeCpp(filePath,inputFilePath);
    res.json({ filePath ,inputFilePath, output});
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.get("/", (req, res) => {
  res.send("Hello World");
});
