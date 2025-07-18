import React from "react";

export default function CreateProblem() {
  return (
    <main>
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a problem
      </h1>
      <form className="flex flex-col mx-auto max-w-lg gap-5 ">
        <input
          type="text"
          placeholder="Title"
          className="p-3 rounded-lg border"
          id="title"
          required
        />
        <textarea
          className="p-3 rounded-lg border h-32"
          rows={1} // ensures it's a single row, but can wrap
          placeholder="Describe your problem..."
          id="description"
          required
        />
        <textarea
          className="p-3 rounded-lg border h-32"
          rows={1} // ensures it's a single row, but can wrap
          placeholder="Sample input..."
          id="sampleInput"
          required
        />
        <textarea
          className="p-3 rounded-lg border h-32"
          rows={1} // ensures it's a single row, but can wrap
          placeholder="Sample output..."
          id="sampleOutput"
          required
        />
        <input
          type="text"
          placeholder="Category"
          className="p-3 rounded-lg border"
          id="category"
          required
        />
        <input
          type="text"
          placeholder="Difficulty"
          className="p-3 rounded-lg border"
          id="difficulty"
          required
        />
        <input
          type="text"
          placeholder="Author"
          className="p-3 rounded-lg border"
          id="userRef"
          required
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
          Create Problem
        </button>
      </form>
    </main>
  );
}
