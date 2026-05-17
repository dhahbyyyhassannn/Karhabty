import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../layouts/NavBar';
import {
  getCompanyVehicles,
  createCompanyVehicle,
  updateCompanyVehicle,
  deleteCompanyVehicle,
} from '../api/societeDashboardAPI';
import styles from './SocieteDashboard.module.css';

const defaultForm = {
  vehicle_type: 'sale',
  matricule: '',
  marque: '',
  modele: '',
  couleur: '',
  type: '',
  annee: '',
  carburant: '',
  nb_places: '',
  nb_portes: '',
  nb_cylindres: '',
  kilometrage: '',
  description: '',
  image: '',
  prix_vente: '',
  negociable: false,
  prix_par_jour: '',
  caution: '',
};

export default function SocieteDashboard() {
  const [company, setCompany] = useState(null);
  const [vehicles, setVehicles] = useState({ sales: [], rentals: [] });
  const [tab, setTab] = useState('sales');
  const [form, setForm] = useState(defaultForm);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ success: '', error: '' });
  const [showForm, setShowForm] = useState(false);
  const [expandedVehicle, setExpandedVehicle] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('societe');
    if (!stored) {
      setCompany(null);
      return;
    }

    try {
      const parsed = JSON.parse(stored);
      setCompany(parsed);
    } catch {
      setCompany(null);
    }
  }, []);

  useEffect(() => {
    if (!company?.id) return;
    fetchVehicles();
  }, [company]);

  const fetchVehicles = async () => {
    if (!company?.id) return;
    setLoading(true);
    try {
      const data = await getCompanyVehicles(company.id);
      setVehicles({ sales: data.sales || [], rentals: data.rentals || [] });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const resetForm = () => {
    setForm(defaultForm);
    setEditing(null);
    setShowForm(false);
    setMessage({ success: '', error: '' });
  };

  const handleEdit = (item, itemType) => {
    setForm({
      ...defaultForm,
      vehicle_type: itemType,
      matricule: item.matricule,
      marque: item.marque,
      modele: item.modele,
      couleur: item.couleur,
      type: item.type,
      annee: item.annee,
      carburant: item.carburant,
      nb_places: item.nb_places,
      nb_portes: item.nb_portes,
      nb_cylindres: item.nb_cylindres,
      kilometrage: item.kilometrage,
      description: item.description,
      image: item.image,
      prix_vente: item.prix_vente || '',
      negociable: !!item.negociable,
      prix_par_jour: item.prix_par_jour || '',
      caution: item.caution || '',
    });
    setEditing({ matricule: item.matricule, type: itemType });
    setShowForm(true);
  };

  const handleDelete = async (matricule) => {
    if (!company?.id) return;
    try {
      await deleteCompanyVehicle(company.id, matricule);
      setMessage({ success: 'Vehicle deleted.', error: '' });
      fetchVehicles();
    } catch (err) {
      setMessage({ success: '', error: 'Unable to delete vehicle.' });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('societe');
    localStorage.removeItem('societe_id');
    localStorage.removeItem('societe_token');
    navigate('/societe/signin');
    window.location.reload();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!company?.id) return;
    setMessage({ success: '', error: '' });

    const payload = {
      vehicle_type: form.vehicle_type,
      matricule: form.matricule,
      marque: form.marque,
      modele: form.modele,
      couleur: form.couleur,
      type: form.type,
      annee: Number(form.annee),
      carburant: form.carburant,
      nb_places: Number(form.nb_places),
      nb_portes: Number(form.nb_portes),
      nb_cylindres: Number(form.nb_cylindres),
      kilometrage: Number(form.kilometrage),
      description: form.description,
      image: form.image,
      ...(form.vehicle_type === 'sale'
        ? { prix_vente: Number(form.prix_vente), negociable: form.negociable }
        : { prix_par_jour: Number(form.prix_par_jour), caution: Number(form.caution) }),
    };

    try {
      if (editing) {
        await updateCompanyVehicle(company.id, editing.matricule, payload);
        setMessage({ success: 'Vehicle updated successfully.', error: '' });
      } else {
        await createCompanyVehicle(company.id, payload);
        setMessage({ success: 'Vehicle added successfully.', error: '' });
      }
      resetForm();
      fetchVehicles();
    } catch (err) {
      setMessage({ success: '', error: err.response?.data?.message || 'Failed to save vehicle.' });
    }
  };

  const dashboardContent = useMemo(() => {
    if (!company) {
      return (
        <div className={styles.emptyState}>
          <h2>Aucun véhicule de société connecté</h2>
          <p>Veuillez vous connecter ou enregistrer votre société pour accéder au tableau de bord.</p>
          <div className={styles.actionGroup}>
            <Link to="/societe/signin" className={styles.btnOutline}>Sign in as Company</Link>
            <Link to="/societe/register" className={styles.btnPrimary}>Register your Company</Link>
          </div>
        </div>
      );
    }

    const vehicleList = tab === 'sales' ? vehicles.sales : vehicles.rentals;

    return (
      <>
        <section className={styles.hero}>
          <div>
            <h1>{company.name} dashboard</h1>
            <p>Manage your vehicles for sale and rental from one place.</p>
          </div>
          <div>
            <button className={styles.btnPrimary} onClick={() => { setForm(defaultForm); setEditing(null); setShowForm(!showForm); }}>
              {showForm ? 'Hide Form' : 'Add new vehicle'}
            </button>
            <button className={styles.btnOutline} onClick={handleLogout} style={{ marginLeft: 12 }}>
              Logout
            </button>
          </div>
        </section>

        <section className={styles.tabs}>
          <button className={tab === 'sales' ? styles.activeTab : ''} onClick={() => setTab('sales')}>
            Sale vehicles ({vehicles.sales.length})
          </button>
          <button className={tab === 'rentals' ? styles.activeTab : ''} onClick={() => setTab('rentals')}>
            Rental vehicles ({vehicles.rentals.length})
          </button>
        </section>

        {showForm && (
          <section className={styles.formSection}>
            <div className={styles.formCard}>
              <h2>{editing ? 'Edit vehicle' : 'Add vehicle'}</h2>
              <form className={styles.form} onSubmit={handleSubmit}>
                {!editing && (
                  <label className={styles.formField}>
                    Vehicle purpose
                    <select name="vehicle_type" value={form.vehicle_type} onChange={handleChange}>
                      <option value="sale">Sale</option>
                      <option value="rent">Rent</option>
                    </select>
                  </label>
                )}
                <label className={styles.formField}>
                  Matricule
                  <input name="matricule" value={form.matricule} onChange={handleChange} required />
                </label>
                <label className={styles.formField}>
                  Marque
                  <input name="marque" value={form.marque} onChange={handleChange} required />
                </label>
                <label className={styles.formField}>
                  Modele
                  <input name="modele" value={form.modele} onChange={handleChange} required />
                </label>
                <label className={styles.formField}>
                  Couleur
                  <input name="couleur" value={form.couleur} onChange={handleChange} required />
                </label>
                <label className={styles.formField}>
                  Type
                  <input name="type" value={form.type} onChange={handleChange} required />
                </label>
                <label className={styles.formField}>
                  Annee
                  <input name="annee" type="number" value={form.annee} onChange={handleChange} required />
                </label>
                <label className={styles.formField}>
                  Carburant
                  <input name="carburant" value={form.carburant} onChange={handleChange} required />
                </label>
                <label className={styles.formField}>
                  Places
                  <input name="nb_places" type="number" value={form.nb_places} onChange={handleChange} required />
                </label>
                <label className={styles.formField}>
                  Portes
                  <input name="nb_portes" type="number" value={form.nb_portes} onChange={handleChange} required />
                </label>
                <label className={styles.formField}>
                  Cylindres
                  <input name="nb_cylindres" type="number" value={form.nb_cylindres} onChange={handleChange} required />
                </label>
                <label className={styles.formField}>
                  Kilometrage
                  <input name="kilometrage" type="number" value={form.kilometrage} onChange={handleChange} required />
                </label>
                {form.vehicle_type === 'sale' ? (
                  <>
                    <label className={styles.formField}>
                      Prix de vente
                      <input name="prix_vente" type="number" step="0.01" value={form.prix_vente} onChange={handleChange} required />
                    </label>
                    <label className={styles.formFieldCheckbox}>
                      <input name="negociable" type="checkbox" checked={form.negociable} onChange={handleChange} />
                      Négociable
                    </label>
                  </>
                ) : (
                  <>
                    <label className={styles.formField}>
                      Prix par jour
                      <input name="prix_par_jour" type="number" step="0.01" value={form.prix_par_jour} onChange={handleChange} required />
                    </label>
                    <label className={styles.formField}>
                      Caution
                      <input name="caution" type="number" step="0.01" value={form.caution} onChange={handleChange} required />
                    </label>
                  </>
                )}
                <label className={styles.formField}>
                  Description
                  <textarea name="description" value={form.description} onChange={handleChange} required />
                </label>
                <label className={styles.formField}>
                  Image URL
                  <input name="image" value={form.image} onChange={handleChange} required />
                </label>
                {message.error && <div className={styles.messageError}>{message.error}</div>}
                {message.success && <div className={styles.messageSuccess}>{message.success}</div>}
                <div className={styles.formActions}>
                  <button className={styles.btnPrimary} type="submit">
                    {editing ? 'Update vehicle' : 'Add vehicle'}
                  </button>
                  {editing && (
                    <button type="button" className={styles.btnOutline} onClick={resetForm}>
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </section>
        )}

        <section className={styles.vehiclesSection}>
          <h2>{tab === 'sales' ? 'Sale vehicles' : 'Rental vehicles'}</h2>
          {loading ? (
            <p className={styles.loadingText}>Loading...</p>
          ) : vehicleList.length === 0 ? (
            <p className={styles.emptyText}>No vehicles found. Add one to get started!</p>
          ) : (
            <div className={styles.vehiclesGrid}>
              {vehicleList.map((vehicle) => (
                <div key={vehicle.matricule} className={styles.vehicleCard}>
                  <div className={styles.vehicleImageContainer}>
                    <img src={vehicle.image} alt={`${vehicle.marque} ${vehicle.modele}`} className={styles.vehicleImage} />
                  </div>
                  <div className={styles.vehicleInfo}>
                    <h3 className={styles.vehicleName}>{vehicle.marque} {vehicle.modele}</h3>
                    <p className={styles.vehicleMatricule}>{vehicle.matricule}</p>
                    <div className={styles.vehiclePrice}>
                      {tab === 'sales' ? (
                        <>
                          <span className={styles.price}>${vehicle.prix_vente}</span>
                          {vehicle.negociable && <span className={styles.negotiable}>Négociable</span>}
                        </>
                      ) : (
                        <span className={styles.price}>${vehicle.prix_par_jour}/day</span>
                      )}
                    </div>
                    <div className={styles.vehicleActions}>
                      <button 
                        className={styles.detailsButton} 
                        onClick={() => setExpandedVehicle(expandedVehicle === vehicle.matricule ? null : vehicle.matricule)}
                      >
                        {expandedVehicle === vehicle.matricule ? 'Hide Details' : 'Get Details'}
                      </button>
                      <button className={styles.editButton} onClick={() => handleEdit(vehicle, tab === 'sales' ? 'sale' : 'rent')}>
                        Edit
                      </button>
                      <button className={styles.deleteButton} onClick={() => handleDelete(vehicle.matricule)}>
                        Delete
                      </button>
                    </div>
                  </div>

                  {expandedVehicle === vehicle.matricule && (
                    <div className={styles.vehicleDetails}>
                      <div className={styles.detailsGrid}>
                        <div className={styles.detailItem}>
                          <span className={styles.detailLabel}>Type:</span>
                          <span className={styles.detailValue}>{vehicle.type}</span>
                        </div>
                        <div className={styles.detailItem}>
                          <span className={styles.detailLabel}>Year:</span>
                          <span className={styles.detailValue}>{vehicle.annee}</span>
                        </div>
                        <div className={styles.detailItem}>
                          <span className={styles.detailLabel}>Fuel:</span>
                          <span className={styles.detailValue}>{vehicle.carburant}</span>
                        </div>
                        <div className={styles.detailItem}>
                          <span className={styles.detailLabel}>Color:</span>
                          <span className={styles.detailValue}>{vehicle.couleur}</span>
                        </div>
                        <div className={styles.detailItem}>
                          <span className={styles.detailLabel}>Seats:</span>
                          <span className={styles.detailValue}>{vehicle.nb_places}</span>
                        </div>
                        <div className={styles.detailItem}>
                          <span className={styles.detailLabel}>Doors:</span>
                          <span className={styles.detailValue}>{vehicle.nb_portes}</span>
                        </div>
                        <div className={styles.detailItem}>
                          <span className={styles.detailLabel}>Cylinders:</span>
                          <span className={styles.detailValue}>{vehicle.nb_cylindres}</span>
                        </div>
                        <div className={styles.detailItem}>
                          <span className={styles.detailLabel}>Mileage:</span>
                          <span className={styles.detailValue}>{vehicle.kilometrage} km</span>
                        </div>
                        {tab === 'rentals' && (
                          <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>Deposit:</span>
                            <span className={styles.detailValue}>${vehicle.caution}</span>
                          </div>
                        )}
                      </div>
                      <div className={styles.descriptionContainer}>
                        <p className={styles.detailLabel}>Description:</p>
                        <p className={styles.description}>{vehicle.description}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </>
    );
  }, [company, editing, form, message.error, message.success, tab, vehicles, showForm, expandedVehicle]);

  return (
    <>
      <NavBar />
      <main className={styles.container}>{dashboardContent}</main>
    </>
  );
}
