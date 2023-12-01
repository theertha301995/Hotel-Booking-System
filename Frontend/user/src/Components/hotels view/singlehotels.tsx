import React, { useEffect, useState } from 'react';
import './singleHotels.css';
import Navbar from '../Layout/layout';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
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
    roomno: number;
    bathrooms:number;
    description:string;
    adults:number;
    kids:number;
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

const SingleHotel: React.FC = () => {
  const [hotel, setHotel] = useState<HotelDoc | undefined>();
  const [quantity, setQuantity] = useState(1);
  const { hotelId } = useParams<{ hotelId: string }>();
  const navigate = useNavigate();
  
  
  const handleBookNow = async (selectedRoomId: string) => {
    console.log("Book Now button clicked");
  
    // Check if hotel data is available
    if (!hotel) {
      console.error('Hotel data is not available.');
      return;
    }
  
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Authorization token is missing.');
        return;
      }
  
      // Make a POST request to the add to cart API endpoint
      const response = await axios.post('http://localhost:4561/api/addcart/cart', {
        hotels: [
          {
            hotelId: hotel._id,
            newroomno: quantity,
            rooms: [{
              roomId: selectedRoomId
            }],
          }
        ],
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      console.log('API response:', response.data);
  
      // Navigate to the cart page
      navigate(`/viewcart/${selectedRoomId}`);
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };
  


  const handleThumbnailClick = (imgUrl: string) => {
    const mainImg = document.getElementById('main') as HTMLImageElement;
    if (mainImg) {
      mainImg.src = imgUrl;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Authorization token is missing.');
          return;
        }

        const response = await axios.get(`http://localhost:4561/api/viewshotel/${hotelId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        console.log('API response:', response.data);

        if (response.data && typeof response.data === 'object') {
          setHotel(response.data.hotel);
        } else {
          console.error('Invalid response structure. response.data should be an object.');
        }
      } catch (error) {
        console.error('Error fetching hotel data:', error);
      }
    };

    fetchData();

    const thumbnails = document.getElementById("thumbnails");
    const imgs = thumbnails?.getElementsByTagName("img");
    const main = document.getElementById("main") as HTMLImageElement;

    
      
  }, [setHotel,hotelId]);


  return (
    <>
    <div>
      <Navbar />

      {hotel && (
        <div>
          <img src={'http://localhost:4561/uploads/' + encodeURIComponent(hotel.image[0])} alt="Hotel Image" id="main" />
          <div id="thumbnails">
            {hotel.image.map((img, index) => (
              <img
                key={index}
                src={'http://localhost:4561/uploads/' + encodeURIComponent(img)}
                alt={`Image ${index}`}
                onClick={() => handleThumbnailClick('http://localhost:4561/uploads/' + encodeURIComponent(img))}
              />
            ))}
          </div>
        </div>
      )}

      {hotel && (
        <div>
          <div className='container11'>
            <div key={hotel._id} className="hotel-info">
              <h2>{hotel.hotelname}</h2>
            </div>
          </div>
          <div className="location">
            <i className="fa fa-map-marker"></i>
            <span>{hotel.location}</span>
          </div>
        </div>
      )}

      <div className="container21">
        <h1>Amenities</h1>
        <div className="row21">
          <div className="service">
            <h2>{hotel?.amenity1}</h2>
          </div>
          <div className="service">
            <h2>{hotel?.amenity2}</h2>
          </div>
          <div className="service">
            <h2>{hotel?.amenity3}</h2>
          </div>
          <div className="service">
            <h2>{hotel?.amenity4}</h2>
          </div>
        </div>
      </div>

      <div className="container31">
    <h1>Check Our Rooms</h1>
</div>

{hotel?.rooms.map((room) => (
    <div >
        <div >
        <div>
        <div className="wrapper " style={{width:'100%' , overflow:'hidden'}}>
        {/* {room.roomId.image.map((img) => ( */}
      <div className="photobanner">
     
        <img className="first" src={'http://localhost:4561/uploads/' + encodeURIComponent(room.roomId.image[0])} alt="" />
        <img className='img-123' src={'http://localhost:4561/uploads/' + encodeURIComponent(room.roomId.image[1])} alt="" />
        <img className='img-123' src={'http://localhost:4561/uploads/' + encodeURIComponent(room.roomId.image[2])} alt="" />
        <img className='img-123' src={'http://localhost:4561/uploads/' + encodeURIComponent(room.roomId.image[3])} alt="" />
      </div>
        {/* ))} */}
    </div> </div>
<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            <div className="product-content container201">
                <h2 className="product-title">{room.roomId.roomname}</h2>

                <div className="product-price">
                    <p className="new-price">Price: <span>₹{room.roomId.price}</span></p>
                </div>

                <div className="product-detail">
                    <h2>About this Room:</h2>
                    <p>{room.roomId.description}</p>
                    <p>
                    {room.roomId.description}
                    </p>
                    <ul>
                        <li>Bedrooms: <span>{room.roomId.bedrooms}</span></li>
                        <li>Bathrooms <span>{room.roomId.bathrooms}</span></li>
                        <li>Adults: <span>{room.roomId.adults}</span></li>
                        <li>Kids: <span>{room.roomId.kids}</span></li>
                        <li>Booking Available From: <span>{new Date(room.roomId.startdate).toDateString()}</span>  To:  <span>{new Date(room.roomId.enddate).toDateString()}</span></li>
                    </ul>
                </div>

                <div className="purchase-info">
          Rooms Required:  <input
              type="number"
              min="0"
              id="newroomno"
              name="newroomno"
              defaultValue="1"
              onChange={(e) => setQuantity(Number(e.target.value))}
            />

                    <button type="button" className="btn78" onClick={()=>handleBookNow(room.roomId._id)}>
                        Add to Cart <i className="fas fa-shopping-cart"></i>
                    </button>
                  
                </div>
            </div>
        </div>
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
</>
);
};

export default SingleHotel;