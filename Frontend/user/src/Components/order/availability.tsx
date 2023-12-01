import React, { useState } from 'react';
import axios from 'axios';
import './availability.css';
import Navbar from '../Layout/layout';
import { useNavigate, useParams } from 'react-router-dom';


interface RoomDoc {
  roomId: {
    _id: string;
    roomname: string;
    image: string[];
    bedrooms: number;
    price: number;
    startdate: Date;
    enddate: Date;
    deleted: boolean;
    newroomno: number;
    bathrooms: number;
    description: string;
    adults: number;
    kids: number;
  };
}

const CheckAvailabilityForm: React.FC = () => {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [message, setMessage] = useState(''); // Add this line
  const { roomId } = useParams(); 
  const navigate= useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'checkInDate') {
      setCheckInDate(event.target.value);
    } else if (event.target.name === 'checkOutDate') {
      setCheckOutDate(event.target.value);
    }
  };

  const handleCheckAvailability = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Authorization token is missing.');
        return;
      }

      const response = await axios.post(
        'http://localhost:4561/api/addorder/availability',
        {
          roomId,
          checkInDate,
          checkOutDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.message=== 'Room is available for the selected dates') {
        setMessage('Room Available'); 
      } else {
        setMessage('No rooms available for this date!'); 
      }
    } catch (error) {
      console.error('Error checking room availability:', error);
    }
  };

  const goback = async() => {
    navigate(`/viewcart`)
  }

  return (
    <>
      <Navbar />
      <div className="check-availability-form" style={{backgroundColor:'white'}}>
        <h2>Check Date Availability</h2>
        <form >
          {/* Add this block */}
          {message && (
            <div className="message">
              {message}
            </div>
          )}
          {/* End of the new block */}
          <div className="form-group">
            <label htmlFor="checkInDate">Check-in Date:</label>
            <input
              type="date"
              className="form-control"
              id="checkInDate"
              name="checkInDate"
              value={checkInDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="checkOutDate">Check-out Date:</label>
            <input
              type="date"
              className="form-control"
              id="checkOutDate"
              name="checkOutDate"
              value={checkOutDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="button" className="btn btn-secondary">
            Cancel
          </button>
          <button type="button" onClick={handleCheckAvailability} className="button-7">
            Check Availability
          </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button type="button"  onClick={goback} className="button-7">
            Back to Cart
          </button>
        </form>
      </div>
    </>
  );
};

export default CheckAvailabilityForm;
