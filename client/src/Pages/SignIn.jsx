import React, {  useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { signInFailure,signInStart,signInSuccess } from '../redux/user/userSlice.js';
import OAuth from '../Components/OAuth.jsx';


export default function SignIn() {
  const[formData, setFormData] = useState({});
  const {loading,error} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ... formData,
      [e.target.id]:e.target.value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
    const res = await fetch('/api/auth/signin',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    console.log(data);
    if(data.success == false){
      dispatch(signInFailure(data.message));
      return;
    }
    dispatch(signInSuccess(data));
    navigate('/home');
      
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
    
    
  };

  return (
    <div className='p-4 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit = {handleSubmit} className='text-center flex flex-col gap-5 w-96 mx-auto '>
        
        <input type="text" placeholder='Username' className='border p-2 rounded-lg' id='username'onChange={handleChange}/>
        
        <input type="password" placeholder='Password' className='border p-2 rounded-lg' id='password'onChange={handleChange}/>
        <button  disabled = {loading} className='bg-slate-700 p-2 rounded-lg text-sky-50 uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'Loading..' : 'Sign In'}</button>
        <OAuth/>
      </form>
      <div className='flex gap-1 mt-3 ml-12'>
        <p>Dont have an account?</p>
        <Link to={'/signup'}>
          <span className='text-blue-700 '>Sign Up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 text-center mt-3'>{error}</p>}
    </div>
  )
};
