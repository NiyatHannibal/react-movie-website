import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './../assets/Images/logo (2).png';
import { HiHome, HiMagnifyingGlass, HiTv } from "react-icons/hi2";
import { HiPlus, HiDotsVertical } from "react-icons/hi";
import { TbMovie } from "react-icons/tb";
import { IoStar } from "react-icons/io5";
import HeaderItem from './HeaderItem';
import { FaRegUser } from "react-icons/fa";
import { UserAuth } from '../context/AuthContext';

function Header() {
  const { user, logOut } = UserAuth();
  const [toggle, setToggle] = useState(false);

  const handleLogout = async () => {
    try {
      await logOut();
      // Redirect to home page after logout
      window.location.href = '/';
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex items-center justify-between bg-[#213547] '>
      <div className='flex gap-20 items-center '>
        <img src={logo} className='w-[80px] md:w-[115px] object-cover rounded-full' alt="Logo" />
        <div className='hidden md:flex gap-20'>
          <Link to='/'>
            <HeaderItem name='HOME' Icon={HiHome} />
          </Link>
          <Link to='/search'>
            <HeaderItem name='SEARCH' Icon={HiMagnifyingGlass} />
          </Link>
          <Link to='/movie'>
            <HeaderItem name='MOVIES' Icon={TbMovie} />
          </Link>
          <Link to='/tvshows'>
            <HeaderItem name='TVSHOWS' Icon={HiTv} />
          </Link>
          {user?.email ? (
            <>
            // Only render if user is signed in
            <Link to='/favourite'>
              <HeaderItem name='FAVOURITE' Icon={IoStar} />
            </Link>
        
              <button
                onClick={handleLogout}
                className='bg-red-600 px-6 py-2 rounded cursor-pointer text-white'
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to='/login'>
                <button className='bg-red-600 px-6 py-2 rounded cursor-pointer text-white'>Sign In</button>
              </Link>
              <Link to='/signup'>
                <button className='bg-red-600 px-6 py-2 rounded cursor-pointer text-white'>
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
        <div className='flex md:hidden gap-5'>
          <HeaderItem name='' Icon={HiHome} />
          <HeaderItem name='' Icon={HiMagnifyingGlass} />
          <HeaderItem name='' Icon={TbMovie} />
          <div className='md:hidden' onClick={() => setToggle(!toggle)}>
            <HeaderItem name='' Icon={HiDotsVertical} />
            {toggle &&
              <div className='absolute mt-3 bg-[#121212] border-[1px] border-gray-700 p-3 px-8 py-4'>
                <Link to='/tvshows'>
                  <HeaderItem name='TVSHOWS' Icon={HiTv} />
                </Link>
                <Link to='/favourite'>
                  <HeaderItem name='FAVOURITE' Icon={IoStar} />
                </Link>
                {user?.email ? (
                  <>
                   // Only render if user is signed in
            <Link to='/favourite'>
              <HeaderItem name='FAVOURITE' Icon={IoStar} />
            </Link>
                    <button
                      onClick={handleLogout}
                      className='bg-red-600 px-6 py-2 rounded cursor-pointer text-white'
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to='/login'>
                      <button className='bg-red-600 px-6 py-2 rounded cursor-pointer text-white'>Sign In</button>
                    </Link>
                    <Link to='/signup'>
                      <button className='bg-red-600 px-6 py-2 rounded cursor-pointer text-white'>
                        Sign Up
                      </button>
                    </Link>
                  </>
                )}
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
