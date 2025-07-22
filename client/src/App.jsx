import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Header from "./Components/Header";
import PrivateRoute from "./Components/PrivateRoute.jsx";
import CreateProblem from "./Pages/Create-Problem.jsx";
import UpdateProblem from "./Pages/Update-problem.jsx";
import Problems from "./Pages/Problems.jsx";
import ProblemID from "./Pages/ProblemID.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/home" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/problems" element={<Problems />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-problem" element={<CreateProblem />} />
          <Route path="/update-problem/:problemId" element={<UpdateProblem />} />
        </Route>
        <Route path="/problems/:problemId" element={<ProblemID />} />
        
      </Routes>
    </BrowserRouter>
  );
}
