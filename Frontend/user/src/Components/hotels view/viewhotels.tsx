import React, { useEffect, useState } from 'react';
import axios from 'axios';  // Import Axios
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './hotels.css';
import Navbar from '../Layout/layout';
import { useNavigate, useLocation } from 'react-router-dom';


interface Room {
  roomId: {
    price: number;
  };
}

interface HotelDoc {
  _id: string;
  location: string;
  hotelname: string;
  image: string[];
  rooms: Room[];
  deleted: boolean;
}

const HotelRoom: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation() as { state?: { hotels: HotelDoc[] } };
  const [hotels, setHotels] = useState<HotelDoc[]>([]);

  useEffect(() => {
    if (location.state && location.state.hotels) {
      setHotels(location.state.hotels);
    } else {
      // Fetch data using Axios
      const fetchHotelData = async () => {
        try {
          const response = await axios.get('http://localhost:4561/api/user/viewhotels');
          setHotels(response.data.results);
        } catch (error) {
          console.error('Error fetching hotel data:', error);
        }
      };

      fetchHotelData();
    }
  }, [location.state]);

  const handleViewHotel = (hotelId: string) => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('token') !== null;
  
    if (isLoggedIn) {
      console.log(`View Hotel clicked for ${hotelId}`);
      navigate(`/singlehotel/${hotelId}`);
    } else {
      // Redirect to the login page if the user is not logged in
      navigate('/login');
    }
  };

  return (
    <>
      <div>
        <Navbar />
        {hotels.map((hotel) => (
          <div key={hotel._id} className="wrapper">
            <h1>{hotel.location}</h1>
            <div>
              <div>
                <img className='image101' src={'http://localhost:4561/uploads/' + encodeURIComponent(hotel.image[0])} alt="Hotel Image" />
              </div>
            </div>
            <div className="details">
              <h1>
                <em>{hotel.hotelname}</em>
              </h1>
              <h2>{hotel.hotelname}</h2>
              <p></p>
            </div>
            {/* {hotel.rooms.map((room) => (
              <h1>₹{room.roomId.price}</h1>
            ))} */}
            <button
              style={{ backgroundColor: 'pink', color: 'black' }}
              onClick={() => handleViewHotel(hotel._id)}
              className='bn632-hover bn28'
            >
              View Hotel
            </button>
          </div>
        ))}
      </div>
      <footer>
        <div className="container-xxl flex-wrap pt-3 d-flex align-items-center justify-content-center justify-content-md-between">
          <p>Copyright © 2023 Theertha S</p>
          <ul className="social-icons d-flex">
            <a
              href="#"
              className="bg-primary mx-2 text-white d-flex align-items-center justify-content-center text-decoration-none rounded-circle"
            >
              <small>
                <i className="fa-brands fa-twitter"></i>
              </small>
            </a>
            <a
              href="#"
              className="bg-primary mx-2 text-white d-flex align-items-center justify-content-center text-decoration-none rounded-circle"
            >
              <small>
                <i className="fa-brands fa-facebook-f"></i>
              </small>
            </a>
            <a
              href="#"
              className="bg-primary mx-2 text-white d-flex align-items-center justify-content-center text-decoration-none rounded-circle"
            >
              <small>
                <i className="fa-brands fa-linkedin-in"></i>
              </small>
            </a>
          </ul>
        </div>
      </footer>
      <ToastContainer />
    </>
  );
};

export default HotelRoom;
