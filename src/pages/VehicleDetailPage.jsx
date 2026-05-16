import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../layouts/NavBar';
import { getVehicleById } from '../api/vehicleAPI';
import './VehicleDetailPage.css';

export default function VehicleDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchVehicleDetail();
  }, [id]);

  const fetchVehicleDetail = async () => {
    setLoading(true);
    setError('');
    try {
      // TODO: remplacer par API quand backend est prêt
      const data = await getVehicleById(id);
      setVehicle(data);
    } catch (err) {
      console.error('Erreur:', err);
      // ntastiw b hedy bech nshouf affichage kifh, baaaed lezimha tetnahau l API
      setVehicle({
        id: 1,
        marque: 'Toyota',
        modele: 'Corolla',
        matricule: 'AB-123-CD',
        annee: 2022,
        carburant: 'Essence',
        nb_places: 5,
        nb_portes: 4,
        nb_cylindres: 4,
        kilometrage: 25000,
        couleur: 'Blanc',
        type: 'Sedan',
        description: 'Véhicule en excellent état, bien entretenu. Idéal pour une location confortable ou l\'achat d\'une voiture fiable. Équipement complet, climatisation, vitres électriques, direction assistée.',
        image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=800&h=600&fit=crop',
        prix_par_jour: 85,
        prix_vente: 24500,
        caution: 800,
        negociable: true,
      });
      setError('Les données de démonstration sont affichées');
    } finally {
      setLoading(false);
    }
  };

  // TODO: ajouter la logique de réservation/paiement
  const handleRent = () => {
    if (vehicle?.prix_par_jour) {
      console.log('Location:', vehicle.modele);
      // rediriger vers page réservation
    }
  };

  // TODO: intégrer le formulaire d'achat
  const handleBuy = () => {
    if (vehicle?.prix_vente) {
      console.log('Achat:', vehicle.modele);
      // lancer la page d'achat
    }
  };

  if (loading) {
    return (
      <>
        <NavBar />
        <div className="detail-loading">Chargement du véhicule...</div>
      </>
    );
  }

  if (!vehicle) {
    return (
      <>
        <NavBar />
        <div className="detail-error">
          <p>{error || 'Véhicule non trouvé'}</p>
          <button onClick={() => navigate(-1)}>← Retour</button>
        </div>
      </>
    );
  }

  const isRental = !!vehicle.prix_par_jour;
  const price = isRental ? vehicle.prix_par_jour : vehicle.prix_vente;
  const priceLabel = isRental ? 'DT/jour' : 'DT';

  return (
    <>
      <NavBar />
      <div className="vehicle-detail-page">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Retour
        </button>

        <div className="detail-container">
          {/* Section image */}
          <div className="detail-image-section">
            <div className="detail-image-wrapper">
              <img
                src={vehicle.image || 'https://via.placeholder.com/600x400'}
                alt={`${vehicle.marque} ${vehicle.modele}`}
                className="detail-image"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/600x400?text=No+Image';
                }}
              />
              <span className={`detail-badge ${isRental ? 'rent' : 'sell'}`}>
                {isRental ? '🔄 LOCATION' : '💼 VENTE'}
              </span>
            </div>
          </div>

          {/* Section informations */}
          <div className="detail-info-section">
            <div className="detail-header">
              <div>
                <h1 className="detail-title">{vehicle.marque} {vehicle.modele}</h1>
                <p className="detail-subtitle">{vehicle.type} • {vehicle.annee}</p>
              </div>
              {vehicle.negociable && (
                <span className="negotiable-badge">Négociable</span>
              )}
            </div>

            {error && <div className="demo-notice">{error}</div>}

            <div className="detail-price-section">
              <div className="price-display">
                <span className="price-label">Prix</span>
                <span className="price-amount">{price?.toLocaleString()}</span>
                <span className="price-unit">{priceLabel}</span>
              </div>
              {isRental && vehicle.caution && (
                <div className="price-display">
                  <span className="price-label">Caution</span>
                  <span className="price-amount">{vehicle.caution?.toLocaleString()}</span>
                  <span className="price-unit">DT</span>
                </div>
              )}
            </div>

            <p className="detail-description">{vehicle.description}</p>

            {/* Spécifications */}
            <div className="specifications">
              <h3>Caractéristiques</h3>
              <div className="specs-grid">
                <div className="spec-item">
                  <span className="spec-label">Matricule</span>
                  <span className="spec-value">{vehicle.matricule}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Carburant</span>
                  <span className="spec-value">{vehicle.carburant}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Places</span>
                  <span className="spec-value">{vehicle.nb_places}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Portes</span>
                  <span className="spec-value">{vehicle.nb_portes}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Cylindres</span>
                  <span className="spec-value">{vehicle.nb_cylindres}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Kilométrage</span>
                  <span className="spec-value">{vehicle.kilometrage?.toLocaleString()} km</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Couleur</span>
                  <span className="spec-value">{vehicle.couleur}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Année</span>
                  <span className="spec-value">{vehicle.annee}</span>
                </div>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="action-section">
              <div className="action-buttons">
                {isRental ? (
                  <button className="btn btn-primary" onClick={handleRent}>
                    Louer maintenant
                  </button>
                ) : (
                  <>
                    <button className="btn btn-primary" onClick={handleBuy}>
                      Acheter maintenant
                    </button>
                    <button className="btn btn-secondary" onClick={() => alert('Contactez le vendeur')}>
                      Contacter le vendeur
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Section de contact */}
            <div className="contact-section">
              <h3>Informations de contact</h3>
              <button className="contact-btn">
                📞 Appeler le propriétaire
              </button>
              <button className="contact-btn">
                💬 Envoyer un message
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
