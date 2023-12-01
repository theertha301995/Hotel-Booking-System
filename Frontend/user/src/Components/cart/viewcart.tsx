import React, { useEffect, useState } from 'react';
import Navbar from '../Layout/layout';
import './viewcart.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../Layout/footer'
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

interface HotelDoc {
  hotelId: {
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
    deleted: boolean;
  };
  rooms: RoomDoc[];
  newroomno: number;
}

interface CartDocument {
  _id: string;
  hotels: HotelDoc[];
}

const ViewCart = () => {
  const [cartData, setCartData] = useState<CartDocument[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
const navigate =useNavigate();

  const handleDelete = (id: string) => {
    const cartToDelete = cartData.find(cart => cart._id === id);
    let totalToDelete = 0;
  
    if (cartToDelete) {
      cartToDelete.hotels.forEach(hotel => {
        hotel.rooms.forEach(room => {
          totalToDelete += room.roomId.price * hotel.newroomno;
        });
      });
    }
  
    setCartData(cartData.filter(cart => cart._id !== id));
    setTotalAmount(totalAmount - totalToDelete);
  };
  const handleBookNow = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Authorization token is missing.');
      return;
    }
  
    try {
      const response = await axios.post(
        'http://localhost:4561/api/addorder/order', // Replace with your actual endpoint
        cartData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 201) {
        toast.success('Order created successfully:', response.data);
        // Navigate to the checkout page
        navigate('/');
      } else {
        toast.error('Error creating order:', response.data);
        navigate('/viewhotel');
      }
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };
  const handleAvailabilityNow = async (roomId: string) => {
   
      navigate(`/availability/${roomId}`);
    
  };
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Authorization token is missing.');
      return;
    }

    axios
      .get('http://localhost:4561/api/viewcart/cartitems', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response: any) => {
        setCartData(response.data);

        // Calculate total amount
        let total = 0;
        response.data.forEach((cart: CartDocument) => {
          cart.hotels.forEach(hotel => {
            hotel.rooms.forEach(room => {
              total += room.roomId.price * hotel.newroomno;
            });
          });
        });
        setTotalAmount(total);
        
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  }, []);

  



  return (
    <>
      <Navbar />
      <div style={{ padding: '20px',}}>
        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '5px', width:'80%' , margin:'50px 130px'}}>
          <table
            style={{
              width: '100%',
            
              marginTop: '20px',
            }}
          >
            <colgroup>
              <col style={{ width: '10%' }} />
              <col style={{ width: '20%' }} />
              <col style={{ width: '20%' }} />
              <col style={{ width: '20%' }} />
              <col style={{ width: '20%' }} />
              <col style={{ width: '10%' }} />
              <col style={{ width: '20%' }} />
            </colgroup>
            <thead>
              <tr style={{ borderBottom: '2px solid #ddd' }}>
               
                <th style={{ padding: '20px', textAlign: 'left' }}>Image</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Hotel Name</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Price</th>
                <th style={{ padding: '0px', textAlign: 'left' }}>Rooms</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Room Availability</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {cartData.map((cart, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                  
                  {cart.hotels.map((hotel, hotelIndex) => (
                    <React.Fragment key={`hotel-${hotelIndex}`}>
                      <td style={{ padding: '10px', textAlign: 'left' }}>
                        <img
                          src={'http://localhost:4561/uploads/' + encodeURIComponent(hotel.hotelId.image[0])}
                          alt="Cart Item"
                          style={{ width: '100px', height: '100px' }}
                        />
                      </td>
                      <td style={{ padding: '10px', textAlign: 'left' }}>{hotel.hotelId.hotelname}</td>
                      {hotel.rooms.map((room, roomIndex) => (
                        <React.Fragment key={`room-${roomIndex}`}>
                          <td style={{ padding: '10px', textAlign: 'left' }}>₹{room.roomId.price}</td>
                        </React.Fragment>
                      ))}
                      <td style={{ padding: '20px', textAlign: 'left' }}>{hotel.newroomno}</td>
                    </React.Fragment>
                  ))}
                   <td style={{ padding: '10px', textAlign: 'left' }}>
                  <button  onClick={() => handleAvailabilityNow((cart.hotels[0].rooms[0].roomId._id))} className='button-3'>Room Availability</button>
                </td>
                  <td style={{ padding: '10px', textAlign: 'left' }}>
                    <a onClick={() => handleDelete(cart._id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </a>
                  </td>
                 
                </tr>
              ))}
            </tbody>
            <tfoot>
              <br />  <br />
            <tr>
          <td colSpan={4} style={{ textAlign: 'right', fontWeight: 'bold' }}>
            Total Amount:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </td>
          <td colSpan={2} style={{ border: '2px solid black', fontWeight: 'bold', height:'50px' }}>
            &nbsp;&nbsp;&nbsp;₹{totalAmount}
          </td>
        </tr>
        <br/>
              <tr><br />  
                <td colSpan={6} style={{ textAlign: 'right'  }}>
                  <button  onClick={handleBookNow}style={{ padding: '10px', fontSize: '16px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Book Now</button>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <ToastContainer />
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
    </>
  );
};

export default ViewCart;