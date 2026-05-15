import NavBarMenuLink from "../component/Links/NavbarMenuLink";
import logo from '../assets/Logo Karhabty.png';
import styles from './layoutStyles.module.css'
import { Link } from 'react-router-dom';
export default function NavBar() {
    return (
        <div className={styles.navbar}>
            <div className={styles.navbarLogoContainer}>
                <img src={logo} alt="Karhabty Logo" className={styles.navbarLogo} />
                <h2>Karhabty</h2>
            </div>
            <div className={styles.linksContainer}>
                <NavBarMenuLink linkName="Home" linkPath="/" />
                <NavBarMenuLink linkName="Rent a Car" linkPath="/rent" />
                <NavBarMenuLink linkName="Sell a Car" linkPath="/sell" />
                <NavBarMenuLink linkName="Services" linkPath="/#services" />
            </div>
            <div className={styles.buttonsContainer}>
                <Link className="btn btn-warning" to="/signup">
                    Register
                </Link>
                <Link className="btn btn-outline-warning" to="/signin">
                    Login
                </Link>
            </div>
        </div>
        
    )
}