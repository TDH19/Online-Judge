import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CreateProblem() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    sampleInput: "",
    sampleOutput: "",
    difficulty: "",
    category: "",
    testCases: [], // <-- added test cases array
  });

  const [testCase, setTestCase] = useState({ input: "", expectedOutput: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleTestCaseChange = (e) => {
    setTestCase({ ...testCase, [e.target.name]: e.target.value });
  };

  const addTestCase = () => {
    if (!testCase.input.trim() || !testCase.expectedOutput.trim()) return;
    setFormData({
      ...formData,
      testCases: [...formData.testCases, testCase],
    });
    setTestCase({ input: "", expectedOutput: "" }); // reset fields
  };

  const removeTestCase = (index) => {
    const updated = [...formData.testCases];
    updated.splice(index, 1);
    setFormData({ ...formData, testCases: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/problem/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });

      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
        return;
      }
      navigate(`/problems/${data.problem._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main>
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Problem
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col mx-auto max-w-lg gap-5"
      >
        <input
          type="text"
          placeholder="Title"
          className="p-3 rounded-lg border"
          id="title"
          required
          onChange={handleChange}
          value={formData.title}
        />
        <textarea
          className="p-3 rounded-lg border h-32"
          placeholder="Describe your problem..."
          id="description"
          required
          onChange={handleChange}
          value={formData.description}
        />
        <textarea
          className="p-3 rounded-lg border h-24"
          placeholder="Sample input..."
          id="sampleInput"
          required
          onChange={handleChange}
          value={formData.sampleInput}
        />
        <textarea
          className="p-3 rounded-lg border h-24"
          placeholder="Sample output..."
          id="sampleOutput"
          required
          onChange={handleChange}
          value={formData.sampleOutput}
        />
        <input
          type="text"
          placeholder="Category"
          className="p-3 rounded-lg border"
          id="category"
          required
          onChange={handleChange}
          value={formData.category}
        />
        <input
          type="text"
          placeholder="Difficulty"
          className="p-3 rounded-lg border"
          id="difficulty"
          required
          onChange={handleChange}
          value={formData.difficulty}
        />

        {/* --- Test Case Section --- */}
        <div className="border p-3 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Test Cases</h2>
          <div className="flex flex-col gap-2">
            <textarea
              name="input"
              placeholder="Test case input"
              className="p-2 border rounded"
              value={testCase.input}
              onChange={handleTestCaseChange}
            />
            <textarea
              name="expectedOutput"
              placeholder="Expected output"
              className="p-2 border rounded"
              value={testCase.expectedOutput}
              onChange={handleTestCaseChange}
            />
            <button
              type="button"
              onClick={addTestCase}
              className="bg-green-600 text-white rounded px-3 py-2 w-fit"
            >
              + Add Test Case
            </button>
          </div>

          {/* Display all added test cases */}
          {formData.testCases.length > 0 && (
            <ul className="mt-4 space-y-2">
              {formData.testCases.map((tc, index) => (
                <li key={index} className="border p-2 rounded relative">
                  <p>
                    <b>Input:</b> {tc.input}
                  </p>
                  <p>
                    <b>Output:</b> {tc.expectedOutput}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeTestCase(index)}
                    className="absolute top-2 right-2 text-red-600"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
        >
          {loading ? "Creating..." : "Create Problem"}
        </button>
        {error && <p className="text-red-700 text-sm">{error}</p>}
      </form>
    </main>
  );
}
