import NavBar from '../layouts/NavBar';
import '../pages/landingpagestyle.css';
import VehicleListingForm from './VehicleListingForm';

export default function RentCarPage() {
  return (
    <>
      <NavBar />
      <VehicleListingForm mode="rent" />
    </>
  );
}