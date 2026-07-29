import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Auth/Login.jsx';
import Register from './pages/Auth/Register.jsx';
import AdminLayout from './layouts/AdminLayout.jsx';
import Home from './pages/Home/Home.jsx';
import AdminDashboard from './pages/Admin/AdminDashboard.jsx';
import AdminDoctors from './pages/Admin/AdminDoctors.jsx';
import AdminAppointments from './pages/Admin/AdminAppointments.jsx';
import AdminServices from './pages/Admin/AdminServices.jsx';
import BookingPage from './pages/Booking/BookingPage.jsx';
import PrivateRoute from './routes/PrivateRoute.jsx';
import AdminRoutes from './routes/AdminRoute.jsx';
import PatientLayout from './layouts/PatientLayout.jsx';
import PatientBookingList from './pages/Patient/PatientBookingList.jsx';
import PatientProfile from './pages/Patient/PatientProfile.jsx';
import PatientDoctors from './pages/Patient/PatientDoctors.jsx';
import PatientHome from './pages/Patient/PatientHome.jsx';
import AdminStaffs from './pages/Admin/AdminStaffs.jsx';
import AdminPatient from './pages/Admin/AdminPatient.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<><Login /></>} />
        <Route path='/register' element={<><Register /></>} />
        <Route path='/booking' element={
          <PrivateRoute>
            <BookingPage />
          </PrivateRoute>}
        />

        {/* ADMIN */}
        <Route path='/admin' element={
          <AdminRoutes roles={["admin"]}>
            <AdminLayout />
          </AdminRoutes>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path='doctors' element={<AdminDoctors />} />
          <Route path='staffs' element={<AdminStaffs />} />
          <Route path='patients' element={<AdminPatient />} />
          <Route path='services' element={<AdminServices />} />
          <Route path='appointments' element={<AdminAppointments />} />
        </Route>

        {/* PATIENT (bệnh nhân) */}
        <Route path='/patient' element={
          <PrivateRoute roles={["patient"]}>
            <PatientLayout />
          </PrivateRoute>
        }>
          <Route index element={<PatientHome />} />
          <Route path='doctors' element={<PatientDoctors />} />
          <Route path='bookings' element={<PatientBookingList />} />
          <Route path='profile' element={<PatientProfile />} />
        </Route>


      </Routes>
    </BrowserRouter>
  );
}

export default App;
