// App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard/dashboard';
import LoginForm from './Components/Login/login';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import AddHotel from './Components/Hotel/Addhotel';
import ViewHotel from './Components/Hotel/viewhotel';
import AddRoom from './Components/Rooms/AddRoom';
import ViewRooms from './Components/Rooms/viewrooms';
import ViewBooking from './Components/Booking/viewbooking';
import CancelViewBooking from './Components/Booking/cancelledbookingsview';
import UpdateHotel from './Components/Hotel/updateHotel';
import UpdateRoom from './Components/Rooms/updateRoom';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          </Route>
          <Route index  element={<LoginForm />} />
          <Route path="/login"  element={<LoginForm />} />
          <Route path="/addhotel"  element={<AddHotel />} />
          <Route path="/viewhotel"  element={<ViewHotel />} />
          <Route path="/updateHotel/:hotelId"  element={<UpdateHotel />} />
          <Route path="/addrooms"  element={<AddRoom />} />
          <Route path="/viewrooms"  element={<ViewRooms />} />
          <Route path="/updateRoom/:roomId"  element={<UpdateRoom />} />
          
          
         
          <Route path="/viewbooking"  element={<ViewBooking />} />
          <Route path='/cancelledbookingsview' element={<CancelViewBooking />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
