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

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/rent" element={<RentCarPage />} />
      <Route path="/sell" element={<SellCarPage />} />
      <Route path="/signin" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/profile" element={<Profile />} />
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
