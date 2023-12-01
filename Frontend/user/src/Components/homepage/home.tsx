
import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './home.css';
import Background from '../../Assets/hotels.jpg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  Footer  from '../../Components/Layout/footer'


interface HotelModel {
  _id: string;
  hotelname: string;
  location: string;
  amenities: string[];
  image: string[];
  rooms: string[];
  deleted: boolean;
}

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState<HotelModel[]>([]);
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [emails, setEmails] = useState('');
  const [phone, setPhone] = useState('');
  const [msg, setMsg] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.get(`http://localhost:4561/api/search`, {
        params: {
          location,
          startdate: checkIn,
          enddate: checkOut,
        },
      });

      console.log('Search Results:', response.data.results);
      setHotels(response.data.results);

      if (response.data.results.length > 0) {
        navigate('/viewhotels', { state: { hotels: response.data.results } });
      } else {
        toast.error('No hotels found for the given criteria');
      }
    } catch (error) {
      console.error('Error during search:', error);
      // Implement error handling logic
    }
  };


  const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post(`http://localhost:4561/api/contact`, {
        
          fname,
         lname,
         emails,
         phone,
         msg
        
      });

      console.log('Contact Results:', response.data);
     

      console.log(response.data);
      setSuccessMessage('Message Added Successfully !');
  setTimeout(() => {
    setSuccessMessage('');
   
  }, 2000);
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const response = await axios.get('http://localhost:4561/api/user/viewhotels');
        setHotels(response.data.results);
      } catch (error) {
        console.error('Error fetching hotel data:', error);
      }
    };

    fetchHotelData();
  },[]);
   const handleViewHotel = (hotelId: string) => {
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
      <div className="container-fluid p-0 position-relative">
        <div className="position-relative">
          <img src={Background} className="d-block w-100" alt="Landing Image" style={{ height: '90vh' }} />
          <div className="search-bar start-50 translate-middle bg-white p-3 rounded-3 p-5 searchbox">
            <form onSubmit={handleSubmit}>
              <div className="row g-2">
                <div className="col-md">
                  <label htmlFor="check-in" className="form-label">
                    Check-In
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="check-in"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                  />
                </div>
                <div className="col-md">
                  <label htmlFor="check-out" className="form-label">
                    Check-Out
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="check-out"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                  />
                </div>
                <div className="col-md">
                  <label htmlFor="Location" className="form-label">
                    Location
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="place"
                    placeholder="Enter a destination"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <div className="col-md-auto d-flex align-items-end">
                  <button type="submit" className="button-21 btn-primary">
                    Search Hotels
                  </button>
                </div>
              </div>
            </form>
          </div>
          <br/><br/><br/>
        <div className="text-center mt-5">
          <h2>Featured Hotels Recommended For You</h2>
        </div>
      </div>
     
      <section >
        <div className="container" style={{marginTop:'-12rem'}}>
          <div className="row justify-content-center">
          {hotels.length > 0 && ( // Check if there are hotels in the array
        <div className="col-12 col-lg-4">
          <div className="card my-5">
            <img
              src={`http://localhost:4561/uploads/${encodeURIComponent(hotels[0].image[1])}`}
              className="card-img-top"
              alt="Hotel Image"
            />
            <h5 className="card-title text-light">{hotels[0].hotelname}</h5>
            <a href="#" className="btn btn-light" onClick={() => handleViewHotel(hotels[0]._id)}>See Details</a>
          </div>
        </div>
      )}
              {hotels.length > 0 && ( // Check if there are hotels in the array
        <div className="col-12 col-lg-4">
          <div className="card my-5">
            <img
              src={`http://localhost:4561/uploads/${encodeURIComponent(hotels[2].image[0])}`}
              className="card-img-top"
              alt="Hotel Image"
            />
            <h5 className="card-title text-light">{hotels[2].hotelname}</h5>
            <a href="#" className="btn btn-light"  onClick={() => handleViewHotel(hotels[2]._id)}>See Details</a>
          </div>
        </div>
      )}
             {hotels.length > 0 && ( // Check if there are hotels in the array
        <div className="col-12 col-lg-4">
          <div className="card my-5">
            <img
              src={`http://localhost:4561/uploads/${encodeURIComponent(hotels[4].image[0])}`}
              className="card-img-top"
              alt="Hotel Image"
            />
            <h5 className="card-title text-light">{hotels[4].hotelname}</h5>
            <a href="#" className="btn btn-light" onClick={() => handleViewHotel(hotels[4]._id)}>See Details</a>
          </div>
        </div>
      )}
            
          </div>
        </div>
        <br />
        <div className="container">
          <div className="row justify-content-center">
          {hotels.length > 0 && ( // Check if there are hotels in the array
        <div className="col-12 col-lg-4">
          <div className="card my-5">
            <img
              src={`http://localhost:4561/uploads/${encodeURIComponent(hotels[1].image[0])}`}
              className="card-img-top"
              alt="Hotel Image"
            />
            <h5 className="card-title text-light">{hotels[1].hotelname}</h5>
            <a href="#" className="btn btn-light" onClick={() => handleViewHotel(hotels[1]._id)}>See Details</a>
          </div>
        </div>
      )}
             {hotels.length > 0 && ( // Check if there are hotels in the array
        <div className="col-12 col-lg-4">
          <div className="card my-5">
            <img
              src={`http://localhost:4561/uploads/${encodeURIComponent(hotels[3].image[2])}`}
              className="card-img-top"
              alt="Hotel Image"
            />
            <h5 className="card-title text-light">{hotels[3].hotelname}</h5>
            <a href="#" className="btn btn-light" onClick={() => handleViewHotel(hotels[3]._id)}>See Details</a>
          </div>
        </div>
      )}
             {hotels.length > 0 && ( // Check if there are hotels in the array
        <div className="col-12 col-lg-4">
          <div className="card my-5">
            <img
              src={`http://localhost:4561/uploads/${encodeURIComponent(hotels[5].image[0])}`}
              className="card-img-top"
              alt="Hotel Image"
            />
            <h5 className="card-title text-light">{hotels[5].hotelname}</h5>
            <a href="#" className="btn btn-light" onClick={() => handleViewHotel(hotels[5]._id)}>See Details</a>
          </div>
        </div>
      )}
            
          </div>
        </div>
        <br/>
      </section>
      
    <section  id='formcontact'>
    <div className="container129">
      <div className="bg-light">
        <div className="row">
          <div className="col-lg-8 col-md-12 p-5 bg-white rounded-3">
            <div className="d-flex mb-3 flex-column">
              <h1 className="h5 text-capitalize my-4">What service You need ?</h1>
              <div className="d-flex flex-wrap">
                
              </div>
            </div>
            <form className="row mb-3" onSubmit={handleForm}>
              <div className="col-md-6 p-3">
                <input required placeholder="first name" type="text" name="" id="fname" value={fname}
                    onChange={(e) => setFname(e.target.value)}/>
              </div>
              <div className="col-md-6 p-3">
                <input required placeholder="last name" type="text" name="" id="lname" value={lname}
                    onChange={(e) => setLname(e.target.value)}/>
              </div>
              <div className="col-md-6 p-3">
                <input required placeholder="E-mail" type="email" name="" id="emails" value={emails}
                    onChange={(e) => setEmails(e.target.value)} />
              </div>
              <div className="col-md-6 p-3">
                <input required placeholder="phone" type="phone" name="" id="phone" value={phone}
                    onChange={(e) => setPhone(e.target.value)}/>
              </div>
              <div className="col-md">
                <textarea required name="" placeholder="write your message" id="msg" cols={30} rows={1} value={msg}
                    onChange={(e) => setMsg(e.target.value)}></textarea>
              </div>
              <div className="text-end mt-4">
                <input className="button-273 px-4 py-3 btn273-outline-dark" type="submit" value="Send Message" />
                {successMessage && <p>{successMessage}</p>}
              </div>
            </form>
          </div>
          <div className="col-lg-4 col-md-12 text-white aside px-4 py-5">
            <div className="mb-5">
              <h1 className="h3">Contact Information</h1>
              <p className="opacity-50">
                <small>
                  Fill out the from and we will get back to you within 24 hours
                </small>
              </p>
            </div>
            <div className="d-flex flex-column px-0">
              <ul className="m-0 p-0">
                <li className="d-flex justify-content-start align-items-center mb-4">
                  <span className="opacity-50 d-flex align-items-center me-3 fs-2">
                  <p className='fas fa-phone'></p>
                  </span>
                  <span>9876543212</span>
                </li>
                <li className="d-flex align-items-center r mb-4">
                  <span className="opacity-50 d-flex align-items-center me-3 fs-2">
                    <p className="far fa-envelope-open"></p>
                  </span>
                  <span>Help@contact.com</span>
                </li>
                <li className="d-flex justify-content-start align-items-center mb-4">
                  <span className="opacity-50 d-flex align-items-center me-3 fs-2">
                    <p className="fa fa-map-pin" aria-hidden="true"></p>
                  </span>
                  <span>52 Buddy Ln Conway, <br />
                    Arkansas(AR), 72032
                  </span>
                </li>
                
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    </section>
   <Footer />
<ToastContainer />
</div>
</>
  );
};

export default HomePage;
