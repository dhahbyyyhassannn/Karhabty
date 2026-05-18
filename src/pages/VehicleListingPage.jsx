import { useState, useEffect } from 'react';
import NavBar from '../layouts/NavBar'; // Assurez-vous que le chemin est correct
import VehicleCard from '../component/VehicleCard'; // Assurez-vous que le chemin est correct
import './VehicleListingPage.css';
import { getVehicles } from '../api/vehicleAPI';

export default function VehicleListingPage({ type }) {
  const isRental = type === 'rent';  
  

  const [vehicules, setVehicules] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Début du chargement
      setError('');
      try {
        const data = await getVehicles(type);
        // Sécurité si data est null ou pas un tableau
        setVehicules(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("erreur", err);
        setError("Impossible de charger les véhicules.");
      } finally {
        setLoading(false); // Fin du chargement (succès ou erreur)
      }
    };

    fetchData();
  }, [type]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Filtres
  const [filters, setFilters] = useState({
    marque: '',
    type: '',
    carburant: '',
    priceMin: '',
    priceMax: '',
  });

  const pageTitle = isRental ? 'Location de Voitures' : 'Vente de Voitures';
  const pageSubtitle = isRental
    ? 'Trouvez votre voiture idéale à louer'
    : 'Découvrez nos voitures à vendre';
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <NavBar />
      <div className="vehicle-listing-page">
        <div className="listing-header">
          <h1>{pageTitle}</h1>
          <p>{pageSubtitle}</p>
        </div>

        <div className="listing-container">
          <aside className="filters-sidebar">
            <h3>Filtres</h3>
            <div className="filter-group">
              <label htmlFor="marque">Marque</label>
              <input
                type="text"
                id="marque"
                name="marque"
                value={filters.marque}
                onChange={handleFilterChange}
                placeholder="Ex: Toyota, Peugeot..."
              />
            </div>
            
            <div className="filter-group">
              <label htmlFor="type">Type</label>
              <select
                id="type"
                name="type"
                value={filters.type}
                onChange={handleFilterChange} >
                  <option value="">Tous les types</option>
                  <option value="Berline">Berline</option>
                  <option value="SUV">SUV</option>
                  <option value="Citadine">Citadine</option>
                  <option value="Sedan">Sedan</option>
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="carburant">Carburant</label>
              <select
                id="carburant"
                name="carburant"
                value={filters.carburant}
                onChange={handleFilterChange}>
                  <option value="">Tous</option>
                  <option value="Essence">Essence</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Hybride">Hybride</option>
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="priceMin">Prix min ({isRental ? 'DT/jour' : 'DT'})</label>
              <input
                type="number"
                id="priceMin"
                name="priceMin"
                value={filters.priceMin}
                onChange={handleFilterChange}
                placeholder="Min"/>
            </div>
                      
            <div className="filter-group">
              <label htmlFor="priceMax">Prix max ({isRental ? 'DT/jour' : 'DT'})</label>
              <input
                type="number"
                id="priceMax"
                name="priceMax"
                value={filters.priceMax}
                onChange={handleFilterChange}
                placeholder="Max"/>
            </div>

            <button
              className="reset-filters"
              onClick={() =>
                setFilters({
                  marque: '',
                  type: '',
                  carburant: '',
                  priceMin: '',
                  priceMax: '',
                })
              }
            >
              Réinitialiser les filtres
            </button>
          </aside>

          <main className="vehicles-grid-container">
            {loading ? (
              <div className="loading">Chargement des véhicules...</div>
            ) : error ? (
              <div className="error-message">{error}</div>
            ) : (
              <div className="vehicles-grid">
                {vehicules.map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} type={type} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}