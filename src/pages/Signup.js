import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ButtonPrimary from '../components/ButtonPrimary';
import ButtonSecondary from '../components/ButtonSecondary';
import { LanguageOutlined } from '@material-ui/icons';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { login } from '../features/userSlice';
import './Signup.css';

const Signup = () => {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };
  const signUp = async (e) => {
    e.preventDefault();

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        formState.email,
        formState.password
      );
      console.log(user);
      await updateProfile(auth.currentUser, {
        displayName: formState.firstName,
      });
      dispatch(
        login({
          displayName: formState.firstName,
          email: user.email,
          uid: user.uid,
        })
      );
      navigate('/teslaaccount');

      // console.log(user);
    } catch (error) {
      alert(error.message);
    }

    // signOut(auth);
  };
  return (
    <div className="login">
      <div className="login__header">
        <div className="login__logo">
          <Link to="/">
            <img
              src="https://assets.website-files.com/5e8fceb1c9af5c3915ec97a0/5ec2f037975ed372da9f6286_Tesla-Logo-PNG-HD.png"
              alt="logo"
            />
          </Link>
        </div>
        <div className="login__language">
          <LanguageOutlined /> <span>en-US</span>
        </div>
      </div>
      <div className="login__info">
        <h1>Create account</h1>
        <form className="login__form">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            required
            value={formState.firstName}
            onChange={handleChange}
          />
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            required
            value={formState.lastName}
            onChange={handleChange}
          />
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            value={formState.email}
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            value={formState.password}
            onChange={handleChange}
          />
          <ButtonPrimary name="Create account" type="button" onClick={signUp} />
        </form>
        <div className="login__divider">
          <hr /> <span>OR</span> <hr />
        </div>
        <Link to="/login" className="mb-big">
          <ButtonSecondary name="Sign In" />
        </Link>
      </div>
    </div>
  );
};

export default Signup;
