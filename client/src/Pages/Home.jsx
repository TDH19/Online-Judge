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
          
        </div>
      </section>
    </div>
  );
}
