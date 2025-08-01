import React, { useRef, useState } from "react";
import Editor from "@monaco-editor/react";

import { useSelector } from "react-redux";
export default function EditorComponent({ problem }) {
  const [verdict, setVerdict] = useState("");
  const verdicts = [];
  const [userSampleOutput, setUserSampleOutput] = useState("");
  const currentUser = useSelector((state) => state.user.currentUser);
  const [nullUserError, setnullUserError] = useState(false);
  const editorRef = useRef(null);
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("C++");
  const [showDropdown, setShowDropdown] = useState(false);
  const [OutputData, setOutputData] = useState(null);
  const languageMap = {
    "C++": "cpp",
    Java: "java",
    Python: "python",
    JavaScript: "javascript",
  };
  console.log(code);
  console.log(languageMap[language]);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const handleSelect = (lang) => {
    setLanguage(lang);
    setShowDropdown(false);
  };

  const handleCodeSubmit = async () => {
    if (!currentUser) {
      setnullUserError(true);
      return;
    }
    try {
      setnullUserError(false);
      for (const testCase of problem.testCases) {
        const res = await fetch("/api/run", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            language: languageMap[language],
            code: code,
            input: testCase.input,
          }),
        });
        const testData = await res.json();
        console.log(testData);
        const normalizedExpected = (testCase.expectedOutput || "").trim();
        const normalizedActual = (testData.output || "").trim();

        if (normalizedActual === normalizedExpected) {
          verdicts.push("Accepted");
        } else {
          verdicts.push("Wrong Answer");
        }
      }
      for (let i = 0; i < verdicts.length; i++) {
        if (verdicts[i] === "Wrong Answer") {
          setVerdict("Wrong Answer for test case " + (i + 1));
          break;
        } else {
          setVerdict("Accepted");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="shadow-lg p-2 mt-2 rounded-lg border-gray-300 flex flex-row items-center justify-between ">
        <div className="flex flex-row items-center">
          <p className="text-gray-900 text-sm font">Choose your language : </p>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="bg-emerald-600 text-white px-4 py-1 rounded-md shadow hover:bg-emerald-700 transition ml-3 text-sm"
          >
            {language}
          </button>
          {showDropdown && (
            <ul className="absolute mt-2 w-48 bg-white border rounded shadow z-10">
              {Object.keys(languageMap).map((lang) => (
                <li
                  key={lang}
                  onClick={() => handleSelect(lang)}
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                >
                  {lang}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="shadow-lg p-2 mt-2rounded-lg border-gray-300">
        <Editor
          height="30vh"
          language={languageMap[language]}
          value={code}
          onChange={(value) => setCode(value)}
          onMount={onMount}
          theme="vs-light"
          align="center"
          options={{
            fontSize: 14,
            fontFamily: "JetBrains Mono",
            fontWeight: "semibold",
            lineHeight: 1.5,
            letterSpacing: 0.5,
          }}
        />
      </div>

      {OutputData && (
        <div className="shadow-lg p-2 mt-2 rounded-lg border-gray-300">
          <p className="text-gray-900 text-xl font">{OutputData.output}</p>
        </div>
      )}
      {nullUserError && (
        <div className="text-red-500 text-center mt-2">
          You need to sign in first
        </div>
      )}
      {verdict && (
        <div className="text-gray-900 text-sm font text-center mt-2 shadow-lg p-2 rounded-lg border-gray-300">
          {verdict !== "Accepted" ? (
            <p className="text-red-500">{verdict}</p>
          ) : (
            <p className="text-green-500">{verdict}</p>
          )}
        </div>
      )}
      <div className="flex justify-center items-center shadow-lg p-2 mt-2 rounded-lg border-gray-300 mb-10">
        <button
          onClick={handleCodeSubmit}
          className="bg-gradient-to-r from-emerald-500 to-emerald-700 text-white px-3 py-1 rounded-md shadow hover:opacity-80 transition ml-3"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
