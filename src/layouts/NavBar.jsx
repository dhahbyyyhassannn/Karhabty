import NavBarMenuLink from "../component/Links/NavbarMenuLink";
import logo from '../assets/Logo Karhabty.png';
import styles from './layoutStyles.module.css'
export default function NavBar() {
    return (
        <div className={styles.navbar}>
            <div className={styles.navbarLogoContainer}>
                <img src={logo} alt="Karhabty Logo" className={styles.navbarLogo} />
                <h2>Karhabty</h2>
            </div>
            <div className={styles.linksContainer}>
                <NavBarMenuLink linkName="Home" linkPath="/" />
                <NavBarMenuLink linkName="About" linkPath="/about" />
                <NavBarMenuLink linkName="Services" linkPath="/services" />
                <NavBarMenuLink linkName="Contact" linkPath="/contact" />
            </div>
            <div className={styles.buttonsContainer}>
                <button className="btn btn-warning" link="/signup">
                    Register
                </button>
                <button className="btn btn-outline-warning" link="/signin">
                    Login
                </button>
            </div>
        </div>
        
    )
}