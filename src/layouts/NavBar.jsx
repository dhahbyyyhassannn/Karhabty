import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBarMenuLink from "../component/Links/NavbarMenuLink";
import logo from '../assets/Logo Karhabty.png';
import styles from './layoutStyles.module.css'

export default function NavBar() {
    const [userName, setUserName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const name = localStorage.getItem('userName');
        const storedCompany = localStorage.getItem('societe');

        if (token && name) {
            setUserName(name);
        } else {
            setUserName('');
        }

        if (storedCompany) {
            try {
                const company = JSON.parse(storedCompany);
                setCompanyName(company.name || 'Company');
            } catch {
                setCompanyName('Company');
            }
        } else {
            setCompanyName('');
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        setUserName('');
        navigate('/');
        window.location.reload();
    };

    return (
        <div className={styles.navbar}>
            <div className={styles.navbarLogoContainer}>
                <img src={logo} alt="Karhabty Logo" className={styles.navbarLogo} />
                <h2>Karhabty</h2>
            </div>
            <div className={styles.linksContainer}>
                <NavBarMenuLink linkName="Home" to="/" />
                <NavBarMenuLink linkName="Rent a Car" to="vehicles/rent" />
                <NavBarMenuLink linkName="Sell a Car" to="vehicles/sell" />
                <NavBarMenuLink linkName="Services" to="/#services" />
            </div>
            <div className={styles.buttonsContainer}>
                {userName ? (
                    <>
                        <span className={styles.welcomeText}>Welcome {userName}!</span>
                        <Link className="btn btn-warning" to="/profile">
                            Profile
                        </Link>
                        <button type="button" className="btn btn-outline-warning" onClick={handleLogout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link className="btn btn-warning" to="/signup">
                            Register
                        </Link>
                        <Link className="btn btn-outline-warning" to="/signin">
                            Login
                        </Link>
                    </>
                )}
            </div>
        </div>
    )
}