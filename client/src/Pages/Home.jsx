import React from "react";
import { FaChevronRight, FaIdBadge } from "react-icons/fa";

export default function Home() {
  return (
    <div>
      {/* hero section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-emerald-50 via-white to-teal-50  ">
        <div className="flex flex-row items-center justify-around">
          <div>
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center space-y-8 ml-10">
              <div className="space-y-4">
                <p className="bg-emerald-100 text-emerald-800 rounded-full px-4 py-2 max-w-sm">
                  🚀 Join 100K+ Competitive Programmers
                </p>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
                  Master Competetive{" "}
                </h1>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-emerald-500">
                  Programming
                </h1>
                <p className="text-2xl text-gray-600 max-w-2xl">
                  Solve challenging problems, compete in contests, and climb the
                  global leaderboard. Perfect your algorithmic thinking with our
                  comprehensive online judge platform.
                </p>
              </div>
            </div>
            <div className="flex flex-row sm:flex-row gap-4  mt-10 ml-10 text-md">
              <button className="bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded-md text-white font-medium">
                Start Solving Problems
              </button>
              <button className="bg-white border-gray-400 shadow-lg hover:bg-emerald-100 px-4 py-2 rounded-md font-medium">
                View Contests
              </button>
            </div>
            <div className="flex items-center space-x-8 pt-4 ml-10">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">2,500+</div>
                <div className="text-sm text-gray-600">Problems</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">150+</div>
                <div className="text-sm text-gray-600">Contests</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">100K+</div>
                <div className="text-sm text-gray-600">Users</div>
              </div>
            </div>
          </div>
          <div>
            <div className="w-full h-full bg-black mr-10 ">
            <div className="bg-gray-900 rounded-lg p-6 shadow-2xl">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="font-mono text-sm ">
                    <div className="text-purple-400">def</div>
                    <div className="text-blue-400 ml-4">solve_problem():</div>
                    <div className="text-gray-300 ml-8">{"# Your solution here"}</div>
                    <div className="text-green-400 ml-8">return optimal_answer</div>
                    <div className="text-gray-500 mt-4">{"> Status: Accepted ✓"}</div>
                    <div className="text-gray-500">{"> Runtime: 0.1s"}</div>
                    <div className="text-gray-500">{"> Memory: 14.2MB"}</div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
