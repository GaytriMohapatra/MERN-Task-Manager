import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import MainLayout from '../layouts/MainLayout';

const Login = () => {
  const { state } = useLocation();
  const redirectUrl = state?.redirectUrl || null;

  useEffect(() => {
    document.title = 'Login';
  }, []);

  return (
    <>
      <MainLayout>
        <div className='flex justify-center items-center min-h-[60vh]'>
          <div className='w-full max-w-[500px] bg-white p-6 shadow-md rounded-md'>
            <h2 className='text-2xl font-semibold text-center mb-4'>Login to your account</h2>
            <LoginForm redirectUrl={redirectUrl} />
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Login;
