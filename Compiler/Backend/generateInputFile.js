import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { v4} from "uuid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dirInputs = path.join(__dirname, "inputs");

if(!fs.existsSync(dirInputs)) {
    fs.mkdirSync(dirInputs, { recursive: true });
};


const generateInputFile = (input) => {
    const JobId = v4();
    const inputFileName = `${JobId}.txt`;
    const inputFilePath = path.join(dirInputs,inputFileName);
    fs.writeFileSync(inputFilePath,input);
    return inputFilePath;
};

export default generateInputFile;