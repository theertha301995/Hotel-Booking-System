import React, { useRef, useState } from 'react';
import axios from 'axios'; // Make sure to install axios with npm install axios
import Dashboard from '../Dashboard/dashboard';
import './AddHotel.css'

import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../Dashboard/footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


const UpdateHotel: React.FC = () => {
    const formRef = useRef<HTMLFormElement | null>(null);
    const [rooms, setRooms] = useState([{ roomId: '', price: '' }]);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
    const { hotelId } = useParams<{ hotelId: string }>();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formRef.current !== null) {
          const formData = new FormData(formRef.current);
          try {
            const token = localStorage.getItem('token');
        if (!token) {
          console.error('Authorization token is missing.');
          return;
        }
            const response = await axios.put(`http://localhost:4561/api/updatehotel/${hotelId}`, formData, {
                
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
              }
            });
            console.log(response.data);
            setSuccessMessage('Hotel updated successfully!');
        setTimeout(() => {
          setSuccessMessage('');
          navigate('/viewhotel'); // Navigate to viewhotel page
        }, 2000);
          } catch (error) {
            console.error(error);
          }
        }
      };
      const addRoomIdField = () => {
        setRooms([...rooms, { roomId: '', price: '' ,}]);
    };

    const handleRoomChange = (index: number, key: 'roomId' | 'price', value: string) => {
      const newRooms = [...rooms];
      newRooms[index][key] = value;
      setRooms(newRooms);
  };

  return (
    <>
    <Dashboard />
    <div className="formbold-main-wrapper">
      {/* Author: FormBold Team */}
      {/* Learn More: https://formbold.com */}
      <div className="formbold-form-wrapper">
        <form ref={formRef}  method="POST" onSubmit={handleSubmit}>
          <div className="formbold-mb-5">
            <label htmlFor="name" className="formbold-form-label">
              Hotel Name
            </label>
            <input
              type="text"
              name="hotelname"
              id="hotelname"
              placeholder="Hotel Name"
              className="formbold-form-input"
            />
          </div>
          
          
          <div className="formbold-mb-5">
            <label htmlFor="location" className="formbold-form-label">
            Location
            </label>
            <input
              type="location"
              name="location"
              id="location"
              placeholder="Enter the location"
              className="formbold-form-input"
            />
          </div>
          {rooms.map((room, index) => (
            <div key={index}>
              <div className="formbold-mb-5">
                <label htmlFor={`roomId${index}`} className="formbold-form-label">
                  Room Id 
                </label>
                <input
                  type="text"
                  name={`rooms[${index}][roomId]`}
                  id={`roomId${index}`}
                  placeholder="Enter the room ID"
                  className="formbold-form-input"
                  value={room.roomId}
                  onChange={e => handleRoomChange(index, 'roomId', e.target.value)}
                />
              </div>
              </div>
          ))}

          <a onClick={addRoomIdField}><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
           
          </a>
          <div className="flex flex-wrap formbold--mx-3">
            <div className="w-full sm:w-half formbold-px-3">
              <div className="formbold-mb-5 w-full">
                <label htmlFor="amenity1" className="formbold-form-label">
                  Amenity1
                </label>
                <input type="text" name="amenity1" id="amenity1" className="formbold-form-input" />
              </div>
            </div>
            <div className="w-full sm:w-half formbold-px-3">
              <div className="formbold-mb-5">
                <label htmlFor="amenity2" className="formbold-form-label">
                  Amenity2
                </label>
                <input type="text" name="amenity2" id="amenity2" className="formbold-form-input" />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap formbold--mx-3">
            <div className="w-full sm:w-half formbold-px-3">
              <div className="formbold-mb-5 w-full">
                <label htmlFor="amenity3" className="formbold-form-label">
                  Amenity3
                </label>
                <input type="text" name="amenity3" id="amenity3" className="formbold-form-input" />
              </div>
            </div>
            <div className="w-full sm:w-half formbold-px-3">
              <div className="formbold-mb-5">
                <label htmlFor="amenity4" className="formbold-form-label">
                  Amenity4
                </label>
                <input type="text" name="amenity4" id="amenity4" className="formbold-form-input" />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap formbold--mx-3">
            <div className="w-full sm:w-half formbold-px-3">
              <div className="formbold-mb-5 w-full">
                <label htmlFor="amenity5" className="formbold-form-label">
                  Amenity5
                </label>
                <input type="text" name="amenity5" id="amenity5" className="formbold-form-input" />
              </div>
            </div>
            <div className="w-full sm:w-half formbold-px-3">
              <div className="formbold-mb-5">
                <label htmlFor="amenity6" className="formbold-form-label">
                  Amenity6
                </label>
                <input type="text" name="amenity6" id="amenity6" className="formbold-form-input" />
              </div>
            </div>
          </div>

          <div className="formbold-mb-5 formbold-pt-3">
            <label className="formbold-form-label formbold-form-label-2">Image Details</label>
            <div className="flex flex-wrap formbold--mx-3">
              <div className="w-full sm:w-half formbold-px-3">
                <div className="formbold-mb-5">
                  <input
                    type="file"
                    name="image"
                    id="image"
                    placeholder="Enter first image"
                    className="formbold-form-input"
                  />
                </div>
              </div>
              <div className="w-full sm:w-half formbold-px-3">
                <div className="formbold-mb-5">
                  <input
                    type="file"
                    name="image"
                    id="image"
                    placeholder="Enter second image"
                    className="formbold-form-input"
                  />
                </div>
              </div>
              <div className="w-full sm:w-half formbold-px-3">
                <div className="formbold-mb-5">
                  <input
                    type="file"
                    name="image"
                    id="image"
                    placeholder="Enter third image"
                    className="formbold-form-input"
                  />
                </div>
              </div>
              <div className="w-full sm:w-half formbold-px-3">
                <div className="formbold-mb-5">
                  <input
                    type="file"
                    name="image"
                    id="image"
                    placeholder="Enter fourth image"
                    className="formbold-form-input"
                  />
                </div>
              </div>
              <div className="w-full sm:w-half formbold-px-3">
                <div className="formbold-mb-5">
                  <input
                    type="file"
                    name="image"
                    id="image"
                    placeholder="Enter fifth image"
                    className="formbold-form-input"
                  />
                </div>
              </div>
              <div className="w-full sm:w-half formbold-px-3">
                <div className="formbold-mb-5">
                  <input
                    type="file"
                    name="image"
                    id="image"
                    placeholder="Enter sixth image"
                    className="formbold-form-input"
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <button type="submit" className="formbold-btn">
            UpdateHotel
            </button>
            {successMessage && <p>{successMessage}</p>}
          </div>
        </form>
      </div>
    </div>
   
    </>
  );
};

export default UpdateHotel;
