import React from 'react'
import { Link } from 'react-router-dom'

export default function SignUp() {
  return (
    <div className='p-4 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form className='text-center flex flex-col gap-5 w-96 mx-auto '>
        <input type="text" placeholder='First Name' className='border p-2 rounded-lg' id='firstname' />
        <input type="text" placeholder='Last Name' className='border p-2 rounded-lg' id='lastname' />
        <input type="text" placeholder='Username' className='border p-2 rounded-lg' id='username'/>
        <input type="email" placeholder='Email id' className='border p-2 rounded-lg' id='emailid'/>
        <input type="password" placeholder='Password' className='border p-2 rounded-lg' id='password'/>
        <button className='bg-slate-700 p-2 rounded-lg text-sky-50 uppercase hover:opacity-95 disabled:opacity-80'>Sign Up</button>
      </form>
      <div className='flex gap-1 mt-3 ml-12'>
        <p>Have an account?</p>
        <Link to={'/signin'}>
          <span className='text-blue-700 '>Sign in</span>
        </Link>
      </div>
    </div>
  )
}
