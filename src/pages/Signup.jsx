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

const Signup = () => {
  const navigate = useNavigate();
  const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_URL;
  // console.log(BACKEND_BASE_URL);
  const setCurrentUser = useSetRecoilState(userAtom);

  const [formData, setFormData] = useState({
    fullname: '',
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
  const submitForm = async () => {
    console.log('formdata is: ', formData);
    try {
      setIsLoading(true);
      // const res = await fetch(`${BACKEND_BASE_URL}/api/v1/users/signup`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });
      // const data = await res.json();
      // console.log('response from backend is: ', data);
      // if (data.error) {
      //   console.log('Error in request is: ', data.error);
      //   return;
      // }
      // localStorage.setItem('currentUser', JSON.stringify(data.userDetails));
      // setCurrentUser(data.userDetails);
    } catch (error) {
      console.log('Error is: ', error);
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
            <Title label={'Signup'} />
            <SubTitle label={'Enter your information to create your account'} />
            <LabelledInput
              label={'Full Name'}
              placeholder={'John Doe'}
              name={'fullname'}
              onChange={handleInput}
              value={formData.fullname}
            />

            <LabelledInput
              label={'Email'}
              placeholder={'johndoe@mail.com'}
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
            <PrimaryButton label={'Signup'} onClick={submitForm} />
            <Footer
              label={'Already have an account?'}
              buttonText={'Login'}
              to={'/login'}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
