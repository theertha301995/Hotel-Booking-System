import React, { useState, useEffect } from 'react';
import './logreg.css';
import photo from '../../Assets/background.jpg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    document.body.style.backgroundImage = `url(${photo})`;

    return () => {
      document.body.style.backgroundImage = 'none';
    };
  }, []);

  const notify = () => {
    toast.error('Password reset link sent to your email!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const notifySuccess = () => {
    toast.success('Login Successful', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:4561/api/userlogin/login', {
        email,
        password,
      });

      const { token } = response.data;

      if (token) {
        
        localStorage.setItem('token', token);

        
        notifySuccess();

        
        navigate('/');
      } else {
        toast.error('Invalid email or password. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('An error occurred during login. Please try again.');
    }
  };

  return (
    <>
      <div className="login">
        <div className="container1">
          <div className="image">
            <h1>Welcome<span>BACK</span></h1>
          </div>
          <div className="content">
            <h1>Login</h1>
            <div className="form-group1">
              <label htmlFor="username"></label>
              <br />
              <input
                type="text"
                className="form-control"
                name="email"
                id="email"
                aria-describedby="helpId"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group1">
              <label htmlFor="password"></label>
              <br />
              <input
                type="password"
                className="form-control"
                name="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Link to="/login" className="fp1" onClick={notify}>
              Forgot Password?
            </Link>
            <Link to="/reg" className="reg">
              Sign Up
            </Link>
            <br />
            <button type="button" className="button-88" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
     
    </>
  );
};

export default LoginForm;
