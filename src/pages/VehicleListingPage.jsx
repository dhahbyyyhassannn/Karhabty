import { useState, useEffect } from 'react';
import NavBar from '../layouts/NavBar'; // Assurez-vous que le chemin est correct
import VehicleCard from '../component/VehicleCard'; // Assurez-vous que le chemin est correct
import './VehicleListingPage.css';

export default function VehicleListingPage({ type }) {
  const isRental = type === 'rent';  
  
  // fishier test
  const rentalVehicles = [
    {
      id: 1,
      marque: 'Toyota',
      modele: 'Corolla',
      annee: 2022,
      carburant: 'Essence',
      nb_places: 5,
      nb_portes: 4,
      kilometrage: 25000,
      type: 'Sedan',
      description: 'Véhicule en excellent état, bien entretenu, idéal pour la ville.',
      image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=400&h=300&fit=crop',
      prix_par_jour: 85,
    },
    {
      id: 2,
      marque: 'Renault',
      modele: 'Clio',
      annee: 2023,
      carburant: 'Essence',
      nb_places: 5,
      nb_portes: 5,
      kilometrage: 12000,
      type: 'Berline',
      description: 'Voiture compacte et économique pour vos déplacements quotidiens.',
      image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=300&fit=crop',
      prix_par_jour: 75,
    },
  ];

  const saleVehicles = [
    {
      id: 3,
      marque: 'Peugeot',
      modele: '308',
      annee: 2021,
      carburant: 'Diesel',
      nb_places: 5,
      nb_portes: 5,
      kilometrage: 35000,
      type: 'Berline',
      description: 'Confortable et économique, bien entretenue par un seul propriétaire.',
      image: 'https://images.unsplash.com/photo-1494976866554-6d52da5d7840?w=400&h=300&fit=crop',
      prix_vente: 24500,
    },
    {
      id: 4,
      marque: 'Hyundai',
      modele: 'i20',
      annee: 2020,
      carburant: 'Essence',
      nb_places: 5,
      nb_portes: 5,
      kilometrage: 45000,
      type: 'Citadine', // Type changé pour tester le filtre
      description: 'Fiable et économique, premier propriétaire, contrôle technique OK.',
      image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400&h=300&fit=crop',
      prix_vente: 18500,
    },
  ];

  // État
  const [vehicles, setVehicles] = useState(isRental ? rentalVehicles : saleVehicles);
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

  useEffect(() => {
    setVehicles(isRental ? rentalVehicles : saleVehicles);
    setFilters({ marque: '', type: '', carburant: '', priceMin: '', priceMax: '' }); // Reset filtres
  }, [type]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Logique de filtrage
  const filteredVehicles = vehicles.filter((vehicle) => {
    // Filtre marque
    if (filters.marque && !vehicle.marque.toLowerCase().includes(filters.marque.toLowerCase())) {
      return false;
    }
    // Filtre type
    if (filters.type && vehicle.type !== filters.type) return false;
    // Filtre carburant
    if (filters.carburant && vehicle.carburant !== filters.carburant) return false;
    
    // Filtres prix
    const price = isRental ? vehicle.prix_par_jour : vehicle.prix_vente;
    if (filters.priceMin && price < Number(filters.priceMin)) return false;
    if (filters.priceMax && price > Number(filters.priceMax)) return false;
    
    return true;
  });

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
            ) : filteredVehicles.length === 0 ? (
              <div className="no-vehicles">
                <p>Aucun véhicule ne correspond à vos critères</p>
              </div>
            ) : (
              <div className="vehicles-grid">
                {filteredVehicles.map((vehicle) => (
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