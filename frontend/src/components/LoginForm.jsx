import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import validateManyFields from '../validations';
import Input from './utils/Input';
import { postLoginData } from '../redux/actions/authActions';
import Loader from './utils/Loader';

const LoginForm = ({ redirectUrl }) => {
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authState = useSelector((state) => state.authReducer);
  const { loading, isLoggedIn } = authState;

  useEffect(() => {
    if (isLoggedIn) {
      navigate(redirectUrl || '/');
    }
  }, [isLoggedIn, navigate, redirectUrl]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateManyFields('login', formData);
    setFormErrors({});
    if (errors.length > 0) {
      setFormErrors(
        errors.reduce((total, ob) => ({ ...total, [ob.field]: ob.err }), {})
      );
      return;
    }
    dispatch(postLoginData(formData.email, formData.password));
  };

  const fieldError = (field) => (
    <p className={`mt-1 text-sm text-red-500 ${formErrors[field] ? 'block' : 'hidden'}`}>
      <i className='mr-2 fa-solid fa-circle-exclamation'></i>
      {formErrors[field]}
    </p>
  );

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <form
        className='bg-white p-8 rounded-md shadow-md w-full max-w-md border border-gray-200'
        onSubmit={handleSubmit}
      >
        {loading ? (
          <Loader />
        ) : (
          <>
            <h2 className='text-2xl font-semibold text-center text-gray-700 mb-6'>
              Welcome Back!
            </h2>
            <div className='mb-5'>
              <label
                htmlFor='email'
                className='block text-gray-600 font-medium after:content-["*"] after:ml-0.5 after:text-red-500'
              >
                Email
              </label>
              <Input
                type='text'
                name='email'
                id='email'
                value={formData.email}
                placeholder='youremail@domain.com'
                onChange={handleChange}
                className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200'
              />
              {fieldError('email')}
            </div>

            <div className='mb-5'>
              <label
                htmlFor='password'
                className='block text-gray-600 font-medium after:content-["*"] after:ml-0.5 after:text-red-500'
              >
                Password
              </label>
              <Input
                type='password'
                name='password'
                id='password'
                value={formData.password}
                placeholder='Your password...'
                onChange={handleChange}
                className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200'
              />
              {fieldError('password')}
            </div>

            <button
              type='submit'
              className='w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition'
            >
              Submit
            </button>

            <div className='text-center mt-4'>
              <Link to='/signup' className='text-blue-500 hover:underline'>
                Don't have an account? Sign up here
              </Link>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default LoginForm;
