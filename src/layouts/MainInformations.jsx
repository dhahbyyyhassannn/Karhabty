import styles from './layoutStyles.module.css';

export default function MainInformations() {
    return (
        <div>
            <div>
                <h1 className={styles.welcoming}>
                    Welcome to Karhabty
                </h1>
                <h3 className={styles.mainText}>
                    you can rent, sell or buy a car with us
                </h3>
                <h3 className={styles.mainText}>
                    with best prices and best services
                </h3>
                <h3 className={styles.mainText}>
                    find your dream car with us and
                </h3>
            </div>
            <div>
                <h3 className={styles.slogan}>
                    drive the
                </h3>
                <h3 className={styles.extra}>
                    extraordinary
                </h3>
                
            </div>
        </div>
    )
}