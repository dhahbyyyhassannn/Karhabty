import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import RentCarPage from './pages/RentCarPage';
import SellCarPage from './pages/SellCarPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/rent" element={<RentCarPage />} />
      <Route path="/sell" element={<SellCarPage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/rental" element={<RentCarPage />} />
      <Route path="/sale" element={<SellCarPage />} />
    </Routes>
  );
}

export default App;
