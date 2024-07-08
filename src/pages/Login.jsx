import React, { useState } from 'react';
import Title from '../common/Title';
import SubTitle from '../common/Subtitle';
import LabelledInput from '../common/LabelledInput';
import PrimaryButton from '../common/PrimaryButton';
import Footer from '../common/Footer';
import { useNavigate } from 'react-router-dom';
import userAtom from '../atoms/userAtom';
import { useSetRecoilState } from 'recoil';
import Loader from '../common/Loader';
import toast from 'react-hot-toast';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_URL;
  // console.log(BACKEND_BASE_URL);
  const setCurrentUser = useSetRecoilState(userAtom);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // const submitForm = async () => {
  //   console.log('formdata is: ', formData);
  //   try {
  //     setIsLoading(true);
  //     const res = await fetch(`${BACKEND_BASE_URL}/api/v1/users/login`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },

  //       body: JSON.stringify(formData),
  //     });
  //     const data = await res.json();
  //     console.log('response from backend is: ', data);
  //     if (data.error) {
  //       console.log('Error in request is: ', data.error);
  //       toast.error('Error in Login', { id: 'Login' });
  //       return;
  //     }
  //     localStorage.setItem('currentUser', JSON.stringify(data.userDetails));
  //     setCurrentUser(data.userDetails);
  //     toast.success('Login success', { id: 'Login' });
  //     navigate('/');
  //   } catch (error) {
  //     console.log('Error is: ', error);
  //     toast.error('Error in Login', { id: 'Login' });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const submitForm = async () => {
    console.log('formData is: ', formData);
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${BACKEND_BASE_URL}/api/v1/users/login`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      console.log('response from backend is: ', res.data);
      const { userDetails } = res.data;
      localStorage.setItem('currentUser', JSON.stringify(userDetails));
      setCurrentUser(userDetails);
      toast.success('Login success', { id: 'Login' });
      navigate('/');
    } catch (error) {
      console.error('Error in Login:', error);
      toast.error('Error in Login', { id: 'Login' });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <>
        <Loader />
      </>
    );
  }
  return (
    <>
      <div className='bg-slate-300 h-screen flex justify-center'>
        <div className='flex flex-col justify-center'>
          <div className='bg-yellow-200 w-96 pt-2 pb-2 px-4 mt-2 mb-2 ml-2 mr-2 rounded-md flex flex-col justify-center'>
            <Title label={'Login'} />
            <SubTitle label={'Enter your credentials to your account'} />

            <LabelledInput
              label={'Email'}
              placeholder={'johndoe@gmail.com'}
              name={'email'}
              onChange={handleInput}
              value={formData.email}
            />
            <LabelledInput
              label={'Password'}
              placeholder={'JohnDoe123'}
              name={'password'}
              onChange={handleInput}
              value={formData.password}
            />
            <PrimaryButton label={'Login'} onClick={submitForm} />
            <Footer
              label={'Do not have an Account?'}
              buttonText={'Signup'}
              to={'/signup'}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
