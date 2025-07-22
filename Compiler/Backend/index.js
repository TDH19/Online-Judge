import express from "express";
import generateFile from "./generateFile.js";
import executeCpp from "./executeCpp.js";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.listen(8000, () => {
  console.log("Server is running on port 8000!!!");
});

app.post("/run", async (req, res) => {
  const { language = "cpp", code } = req.body;
  if (code === undefined) {
    return res.status(400).json({
      success: false,
      message: "Code is required",
    });
  }
  try {
    const filePath = generateFile(language, code);
    const output = await executeCpp(filePath);
    res.json({ filePath , output});
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
