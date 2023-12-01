import React, { useEffect, useState } from 'react';
import Dashboard from '../Dashboard/dashboard';
import './AddHotel.css'
import axios from 'axios'; // Make sure to install axios if you haven't already
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Footer from '../Dashboard/footer';
import { useNavigate } from 'react-router-dom';

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
  hotelname: string;
  location: string;
  amenity1: string;
  amenity2: string;
  amenity3: string;
  amenity4: string;
  amenity5: string;
  amenity6: string;
  image: string[];
  rooms: RoomDoc[];
  deleted: boolean;
}

const ViewHotel = () => {
  const [hotels, setHotels] = useState<HotelDoc[]>([]);
  const navigate=useNavigate();
  const handleDelete = async (hotelId: string) => {
    try {
      const response = await axios.delete(`http://localhost:4561/api/deletehotel/${hotelId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Handle the response as needed, e.g., update the state or show a success message
      console.log(response.data);

      // After deleting, you may want to refresh the rooms data
      const updatedHotels = hotels.filter((hotel) => hotel._id !== hotelId);
      setHotels(updatedHotels);
    } catch (error) {
      console.error('Error deleting room:', error);
      // Handle the error, show an error message, etc.
    }
  };
  const handleUpdate= async (hotelId: string) => {
    navigate(`/updateHotel/${hotelId}`)
  };

  useEffect(() => {
    const token = localStorage.getItem('token'); // or wherever you store your token
    if (!token) {
      console.error('Authorization token is missing.');
      return;
    }
  
    axios.get('http://localhost:4561/api/viewhotel', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        setHotels(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  return (
    <>
      <Dashboard />
      <div className='container44'>
        <div className="table-responsive">
          <table className="table" style={{tableLayout: 'fixed'}}>
            <colgroup>
             
              <col style={{width: '20%'}}/>
              <col style={{width: '20%'}}/>
              <col style={{width: '20%'}}/>
              <col style={{width: '20%'}}/>
              <col style={{width: '50%'}}/>
              <col style={{width: '20%'}}/>
              <col style={{width: '20%'}}/>
             
            </colgroup>
            <thead>
              <tr>
                
                <th scope="col">Hotel Name</th>
                <th scope="col" >Location</th>
                <th scope="col" >Rooms</th>
                <th scope="col" >Amenities</th>
                <th scope="col" >Images</th>
                <th scope="col" >Delete</th>
                <th scope="col" >Edit</th>
              </tr>
            </thead>
            <tbody>
              {hotels.map((hotel, index) => (
                <tr key={index}>
                  
                  <td >{hotel.hotelname}</td>
                  <td >{hotel.location}</td>
                  <td >
                    {hotel.rooms.map(room => (
                      <div key={room.roomId._id}>
                        <p>Room Name:{room.roomId.roomname}</p>
                        <p>Price:{room.roomId.price}</p>
                        <p>Start Date: {new Date(room.roomId.startdate).toDateString()}</p>
                        <p>End Date: {new Date(room.roomId.enddate).toDateString()}</p>
                      </div>
                    ))}
                  </td>
                  <td >
                    {[hotel.amenity1, hotel.amenity2, hotel.amenity3, hotel.amenity4, hotel.amenity5, hotel.amenity6].map((amenity, index) => (
                      <p key={index}>{amenity}</p>
                    ))}
                  </td>
                  <td style={{height:'100%' , width:'100%'}}>
                    {hotel.image.map((image, index) => (
                      <img key={index} src={'http://localhost:4561/uploads/' + encodeURIComponent(image)} alt={`hotel ${index}`} style={{width: '100px', height: '100px'}} />
                    ))}
                  </td>
                  <td ><a onClick={() => handleDelete(hotel._id)}><FontAwesomeIcon icon={faTrash} /></a></td>
                  <td ><a onClick={() => handleUpdate(hotel._id)}><FontAwesomeIcon icon={faEdit} /></a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div><br /><br /><br />
    

    </>
  );
  
  
};

export default ViewHotel;