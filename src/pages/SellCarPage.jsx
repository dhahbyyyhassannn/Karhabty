import NavBar from '../layouts/NavBar';
import '../pages/landingpagestyle.css';
import VehicleListingForm from './VehicleListingForm';

export default function SellCarPage() {
  return (
    <>
      <NavBar />
      <VehicleListingForm mode="sell" />
    </>
  );
}