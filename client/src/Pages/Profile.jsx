import React, { useState, useEffect, use } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase"; // Ensure you have firebase initialized in this file
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePercent, setFilePercent] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showProblemsError, setShowProblemsError] = useState(false);
  const [userProblems, setUserProblems] = useState([]);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = async (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercent(Math.round(progress));
        console.log(filePercent);
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  const handleShowProblems = async () => {
    try {
      setShowProblemsError(false);
      const res = await fetch(`/api/user/user-problems/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowProblemsError(true);
        return;
      }
      setUserProblems(data);
    } catch (error) {
      setShowProblemsError(true);
    }
  };

  const handleProblemDelete = async (Problemid) => {
    try {
      const res = await fetch(`/api/problem/delete/${Problemid}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if(data.success === false){
        console.log(data.message);
        return;
      }
      setUserProblems((prev) => prev.filter((problem) => problem._id !== Problemid));
      
    }catch(error){
      console.log(error.message);
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          className="hidden"
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          className=" rounded-full h-25 w-25 object-cover cursor-pointer self-center "
        />
        <p className="text-center">
          {fileUploadError ? (
            <span className="text-red-700 r">
              Error uploading image (image must be less than 2MB)
            </span>
          ) : filePercent > 0 && filePercent < 100 ? (
            <span className="text-slate-700">
              {`Uploading ${filePercent}%`}
            </span>
          ) : filePercent === 100 ? (
            <span className="text-green-700">Image successfully uploaded!</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="Username"
          defaultValue={currentUser.username}
          id="username"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          defaultValue={currentUser.email}
          id="email"
          className="border p-3 rounded-lg  "
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white rounded-lg hover:opacity-95 uppercase p-3 disabled:opacity-85"
        >
          {loading ? "Loading ..." : "Update"}
        </button>
        <Link
          className="bg-green-700  text-sky-50 text-center text-lg p-3 rounded-lg uppercase hover:opacity-95"
          to="/create-problem"
        >
          Create a problem
        </Link>
      </form>
      <div className="flex justify-between items-center mt-3">
        <span
          onClick={handleDeleteUser}
          className="text-red-700 cursor-pointer"
        >
          {" "}
          Delete Account
        </span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">
          {" "}
          Sign out
        </span>
      </div>
      <p className="text-red-700 mt-3">{error ? error : ""}</p>
      <p className="text-green-700 mt-3">
        {updateSuccess ? "Profile updated successfully" : ""}
      </p>
      <button
        onClick={handleShowProblems}
        className="text-green-700 cursor-pointer w-full text-lg"
      >
        Show problems authored by You
      </button>
      <p className="text-red-700 mt-3">
        {showProblemsError ? "Error showing problems" : ""}
      </p>
      {userProblems.length > 0 && (
        <div>
          <h1 className="text-2xl font-semibold  text-center my-5">Your Problems</h1>
          {userProblems.map((problem) => (
          <div
            key={problem._id}
            className="border p-2 rounded-lg my-3 flex justify-between items-center"
          >
            <Link
              to={`/problem/${problem._id}`}
              className="text-center font-semibold text-lg"
            >
              <p>{problem.title}</p>
            </Link>
            <div className="flex flex-col gap-2 items-center">
              <button onClick={() => handleProblemDelete(problem._id)} className=" text-red-700  px-3  cursor-pointer hover:bg-red-700 hover:text-white">
                Delete
              </button>
              <button className=" text-grey-300  px-3  cursor-pointer hover:bg-green-500 hover:text-white">
                Edit
              </button>
            </div>
                     </div>
         ))}
        </div>
      )}
    </div>
  );
}
