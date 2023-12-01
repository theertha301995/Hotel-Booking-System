import React, { useRef, useState } from 'react';
import axios from 'axios';
import Dashboard from '../Dashboard/dashboard';
import '../Hotel/AddHotel.css';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../Dashboard/footer';

const AddRoom: React.FC = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const { roomId } = useParams<{ roomId: string }>();
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

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
        const response = await axios.put(`http://localhost:4561/api/roomupdate/rooms/${roomId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response.data);
        setSuccessMessage('Room updated successfully!');
        setTimeout(() => {
          setSuccessMessage('');
          navigate('/viewrooms'); // Navigate to viewhotel page
        }, 2000);
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <>
    <Dashboard />
    <div className="formbold-main-wrapper">
      {/* Author: FormBold Team */}
      {/* Learn More: https://formbold.com */}
      <div className="formbold-form-wrapper">
        <form ref={formRef} action="https://formbold.com/s/FORM_ID" method="POST" onSubmit={handleSubmit}>
          <div className="formbold-mb-5">
            <label htmlFor="name" className="formbold-form-label">
              Room Name
            </label>
            <input
              type="text"
              name="roomname"
              id="roomname"
              placeholder="Room Name"
              className="formbold-form-input"
            />
          </div>
          <div className="formbold-mb-5">
  <label htmlFor="roomno" className="formbold-form-label">
    No of Rooms
  </label>
  <input
    type="number"
    name="roomno"
    id="roomno"
    placeholder="Room Number"
    className="formbold-form-input"
  />
</div>
          <div className="formbold-mb-5">
            <label htmlFor="Description" className="formbold-form-label">
              Description
            </label>
            <textarea
              
              name="description"
              id="description"
              placeholder="Describe about the room"
              className="formbold-form-input"
            />
          </div>
  
          <div className="formbold-mb-5">
            <label htmlFor="price" className="formbold-form-label">
            Price
            </label>
            <input
              type="number"
              name="price"
              id="price"
              placeholder="Enter the price"
              className="formbold-form-input"
            />
          </div>
          <div className="flex flex-wrap formbold--mx-3">
            <div className="w-full sm:w-half formbold-px-3">
              <div className="formbold-mb-5 w-full">
                <label htmlFor="startdate" className="formbold-form-label">
                  Start Date
                </label>
                <input type="date" name="startdate" id="startdate" className="formbold-form-input" />
              </div>
            </div>
            <div className="w-full sm:w-half formbold-px-3">
              <div className="formbold-mb-5">
                <label htmlFor="endate" className="formbold-form-label">
                  End Date
                </label>
                <input type="date" name="enddate" id="enddate" className="formbold-form-input" />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap formbold--mx-3">
            <div className="w-full sm:w-half formbold-px-3">
              <div className="formbold-mb-5 w-full">
                <label htmlFor="bathrooms" className="formbold-form-label">
                  Bathrooms
                </label>
                <input type="number" name="bathrooms" id="bathrooms" className="formbold-form-input" />
              </div>
            </div>
            <div className="w-full sm:w-half formbold-px-3">
              <div className="formbold-mb-5">
                <label htmlFor="price" className="formbold-form-label">
                  Bedrooms
                </label>
                <input type="number" name="bedrooms" id="bedrooms" className="formbold-form-input" />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap formbold--mx-3">
            <div className="w-full sm:w-half formbold-px-3">
              <div className="formbold-mb-5 w-full">
                <label htmlFor="adults" className="formbold-form-label">
                  Adults
                </label>
                <input type="number" name="adults" id="adults" className="formbold-form-input" />
              </div>
            </div>
            <div className="w-full sm:w-half formbold-px-3">
              <div className="formbold-mb-5">
                <label htmlFor="kids" className="formbold-form-label">
                  Kids
                </label>
                <input type="number" name="kids" id="kids" className="formbold-form-input" />
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
            Update Rooms
            </button>
            {successMessage && <p>{successMessage}</p>}
          </div>
        </form>
      </div>
    </div>

    </>
  );
};

export default AddRoom;
