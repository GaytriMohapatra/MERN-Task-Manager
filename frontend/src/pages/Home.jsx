import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Tasks from '../components/Tasks';
import MainLayout from '../layouts/MainLayout';

const Home = () => {
  const authState = useSelector((state) => state.authReducer);
  const { isLoggedIn } = authState;

  useEffect(() => {
    document.title = isLoggedIn ? `${authState.user.name}'s tasks` : 'Task Manager';
  }, [isLoggedIn, authState]);

  return (
    <>
      <MainLayout>
        {!isLoggedIn ? (
          <div className='bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-200 text-white h-[40vh] flex flex-col justify-center items-center text-center'>
            <h1 className='text-3xl font-semibold mb-6'>Welcome to Task Manager App</h1>
            <Link
              to='/signup'
              className='mt-4 text-xl hover:text-primary-light transition duration-300 ease-in-out flex items-center gap-2'
            >
              <span className='transition-[margin]'>Join now to manage your tasks</span>
              <i className='fa-solid fa-arrow-right text-lg'></i>
            </Link>
          </div>
        ) : (
          <>
            <h1 className='text-xl font-medium mt-8 mx-8 border-b border-b-gray-300 pb-2'>
              Welcome, {authState.user.name}
            </h1>
            <Tasks />
          </>
        )}
      </MainLayout>
    </>
  );
};

export default Home;
