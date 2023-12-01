import React, { FormEvent, useState } from 'react';
import axios from 'axios'; // Make sure to install axios with npm install axios
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook from react-router-dom
import Dashboard from '../Dashboard/dashboard';
import './login.css';
import Footer from '../Dashboard/footer';


const LoginForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4561/api/adminsign', {
        username: name,
        password,
        email
      });

      if (response.status !== 201) {
        console.error('Login failed:', response.data.message);
        // Handle error appropriately (e.g., show an error message to the user)
        return;
      }

      const { token } = response.data;

      // Store the token in local storage
      localStorage.setItem('token', token);

      // Navigate to the AddHotel page
      navigate('/addrooms'); // Replace '/addhotel' with the path to the AddHotel page

    } catch (error) {
      console.error('Error during login:', error);
      // Handle error appropriately (e.g., show an error message to the user)
    }
  };

  return (
    <><Dashboard />
    <div className="container101">
      <h2 className="login-title">Log in</h2>

      <form className="login-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name </label>
          <input
            id="name"
            type="text"
            placeholder="Full Name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email </label>
          <input
            id="email"
            type="email"
            placeholder="me@example.com"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password </label>
          <input
            id="password"
            type="password"
            placeholder="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="btn btn--form" type="submit">
          Log in
        </button>
      </form>
    </div>
    <Footer />
    </>

  );
};

export default LoginForm;
