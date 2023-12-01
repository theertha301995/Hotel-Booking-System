import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './dashboard.css'

const Dashboard: React.FC = () => {
  const loggedIn = !!localStorage.getItem('token'); // check if token exists in local storage

  const logOut = () => {
    localStorage.removeItem('token'); // remove token from local storage when logging out
    window.location.href = '/login'; // redirect to login page
  };

  return (
    <>
      <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">
          DAZZLED
        </a>
        <button
          className="navbar-toggler position-absolute d-md-none collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sidebarMenu"
          aria-controls="sidebarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
     
       
    
      </header>

      <div className="container-fluid">
        <div className="row">
          <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div className="position-sticky pt-3">
              <br></br>
              <ul className="nav flex-column">
                <li className="nav-item">
                {loggedIn ? (
              <a  onClick={logOut} className="nav-link px-3">
                Sign Out
              </a>
            ) : (
              <Link className="nav-link px-3" to="/login">
                Sign In
              </Link>
            )}
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/addhotel">
                    <span data-feather="file"></span>
                    Add Hotel
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/viewhotel">
                    <span data-feather="shopping-cart"></span>
                    View Hotel
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/addrooms">
                    <span data-feather="users"></span>
                    Add Rooms
                  </Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/viewrooms">
                    <span data-feather="bar-chart-2"></span>
                    View Rooms
                  </a>
                </li>
              
                <li className="nav-item">
                  <a className="nav-link" href="/viewbooking">
                    <span data-feather="bar-chart-2"></span>
                   View Bookings
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/cancelledbookingsview">
                    <span data-feather="bar-chart-2"></span>
                  Cancelled Bookings
                  </a>
                </li>
              
               </ul>
            </div>
          </nav>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Dashboard;
