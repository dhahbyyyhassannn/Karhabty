import { Link } from 'react-router-dom';
import styles from './linkStyles.module.css';

export default function NavBarMenuLink({ linkName, to }) {
    return (
        <Link to={to} className={styles.navbarLink}>
            {linkName}
        </Link>
    );
}