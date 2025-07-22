import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Problems() {
  const [problems, setProblems] = useState([]);
  const getAllProblems = async () => {
    try {
      const res = await fetch("/api/problem/get-all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      setProblems(data.problems);
      console.log(problems);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllProblems();
  }, []);
  return (
    <div className="ml-20 mr-20 mt-10">
      <table className="min-w-full bg-white ">
        <tbody>
          <tr>
            <th className="py-2 px-4 border-2 border-gray-300">Name</th>
            <th className="py-2 px-4 border-2 border-gray-300">Category</th>
            <th className="py-2 px-4 border-2 border-gray-300">Difficulty</th>
          </tr>
          {problems.map((problem) => (
            <tr key={problem.id}>
              <td className="py-2 px-4 border-2 border-gray-300 text-center">
                <Link to={`/problems/${problem.id}`}
                  className="text-gray-900 hover:text-emerald-500 font-semibold"
                >
                  {problem.title}
                </Link>
              </td>
                  <td className="py-2 px-4 border-2 border-gray-300 text-center ">
                  <span className="bg-gray-200 rounded px-2 py-1 text-xs mr-1 text-gray-900 font-semibold"> {problem.category}</span>
                </td>
                <td className="py-2 px-4 border-2 border-gray-300 text-center">
                  <span className="bg-gray-200 rounded px-2 py-1 text-xs mr-1 text-gray-900 font-semibold"> {problem.difficulty}</span>
                </td>
                
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
