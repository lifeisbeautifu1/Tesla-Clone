import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ButtonPrimary from '../components/ButtonPrimary';
import ButtonSecondary from '../components/ButtonSecondary';
import { LanguageOutlined } from '@material-ui/icons';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { login } from '../features/userSlice';
import './Login.css';

const Login = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };
  const signIn = async (e) => {
    e.preventDefault();
    // if (!formState.name || !formState.email) return;
    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        formState.email,
        formState.password
      );
      dispatch(
        login({
          displayName: user.displayName,
          email: user.email,
          uid: user.uid,
        })
      );
      navigate('/teslaaccount');
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
        <h1>Sign In</h1>
        <form className="login__form">
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
            required={true}
            value={formState.password}
            onChange={handleChange}
          />
          <ButtonPrimary name="Sign In" type="submit" onClick={signIn} />
        </form>
        <div className="login__divider">
          <hr /> <span>OR</span> <hr />
        </div>
        <Link to="/signup">
          <ButtonSecondary name="create account" />
        </Link>
      </div>
    </div>
  );
};

export default Login;
