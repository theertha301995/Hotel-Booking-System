// App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Layout/layout';
import HomePage from './Components/homepage/home';
import LoginForm from './Components/credentials/login';
import RegForm from './Components/credentials/reg';
import HotelRoom from './Components/hotels view/viewhotels';
import SingleHotel from './Components/hotels view/singlehotels';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ViewCart from './Components/cart/viewcart';
import Footer from './Components/Layout/footer';
import ViewBooking from './Components/order/viewbooking';
import CheckAvailabilityModal from './Components/order/availability';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<HomePage />} />
          <Route path="/" element={<HomePage />} />
        </Route>
      
        <Route path="/login" element={<LoginForm />} />
        <Route path="/reg" element={<RegForm />} />
        <Route path="/viewhotels" element={<HotelRoom />} ></Route>
        <Route path="/singlehotel/:hotelId" element={<SingleHotel />} ></Route>
        <Route path="/viewcart/:roomId" element={<ViewCart />}  />
        <Route path="/viewcart" element={<ViewCart />}  />
        <Route path="/viewbooking" element={<ViewBooking />}  />
       <Route path="/availability/:roomId" element={<CheckAvailabilityModal/>} />
       <Route path="/viewcart/:cartId" element={<ViewCart />}  />
     
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
