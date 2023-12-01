import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import '../../Components/Layout/layout.css';



const Navbar: React.FC = () => {
  const navigate = useNavigate();
 

  const handleGetStarted = () => {
    window.location.href = "/";
  };

  const handleLogout = () => {
    // Clear user data from local storage or state
    localStorage.removeItem('token');

    // Then navigate to the login page
    navigate('/');
  };

  // Check if the user is authenticated
  const isAuthenticated = localStorage.getItem('token') !== null;

  const handleBookingsClick = () => {
    if (!isAuthenticated) {
      // If not authenticated, redirect to the login page
      window.location.href = "/login";
    }
    // Otherwise, let the normal navigation happen
  };

  const handleBookNow=()=>{
    if (!isAuthenticated) {
      // If not authenticated, redirect to the login page
      window.location.href = "/login";
    }
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light  navbar">
        <div className="container">
          <a className="navbar-brand" href="#">
            <span>Dazz</span>led
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              {!isAuthenticated && (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              )}
              <li className="nav-item">
                <Link className="nav-link" to="/viewhotels">
                  Hotels
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/viewbooking" onClick={handleBookingsClick}>
                  Bookings
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/#formcontact" >
                  Contact
                </a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/viewcart" onClick={handleBookNow}>
                  Cart
                </Link>
              </li>
              {isAuthenticated && (
                <li className="nav-item">
                  <Link className="nav-link" to="/" onClick={handleLogout}>
                    Logout
                  </Link>
                </li>
              )}
              <li className="nav-item">
                <button className="button-10" onClick={handleGetStarted}>
                  Get Started
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
