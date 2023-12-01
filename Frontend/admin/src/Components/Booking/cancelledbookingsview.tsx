import React, { useEffect, useState } from 'react';
import Dashboard from '../Dashboard/dashboard';
import '../Hotel/AddHotel.css';
import axios from 'axios'; // Make sure to install axios if you haven't already
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Footer from '../Dashboard/footer';

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
    roomno: number;
    bathrooms: number;
    description: string;
    adults: number;
    kids: number;
  };
}

interface HotelDoc {
  _id: string;
  hotelId: {
    hotelname: string;
  };
  rooms: RoomDoc[];
  newroomno: number;
}

interface UserDoc {
  _id: string;
  email: string;
  password: string;
}

interface OrderDoc {
  _id: string;
  userId: UserDoc;
  hotels: HotelDoc[];
}

const CancelViewBooking = () => {
  const [orderData, setOrderData] = useState<OrderDoc[]>([]);

  useEffect(() => {
    const fetchCancelledBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Authorization token is missing.');
          return;
        }
  
        const response = await axios.get('http://localhost:4561/api/delete/all', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
  
        setOrderData(response.data.cancelledOrders || []); // Assuming the correct structure
  
      } catch (error) {
        console.error('There was an error!', error);
      }
    };
  
    fetchCancelledBookings();
  }, []);
  

  return (
    <>
      <Dashboard />
      <div className="container44">
        <div className="table-responsive">
          <table className="table table-bordered">
            <colgroup>
              
              <col style={{ width: '20%' }} />
              <col style={{ width: '20%' }} />
              <col style={{ width: '20%' }} />
              <col style={{ width: '20%' }} />
            </colgroup>
            <thead>
              <tr>
               
                <th scope="col">
                  <b>Email</b>
                </th>
                <th scope="col">
                  <b>Hotel Name</b>
                </th>
                <th scope="col">
                  <b>Rooms Booked</b>
                </th>
                <th scope="col">
                  <b>Rooms Details</b>
                </th>
              </tr>
            </thead>
            <tbody>
              {orderData.map((order, index) => (
                <tr key={index}>
                
                  <td>{order.userId.email}</td>
                  <td>{order.hotels[0].hotelId.hotelname}</td>
                  <td>{order.hotels[0].newroomno}</td>
                  {order.hotels[0].rooms.map((room) => (
                    <div key={room.roomId._id}>
                      <td>Room Name: {room.roomId.roomname}</td>
                      <td>Total Price: {room.roomId.price * order.hotels[0].newroomno}</td>
                    </div>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <br />
      <br />
      <br />
      
    </>
  );
};

export default CancelViewBooking;
