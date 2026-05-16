import { Link } from 'react-router-dom';
import './VehicleCard.module.css';

export default function VehicleCard({ vehicle, type }) {
  const isRental = type === 'rent';
  const price = isRental ? vehicle.prix_par_jour : vehicle.prix_vente;
  const priceLabel = isRental ? 'DT/jour' : 'DT';

  return (
    <Link to={`/vehicle/${vehicle.id}`} className="vehicle-card-link">
      <div className="vehicle-card">
        <div className="vehicle-card-image">
          <img
            src={vehicle.image || 'https://via.placeholder.com/400x300?text=No+Image'}
            alt={`${vehicle.marque} ${vehicle.modele}`}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x300?text=Image+Indisponible';
            }}
          />
          <span className={`vehicle-card-badge ${isRental ? 'rent' : 'sell'}`}>
            {isRental ? 'LOCATION' : 'VENTE'}
          </span>
        </div>

        <div className="vehicle-card-content">
          <div className="vehicle-card-header">
            <h3 className="vehicle-card-title">
              {vehicle.marque} {vehicle.modele}
            </h3>
            <span className="vehicle-card-year">{vehicle.annee}</span>
          </div>

          <p className="vehicle-card-description">{vehicle.description}</p>

          {/* Spécifications rapides */}
          <div className="vehicle-card-specs">
            <div className="spec">
              <span className="spec-icon">🛢️</span>
              <span>{vehicle.carburant}</span>
            </div>
            <div className="spec">
              <span className="spec-icon">👥</span>
              <span>{vehicle.nb_places} Places</span>
            </div>
            <div className="spec">
              <span className="spec-icon">🚪</span>
              <span>{vehicle.nb_portes} Portes</span>
            </div>
            <div className="spec">
              <span className="spec-icon">📊</span>
              <span>{vehicle.kilometrage?.toLocaleString()} km</span>
            </div>
          </div>

          <div className="vehicle-card-footer">
            <div className="vehicle-card-price">
              <span className="price-value">{price?.toLocaleString()}</span>
              <span className="price-unit">{priceLabel}</span>
            </div>
            <button className="vehicle-card-btn">Voir détails →</button>
          </div>
        </div>
      </div>
    </Link>
  );
}