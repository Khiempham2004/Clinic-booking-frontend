import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BookingForm from './pages/Booking/BookingForm.jsx';
import Login from './pages/Auth/Login.jsx';
// import { Login } from '@mui/icons-material';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<><Login /></>} />
        <Route path='/bookings' element={
          <><BookingForm /></>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
