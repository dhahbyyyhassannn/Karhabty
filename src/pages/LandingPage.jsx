import NavBar from '../layouts/NavBar';
import styles from './landingpagestyle.css';
import MainInformations from '../layouts/MainInformations';

export default function LandingPage() {
    return (
        <>
            <div className="styles">
                <NavBar />
            </div>
            <div>
                <MainInformations />
            </div>
        </>
    )
}