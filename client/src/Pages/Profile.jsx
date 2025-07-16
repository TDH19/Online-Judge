import React from 'react'
import { useSelector } from 'react-redux'

export default function Profile() {
  const currentUser = useSelector((state) => state.user.currentUser);
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4' >
        <img src={currentUser.avatar} className=' rounded-full h-25 w-25 object-cover cursor-pointer self-center '/>
        <input type="text" placeholder='Username'  id = 'username' className='border p-3 rounded-lg  '/>
        <input type="email" placeholder='email'  id = 'email' className='border p-3 rounded-lg  '/>
        <input type="text" placeholder='password'  id = 'password' className='border p-3 rounded-lg  '/>
        <button className='bg-slate-700 text-white rounded-lg hover:opacity-95 uppercase p-3 disabled:opacity-85'>Update</button>
      </form>
      <div className='flex justify-between items-center mt-3'>
        <span className='text-red-700 cursor-pointer'> Delete Account</span>
        <span className='text-red-700 cursor-pointer'> Sign out</span>
      </div>
    </div>
  )
}
