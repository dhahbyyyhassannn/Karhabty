import { Link } from 'react-router-dom';
import styles from './VehicleCard.module.css';

export default function VehicleCard({ vehicle, type }) {
  const isRental = type === 'rent';
  const price = isRental ? vehicle.prix_par_jour : vehicle.prix_vente;
  const priceLabel = isRental ? 'DT/jour' : 'DT';

  return (
    <Link to={`/vehicle/${vehicle.id}`} className={styles.link}>
      <div className={styles.card}>

        {/* Image */}
        <div className={styles.imageWrapper}>
          <img
            src={vehicle.image || '/placeholder-car.jpg'}
            alt={`${vehicle.marque} ${vehicle.modele}`}
            className={styles.image}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <span className={`${styles.badge} ${isRental ? styles.badgeRent : styles.badgeSell}`}>
            {isRental ? 'Location' : 'Vente'}
          </span>
        </div>

        {/* Corps */}
        <div className={styles.body}>
          <div className={styles.header}>
            <h3 className={styles.title}>
              {vehicle.marque} {vehicle.modele}
            </h3>
            <span className={styles.year}>{vehicle.annee}</span>
          </div>

          <p className={styles.description}>{vehicle.description}</p>

          <div className={styles.specs}>
            <div className={styles.spec}>
              <span className={styles.specIcon}>⛽</span>
              <span>{vehicle.carburant}</span>
            </div>
            <div className={styles.spec}>
              <span className={styles.specIcon}>👥</span>
              <span>{vehicle.nb_places} places</span>
            </div>
            <div className={styles.spec}>
              <span className={styles.specIcon}>🚪</span>
              <span>{vehicle.nb_portes} portes</span>
            </div>
            <div className={styles.spec}>
              <span className={styles.specIcon}>📍</span>
              <span>{vehicle.kilometrage?.toLocaleString()} km</span>
            </div>
          </div>

          <div className={styles.footer}>
            <div className={styles.priceBlock}>
              <span className={styles.priceLabel}>
                {isRental ? 'Prix / jour' : 'Prix'}
              </span>
              <span className={styles.priceValue}>
                {price?.toLocaleString()}
              </span>
              <span className={styles.priceUnit}>{priceLabel}</span>
            </div>
            <button className={styles.btn}>
              Voir détails →
            </button>
          </div>
        </div>

      </div>
    </Link>
  );
}