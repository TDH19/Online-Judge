import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { fileURLToPath } from "url";
import { v4 } from "uuid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = async (filePath) => {
    const jobId = path.basename(filePath).split(".")[0];
    const outputFileName = `${jobId}.exe`;
    const outPath = path.join(outputPath, outputFileName);

    if (!fs.existsSync(filePath)) {
        throw new Error(`Source file does not exist: ${filePath}`);
    }

    // Step 1: Compile with flags to force console entry point
    const compileCommand = `g++  "${filePath}" -o "${outPath}"  `;
    // Step 2: Run (using cmd /c for Windows compatibility)
    const runCommand = `cmd /c "${outPath}"`;

    return new Promise((resolve, reject) => {
        exec(compileCommand, (compileError, compileStdout, compileStderr) => {
            if (compileError) {
                console.log(compileError);
                console.log(compileStderr);
                return reject({ error: compileError, stderr: compileStderr });
            }
            // Only run if compilation succeeded
            exec(runCommand, (runError, runStdout, runStderr) => {
                if (runError) {
                    console.log(runError);
                    console.log(runStderr);
                    return reject({ error: runError, stderr: runStderr });
                }
                resolve(runStdout);
            });
        });
    });
};

export default executeCpp;