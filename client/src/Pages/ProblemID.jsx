import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import EditorComponent from "../Components/EditorComponent.jsx";

export default function ProblemID() {
  const params = useParams();
  const problemId = params.problemId;
  const [problem, setProblem] = useState(null);
  const getProblem = async () => {
    try {
      const res = await fetch(`/api/problem/get/${problemId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setProblem(data.problem);
      console.log(problem);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProblem();
  }, [problemId]);
  console.log(problem);
  return (
    <div className="ml-20 mr-20 mt-10 ">
      {problem && (
        <div className="shadow-lg p-4 rounded-lg border-gray-300">
          <h1 className="text-2xl font-semibold text-center mb-4">
            {problem.title}
          </h1>
          <div className="mb-4">
            <ul className="flex flex-row gap-4 justify-center">
              <Link
                to={`/problems/${problem._id}/submit`}
                className="text-gray-900 text-sm font-semibold hover:bg-emerald-300 p-1 rounded-md"
              >
                Submit
              </Link>
              <Link
                to={`/problems/${problem._id}/submissions`}
                className="text-gray-900 text-sm font-semibold hover:bg-emerald-300 p-1 rounded-md"
              >
                Submissions
              </Link>
              <Link
                to={`/problems/${problem._id}/editorial`}
                className="text-gray-900 text-sm font-semibold hover:bg-emerald-300 p-1 rounded-md"
              >
                Editorial
              </Link>
              <Link
                to={`/problems/${problem._id}/discussion`}
                className="text-gray-900 text-sm font-semibold hover:bg-emerald-300 p-1 rounded-md"
              >
                Discussion
              </Link>
            </ul>
          </div>
          <p className="text-gray-900 text-xl mb-4"> {problem.description}</p>
          <p className="text-gray-900 mb-4">
            <span className="font-semibold">Sample Input : </span>
            {problem.sampleInput} <br />
          </p>
          <p className="text-gray-900 mb-4">
            <span className="font-semibold">Sample Output : </span>
            {problem.sampleOutput}
          </p>
        </div>
      )}
      <div className="  rounded-lg border-gray-300">
        <EditorComponent />
      </div>
      
    </div>
  );
}
