import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Layout/layout';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import './viewbooking.css';

interface RoomData {
  roomId: {
    _id: string;
    price: number;
    roomname:string
  };
  _id: string;
}

interface HotelData {
  hotelId: {
    _id: string;
    hotelname: string;
    location: string;
    image:string[]
  };
  newroomno: number;
  rooms: RoomData[];
  _id: string;
}

interface OrderData {
  _id: string;
  userId: string;
  hotels: HotelData[];
}

const ViewBooking: React.FC = () => {
  const [orderData, setOrderData] = useState<OrderData[]>([]);
  const navigate = useNavigate();

  const fetchOrderData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get<OrderData[]>(
        'http://localhost:4561/api/vieworder/viewcheckout',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrderData(response.data);
    } catch (error) {
      console.error('Error fetching order data:', error);
    }
  };

  useEffect(() => {
    fetchOrderData();
  }, []);
  const handleDelete = async (orderId: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:4561/api/delete/${orderId}`, {
        headers: {
          'Authorization':`Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      toast.success('Booking canceled successfully');

      const updatedOrder = orderData.filter((order) => order._id !== orderId);
      setOrderData(updatedOrder);
    } catch (error) {
      console.error('Error deleting room:', error);
      toast.error('Error canceling booking');
    }
  };


  return (
    <>
      <Navbar />
      <div className="container12">
        <h1 className='para'>BOOKING DETAILS</h1>
<br />
        {orderData.map((order) => (
          <div className="hotel-details" key={order._id}>
            <div className="hotel-card">
           
              <h2>{order.hotels[0].hotelId.hotelname}</h2>
              <p>{order.hotels[0].hotelId.location}</p>
            </div>

            <div className="booking-summary">
              <h3>Booking Summary</h3>
              <ul>
                <li>Number of rooms booked: {order.hotels[0].newroomno}</li>
                {order.hotels[0].rooms.map((room) => (
                  <li key={room._id}>
                    Room type: {room.roomId.roomname}
                    <br />
                    Price: ₹{room.roomId.price}
                  </li>
                ))}
              </ul>

              <p className="total-price">Total price: ₹{order.hotels[0].rooms.reduce((acc, room) => acc + room.roomId.price * order.hotels[0].newroomno, 0)}</p>
            </div>

            <div className="cancellation-policy">
              <h3>Cancellation Policy</h3>
              <p>Please refer to the hotel's cancellation policy for details.</p>
            </div>

            <div className="contact-info">
              <h3>Contact Information</h3>
              <p className='para'>{order.hotels[0].hotelId.hotelname}</p>
              <p>Location: {order.hotels[0].hotelId.location}</p>
              <p>Phone: 9876543234</p>
              
            </div>
            <button className="button-3" onClick={() => handleDelete(order._id)}>Cancel Booking</button>
          </div>
        ))}
      </div>
      <ToastContainer />
    </>
  );
};

export default ViewBooking;
