import styles from './layoutStyles.module.css';

export default function MainInformations() {
    return (
        <div className={styles.heroContent}>
            <div className={styles.heroEyebrow}>Premium Car Rental and Sales</div>
            <h1 className={styles.welcoming}>
                Find the right car for every road, trip, and budget.
            </h1>
            <h3 className={styles.mainText}>
                Rent with confidence, buy with clarity, and enjoy a seamless experience from search to checkout.
            </h3>
            <h3 className={styles.mainText}>
                Karhabty brings together trusted cars, smart pricing, and a polished service built around you.
            </h3>
            <div className={styles.heroHighlights}>
                <span className={styles.heroChip}>Flexible rentals</span>
                <span className={styles.heroChip}>Verified listings</span>
                <span className={styles.heroChip}>Fast booking</span>
                <span className={styles.heroChip}>Premium support</span>
            </div>
            <h3 className={styles.slogan}>
                Drive the
            </h3>
            <h3 className={styles.extra}>
                extraordinary
            </h3>
        </div>
    )
}