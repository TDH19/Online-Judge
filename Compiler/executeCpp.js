import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = async (filePath, inputFilePath) => {
    const jobId = path.basename(filePath).split(".")[0];
    const outputFileName = `${jobId}${process.platform === "win32" ? ".exe" : ".out"}`;
    const outPath = path.join(outputPath, outputFileName);

    if (!fs.existsSync(filePath)) {
        throw new Error(`Source file does not exist: ${filePath}`);
    }

    const compileCommand = `g++ "${filePath}" -o "${outPath}"`;
    const isWindows = process.platform === "win32";

    const runCommand = inputFilePath
        ? `${isWindows ? outPath : `"${outPath}"`} < "${inputFilePath}"`
        : `${isWindows ? outPath : `"${outPath}"`}`;

    return new Promise((resolve, reject) => {
        exec(compileCommand, (compileError, _, compileStderr) => {
            if (compileError) {
                return reject({ error: compileError, stderr: compileStderr });
            }

            exec(runCommand, (runError, runStdout, runStderr) => {
                if (runError) {
                    return reject({ error: runError, stderr: runStderr });
                }
                resolve(runStdout);
            });
        });
    });
};

export default executeCpp;
