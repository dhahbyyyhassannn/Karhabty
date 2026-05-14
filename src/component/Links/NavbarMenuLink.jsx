import styles from './linkStyles.module.css';
import { useNavigate } from 'react-router-dom';

export default function NavBarMenuLink({linkName, linkPath}) {
    const navigate = useNavigate();
    return (
        <a onClick={() => navigate(linkPath)} className={styles.navbarLink}>
            {linkName}
        </a>
    )
}