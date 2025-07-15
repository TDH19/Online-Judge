import React, {  useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import OAuth from '../Components/OAuth.jsx';



export default function SignUp() {
  const[formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
    const res = await fetch('/api/auth/signup',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    console.log(data);
    if(data.success == false){
      setError(data.message);
      setLoading(false);
      return;
    }
    setLoading(false);
    setError(null);
    navigate('/signin');
      
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
    
    
  };

  return (
    <div className='p-4 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit = {handleSubmit} className='text-center flex flex-col gap-5 w-96 mx-auto '>
        <input type="text" placeholder='First Name' className='border p-2 rounded-lg' id='firstname' onChange={handleChange}/>
        <input type="text" placeholder='Last Name' className='border p-2 rounded-lg' id='lastname' onChange={handleChange}/>
        <input type="text" placeholder='Username' className='border p-2 rounded-lg' id='username'onChange={handleChange}/>
        <input type="email" placeholder='Email id' className='border p-2 rounded-lg' id='email'onChange={handleChange}/>
        <input type="password" placeholder='Password' className='border p-2 rounded-lg' id='password'onChange={handleChange}/>
        <button  disabled = {loading} className='bg-slate-700 p-2 rounded-lg text-sky-50 uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'Loading..' : 'Sign Up'}</button>
        <OAuth/>
      </form>
      <div className='flex gap-1 mt-3 ml-12'>
        <p>Have an account?</p>
        <Link to={'/signin'}>
          <span className='text-blue-700 '>Sign in</span>
        </Link>
      </div>
      {error && <p className='text-red-500 text-center mt-3'>{error}</p>}
    </div>
  )
};
