import React, { useRef, useState } from "react";
import Editor from "@monaco-editor/react";

export default function EditorComponent() {
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
  try {
    const res = await fetch('/run',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        language: languageMap[language],
        code: code,
      })
    });
    const OutputData = await res.json();
    console.log(OutputData);
    setOutputData(OutputData);
  } catch (error) {
    console.log(error);
  }
 }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="shadow-lg p-2 mt-2 rounded-lg border-gray-300 flex flex-row items-center justify-between ">
        <div className="flex flex-row items-center">
          <p className="text-gray-900 text-xl font">Choose your language : </p>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="bg-emerald-600 text-white px-6 py-2 rounded-md shadow hover:bg-emerald-700 transition ml-3"
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
          height="50vh"
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
      
      <div className="flex justify-center items-center shadow-lg p-2 mt-2 rounded-lg border-gray-300 mb-10">
        <button onClick={handleCodeSubmit} className="bg-gradient-to-r from-emerald-500 to-emerald-700 text-white px-6 py-2 rounded-md shadow hover:opacity-80 transition ml-3">
          Submit
        </button>
      </div>
    </div>
  );
}
