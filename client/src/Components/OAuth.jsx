import React from 'react'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice.js';
import {useNavigate} from 'react-router-dom';

// This component handles OAuth sign-in with Google.
// It uses Firebase Authentication to sign in the user and then dispatches the user data to the Redux store.

export default function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleClick = async () => {

        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);
            
            const res = await fetch('/api/auth/google',{
                method : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username : res.user.displayName, email: res.user.email, photo: res.user.photoURL }),
            });

            const data = await res.json();
            dispatch(signInSuccess(data));
            navigate('/home');
            
        } catch (error) {
            console.log('Could not sign in with Google',error);
        }

    }

  return (
    <button onClick={handleGoogleClick} type='button' className='bg-red-700 rounded-lg text-sky-50 p-2 hover: cursor-pointer uppercase hover:opacity-85'>Continue with Google</button>
  )
}
