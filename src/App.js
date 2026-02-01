import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BookingForm from './pages/Booking/BookingForm.jsx';
import Login from './pages/Auth/Login.jsx';
import Register from './pages/Auth/Register.jsx'
import UserLayout from './components/UserLayout.jsx';
import AdminLayout from './layouts/AdminLayout.jsx';
import Home from './pages/Home/Home.jsx';
import AdminDashboard from './pages/Admin/AdminDashboard.jsx';
import AdminDoctors from './pages/Admin/AdminDoctors.jsx';
import AdminAppointments from './pages/Admin/AdminAppointments.jsx';
import AdminServices from './pages/Admin/AdminServices.jsx';
import BookingTimeSlot from './components/booking/BookingTimeSlot.jsx';
import BookingPage from './pages/Booking/BookingPage.jsx';
import BookingSummary from './components/booking/BookingSummary.jsx';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<><Login /></>} />
        <Route path='/register' element={<><Register /></>} />
        <Route path='/booking' element={<><BookingPage /></>} />

        {/* <Route path='/booking' element={
          <>
            <BookingTimeSlot />
            <BookingForm />
          </>
        } /> */}


        {/* USER */}
        <Route path='/user' element={<UserLayout />} />


        {/* ADMIN */}
        <Route path='/admin' element={<AdminLayout />}>

          <Route index element={<AdminDashboard />} />

          <Route path='doctors' element={<AdminDoctors />} />
          <Route path='services' element={<AdminServices />} />
          <Route path='appointments' element={<AdminAppointments />} />

        </Route>



      </Routes>
    </BrowserRouter>
  );
}

export default App;
