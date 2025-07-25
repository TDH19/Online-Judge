import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateProblem() {
  const navigate = useNavigate();
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    sampleInput: "",
    sampleOutput: "",
    difficulty: "",
    category: "",
    testCases: [],
  });

  const [newTestCase, setNewTestCase] = useState({ input: "", expectedOutput: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!params.problemId) {
      setError("Problem ID is missing");
      return;
    }

    const fetchProblem = async () => {
      try {
        const res = await fetch(`/api/problem/get/${params.problemId}`);
        const data = await res.json();

        if (data.success === false) {
          setError(data.message);
          return;
        }

        if (data.problem) {
          // Ensure testCases exists
          setFormData({
            ...data.problem,
            testCases: data.problem.testCases || [],
          });
        } else {
          setError("Problem not found");
        }
      } catch (error) {
        setError(error.message);
      }
    };
    fetchProblem();
  }, [params.problemId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleTestCaseChange = (e, index) => {
    const updatedTestCases = [...formData.testCases];
    updatedTestCases[index][e.target.name] = e.target.value;
    setFormData({ ...formData, testCases: updatedTestCases });
  };

  const handleNewTestCaseChange = (e) => {
    setNewTestCase({ ...newTestCase, [e.target.name]: e.target.value });
  };

  const addTestCase = () => {
    if (!newTestCase.input.trim() || !newTestCase.expectedOutput.trim()) return;
    setFormData({
      ...formData,
      testCases: [...formData.testCases, newTestCase],
    });
    setNewTestCase({ input: "", expectedOutput: "" });
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
      const res = await fetch(`/api/problem/update/${params.problemId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);

      if (data.success === false) {
        setError(data.message);
        return;
      }

      navigate(`/problems/${params.problemId}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main>
      <h1 className="text-3xl font-semibold text-center my-7">
        Edit your problem
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col mx-auto max-w-lg gap-5"
      >
        {error && <p className="text-red-700 text-sm">{error}</p>}
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

        {/* Test Cases Section */}
        <div className="border p-3 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Test Cases</h2>

          {/* Existing test cases */}
          {formData.testCases.map((tc, index) => (
            <div key={index} className="border p-2 rounded mb-2 relative">
              <textarea
                name="input"
                placeholder="Test input"
                className="p-2 border rounded w-full mb-1"
                value={tc.input}
                onChange={(e) => handleTestCaseChange(e, index)}
              />
              <textarea
                name="expectedOutput"
                placeholder="Expected output"
                className="p-2 border rounded w-full"
                value={tc.expectedOutput}
                onChange={(e) => handleTestCaseChange(e, index)}
              />
              <button
                type="button"
                onClick={() => removeTestCase(index)}
                className="absolute top-2 right-2 text-red-600"
              >
                ✕
              </button>
            </div>
          ))}

          {/* New test case input */}
          <div className="mt-4 flex flex-col gap-2">
            <textarea
              name="input"
              placeholder="New test case input"
              className="p-2 border rounded"
              value={newTestCase.input}
              onChange={handleNewTestCaseChange}
            />
            <textarea
              name="expectedOutput"
              placeholder="New expected output"
              className="p-2 border rounded"
              value={newTestCase.expectedOutput}
              onChange={handleNewTestCaseChange}
            />
            <button
              type="button"
              onClick={addTestCase}
              className="bg-green-600 text-white rounded px-3 py-2 w-fit"
            >
              + Add Test Case
            </button>
          </div>
        </div>

        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
        >
          {loading ? "Updating..." : "Update Problem"}
        </button>
      </form>
    </main>
  );
}