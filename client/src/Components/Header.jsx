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
    <header className="bg-sky-950 shadow-md ">
      <div className="flex  justify-between items-center px-4 py-4 ">
        <Link to="/home">
          <h1 className="  flex-wrap text-[18px] ml-10 ">
            <span className="text-slate-50 font-['poppins']-extrabold">
              CodeClash
            </span>
          </h1>
        </Link>
        <form className="bg-slate-50 rounded-full  flex items-center p-1  ">
          <input
            type="text"
            placeholder="Search.."
            className="bg-transparent pl-[7px] focus:outline-none w-24 sm:w-40"
          />
          <FaSearch className="text-slate-600 pr-[2px] "></FaSearch>
        </form>
        <ul className="flex text-[18px] gap-10 pr-[20px] font-['poppins']-extrabold text-slate-50 items-center ">
          <Link to="/home">
            {" "}
            <li className="hover:text-sky-600">Home</li>
          </Link>

          <Link to="/problems">
            <li className="hover:text-sky-300">Problems</li>
          </Link>
          <Link to="/Contests">
            <li className="hover:text-sky-300">Contests</li>
          </Link>
          <Link to="/Leaderboard">
            <li className="hover:text-sky-300">Leaderboard</li>
          </Link>
          <Link to="/signin">
            <li className="hover:text-sky-300">Sign In</li>
          </Link>
          <Link to="/profile">
            <FaUserAlt className="text-sky-50 pl-[4px] mr-[20px] text-[22px] hover:text-sky-300" />
          </Link>
        </ul>
      </div>
    </header>
  );
}
