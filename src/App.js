import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LogIn from './pages/LogIn';
import SignUp from './pages/Register';
import RentCarPage from './pages/RentCarPage';
import SellCarPage from './pages/SellCarPage';
import AddVehicle from './pages/AddVehicle';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/rent" element={<RentCarPage />} />
      <Route path="/sell" element={<SellCarPage />} />
      <Route path="/signin" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/rental" element={<RentCarPage />} />
      <Route path="/sale" element={<SellCarPage />} />
      <Route path="/add-vehicle" element={<AddVehicle />} />
    </Routes>
  );
}

export default App;
