import React from 'react'

const Navbar = () => {
  return (
    <div className=" bg-white flex justify-around px-5 h-10 items-center">
      <div className="logo font-bold sm:text-2xl text-xl" >TaskMate</div>  
      <ul className="flex list-none sm:gap-6 gap-1">
        <li className=' hover:font-bold hover:cursor-pointer w-12'>Home</li>
        <li className=' hover:font-bold hover:cursor-pointer w-12'>YourTask</li>
      </ul>
    </div>
  )
}

export default Navbar
