import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../redux/actions/authActions';

const Navbar = () => {
  const authState = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const handleLogoutClick = () => {
    dispatch(logout());
  };

  return (
    <>
      <header className='sticky top-0 z-50 bg-white shadow-sm p-4 flex justify-between items-center'>
        <h2 className='text-xl font-semibold cursor-pointer uppercase'>
          <Link to='/'>Task Manager</Link>
        </h2>
        <nav className='hidden md:flex space-x-4'>
          {authState.isLoggedIn ? (
            <>
              <li className='bg-blue-500 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-600 transition'>
                <Link to='/tasks/add'>
                  <i className='fa-solid fa-plus mr-1'></i> Add Task
                </Link>
              </li>
              <li
                className='py-2 px-3 cursor-pointer hover:bg-gray-200 transition rounded-sm'
                onClick={handleLogoutClick}
              >
                Logout
              </li>
            </>
          ) : (
            <li className='py-2 px-4 text-blue-500 font-medium cursor-pointer hover:bg-gray-100 transition rounded-sm'>
              <Link to='/login'>Login</Link>
            </li>
          )}
        </nav>

        {/* Hamburger Icon for Mobile */}
        <span className='md:hidden cursor-pointer' onClick={toggleNavbar}>
          <i className='fa-solid fa-bars text-xl'></i>
        </span>

        {/* Mobile Sidebar */}
        <div
          className={`absolute top-0 right-0 bottom-0 w-screen sm:w-9/12 bg-gray-100 shadow-md transition-transform duration-300 transform ${
            isNavbarOpen ? 'translate-x-0' : 'translate-x-full'
          } md:hidden`}
        >
          <div className='flex justify-end p-4'>
            <span className='cursor-pointer' onClick={toggleNavbar}>
              <i className='fa-solid fa-xmark text-2xl'></i>
            </span>
          </div>
          <ul className='flex flex-col items-center space-y-4 text-lg uppercase font-medium'>
            {authState.isLoggedIn ? (
              <>
                <li className='bg-blue-500 text-white py-3 px-5 rounded-md font-medium hover:bg-blue-600 transition'>
                  <Link to='/tasks/add'>
                    <i className='fa-solid fa-plus mr-2'></i> Add Task
                  </Link>
                </li>
                <li
                  className='py-3 px-5 cursor-pointer hover:bg-gray-200 transition rounded-md'
                  onClick={handleLogoutClick}
                >
                  Logout
                </li>
              </>
            ) : (
              <li className='py-3 px-5 text-blue-500 font-medium cursor-pointer hover:bg-gray-200 transition rounded-md'>
                <Link to='/login'>Login</Link>
              </li>
            )}
          </ul>
        </div>
      </header>
    </>
  );
};

export default Navbar;
