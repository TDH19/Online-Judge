import React from "react";
import { FaSearch } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  // Access the current user from the Redux store
  const currentUser = useSelector((state) => state.user);

  // If currentUser is null, it means the user is not signed in
  return (
    <header className=" shadow-md flex justify-between items-center px-7 py-3 mx-auto ">
      <div>
        <h1 className="text-xl  pl-4 text-gray-900 font-semibold">CodeClash</h1>
      </div>
      <div className="flex items-center gap-1">
        <input type="text" placeholder="Search..." className="border-2 border-gray-300 rounded-lg w-35 px-1 py-1 focus:outline-none" />
        <FaSearch />
      </div>
      <div className="">
        <ul className="hidden md:flex items-center gap-5 font-semibold text-sm">
          <Link to="/problems" className="hover:text-emerald-500 rounded-md">
          Problems
          </Link>
          <Link to="/contests" className="hover:text-emerald-500 rounded-md">
          Contests
          </Link>

          <Link to="/leaderboard" className="hover:text-emerald-500 rounded-md">
          Leaderboard
          </Link>

          <Link to="/discuss" className="hover:text-emerald-500 rounded-md">
          Discuss
          </Link>

          <Link to="/profile" className="hover:text-emerald-500 rounded-md">
          Profile
          </Link>


        </ul>
      </div>
      <div>
        <ul className="flex items-center gap-5 font-medium text-sm">
          <Link to="/signin" className="hover:text-emerald-500 rounded-md"  >
          Sign In
          </Link>
          <Link to="/signup" className="bg-emerald-500 px-4 py-2 rounded-md hover:text-white">
          Sign Up
          </Link>
        </ul>
        

        </div>    




    </header>
  );
}
