import React, { useEffect, useState } from 'react';
import Dashboard from '../Dashboard/dashboard';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Footer from '../Dashboard/footer';
import { useNavigate } from 'react-router-dom';

interface RoomDoc {
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
  hotelnames:string;
}

const ViewRooms = () => {
  const [rooms, setRooms] = useState<RoomDoc[]>([]);
  const navigate= useNavigate();
  const handleDelete = async (roomId: string) => {
    try {
      const response = await axios.delete(`http://localhost:4561/api/deleterooms/rooms/${roomId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Handle the response as needed, e.g., update the state or show a success message
      console.log(response.data);

      // After deleting, you may want to refresh the rooms data
      const updatedRooms = rooms.filter((room) => room._id !== roomId);
      setRooms(updatedRooms);
    } catch (error) {
      console.error('Error deleting room:', error);
      // Handle the error, show an error message, etc.
    }
  };
  const handleUpdate= async (roomId: string) => {
    navigate(`/updateRoom/${roomId}`)
  };



  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Authorization token is missing.');
      return;
    }

    axios.get('http://localhost:4561/api/viewrooms/rooms', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        setRooms(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  return (
    <>
      <Dashboard />
      <div className='container55'>
        <div className="table-responsive">
          <table className="table" style={{ tableLayout: 'fixed' }}>
            <colgroup>
            
              <col style={{ width: '22%' }} />
              <col style={{ width: '50%' }} />
              <col style={{ width: '20%' }} />
              <col style={{ width: '20%' }} />
              <col style={{ width: '60%' }} />
              <col style={{ width: '20%' }} />
              <col style={{ width: '20%' }} />
              <col style={{ width: '20%' }} />
              <col style={{ width: '20%' }} />
              <col style={{ width: '15%' }} />
              <col style={{ width: '15%' }} />
              <col style={{ width: '20%' }} />
              <col style={{ width: '20%' }} />
             
              
            </colgroup>
            <thead>
              <tr>
               
                <th scope="col">Room Name</th>
                <th scope="col" >Room Id</th>
                <th scope="col" >Available Rooms</th>
                <th scope="col" >Price</th>
                <th scope="col" >Images</th>
                <th scope="col" >Start Date</th>
                <th scope="col">End Date</th>
                <th scope="col" >Bedrooms</th>
                <th scope="col">Bathrooms</th>
                <th scope="col">Adults</th>
                <th scope="col" >Kids</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
               
              </tr>
            </thead>
            <tbody>
            {rooms.map((room, index) => (
                <tr key={index}>
              
                  <td >{room.roomname}</td>
                  <td >{room._id}</td>
                  <td >{room.roomno}</td>
                  <td >{room.price}</td>
                  <td >
                    {room.image.map((image, index) => (
                      <img key={index} src={'http://localhost:4561/uploads/' + encodeURIComponent(image)} alt={`room ${index}`} style={{width: '100px', height: '100px'}} />
                    ))}
                
                  </td>
                  <td >{new Date(room.startdate).toDateString()}</td>
                  <td>{new Date(room.enddate).toDateString()}</td>
                  <td >{room.bedrooms}</td>
                  <td >{room.bathrooms}</td>
                  <td >{room.adults}</td>
                  <td>{room.kids}</td>
                  <td ><a onClick={() => handleUpdate(room._id)}><FontAwesomeIcon icon={faEdit} /></a></td>
                  <td> <a onClick={() => handleDelete(room._id)}><FontAwesomeIcon icon={faTrash} /></a></td>
                 
                  </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>< br />< br />< br />< br />
    
    </>
  );
};

export default ViewRooms;
