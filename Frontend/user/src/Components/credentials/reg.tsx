import React, { useState, useEffect } from 'react';
import './logreg.css';
import photo from '../../Assets/background.jpg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const RegForm: React.FC = () => {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Validation state
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  useEffect(() => {
    document.body.style.backgroundImage = `url(${photo})`;

    return () => {
      document.body.style.backgroundImage = 'none';
    };
  }, []);

  const notifySuccess = () => {
    toast.success('Registration Successful', {
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

  const validateEmail = (input: string) => {
    setEmailError('');
    if (!input.includes('@') || !input.includes('.')) {
      setEmailError('Invalid email format');
      return false;
    }
    return true;
  };

  const validatePassword = (input: string) => {
    const minLength = 8;
    setPasswordError('');
    if (input.length < minLength) {
      setPasswordError(`Password must be at least ${minLength} characters`);
      return false;
    }
    return true;
  };

  const validateConfirmPassword = (input: string) => {
    setConfirmPasswordError('');
    if (input !== password) {
      setConfirmPasswordError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:4561/api/userreg/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          password,
        }),
      });
  
      if (response.ok) {
        notifySuccess();
        navigate('/login');
      } else if (response.status === 400) {
        // Handle existing email case
        const data = await response.json();
        toast.error(data.message);
      } else {
        console.error('Registration failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <>
      <body>
        <div className="register">
          <div className="container75">
            <div className="image">
              <h1>Welcome!!!  <span></span></h1>
            </div>
            <div className="content">
              <h1>Register</h1>
              <div className="form-group1">
                <label htmlFor="firstname"></label>
                <br />
                <input
                  type="text"
                  className="form-control"
                  name="firstname"
                  id="firstname"
                  placeholder="First Name"
                  value={firstname}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="form-group1">
                <label htmlFor="lastname"></label>
                <br />
                <input
                  type="text"
                  className="form-control"
                  name="lastname"
                  id="lastname"
                  placeholder="Last Name"
                  value={lastname}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="form-group1">
                <label htmlFor="email"></label>
                <br />
                <input
                  type="text"
                  className={`form-control ${emailError ? 'is-invalid' : ''}`}
                  name="email"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    validateEmail(e.target.value);
                  }}
                />
                {emailError && <div className="invalid-feedback">{emailError}</div>}
              </div>
              <div className="form-group1">
                <label htmlFor="password"></label>
                <br />
                <input
                  type="password"
                  className={`form-control ${passwordError ? 'is-invalid' : ''}`}
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    validatePassword(e.target.value);
                  }}
                />
                {passwordError && <div className="invalid-feedback">{passwordError}</div>}
              </div>
              <div className="form-group1">
                <label htmlFor="confirmPassword"></label>
                <br />
                <input
                  type="password"
                  className={`form-control ${confirmPasswordError ? 'is-invalid' : ''}`}
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    validateConfirmPassword(e.target.value);
                  }}
                />
                {confirmPasswordError && <div className="invalid-feedback">{confirmPasswordError}</div>}
              </div>
              <button type="button" className="bn11" onClick={handleRegister}>
                Register
              </button>
            </div>
          </div>
        </div>
      </body>
      <ToastContainer />
    </>
  );
};

export default RegForm;
