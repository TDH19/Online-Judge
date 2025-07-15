import React from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase.js"; // Ensure you have imported your Firebase app
import { useDispatch } from "react-redux";
import { signInSuccess, signInFailure } from "../redux/user/userSlice.js";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app); // Ensure you have imported and initialized Firebase auth

      const result = await signInWithPopup(auth, provider);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate("/home");
    } catch (error) {
      console.log("Error during Google sign-in:", error);
    }
  };
  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="bg-red-700 text-sky-50 p-2 rounded-lg uppercase hover:opacity-85"
    >
      Continue with google
    </button>
  );
}
