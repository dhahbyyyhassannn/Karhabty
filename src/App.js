import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LogIn from './pages/LogIn';
import SignUp from './pages/Register';
import RentCarPage from './pages/RentCarPage';
import SellCarPage from './pages/SellCarPage';
import AddVehicle from './pages/AddVehicle';
import VehicleListingPage from './pages/VehicleListingPage';
import VehicleDetailPage from './pages/VehicleDetailPage';
import Profile from './pages/Profile';
import SocieteLogin from './pages/SocieteLogin';
import SocieteRegister from './pages/SocieteRegister';
import SocieteDashboard from './pages/SocieteDashboard';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/rent" element={<RentCarPage />} />
      <Route path="/sell" element={<SellCarPage />} />
      <Route path="/signin" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/societe/signin" element={<SocieteLogin />} />
      <Route path="/societe/register" element={<SocieteRegister />} />
      <Route path="/societe/dashboard" element={<SocieteDashboard />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/rental" element={<RentCarPage />} />
      <Route path="/sell" element={<SellCarPage />} />
      <Route path="/add-vehicle" element={<AddVehicle />} />
      <Route path="/vehicles/rent" element={<VehicleListingPage type="rent" />} />
      <Route path="/vehicles/sell" element={<VehicleListingPage type="sell" />} />
      <Route path="/vehicle/:id" element={<VehicleDetailPage />} />
    </Routes>
  );
}

export default App;
