import { useState } from 'react';
import { submitRentalVehicle, submitSaleVehicle } from '../component/auth';
import './vehicleListingStyles.css';


const baseFormState = {
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
};

function FormField({ label, name, value, onChange, type = 'text', placeholder, step, children }) {
  return (
    <label className="vehicle-field">
      <span>{label}</span>
      {children || (
        <input
          name={name}
          value={value}
          onChange={onChange}
          type={type}
          placeholder={placeholder}
          step={step}
        />
      )}
    </label>
  );
}

export default function VehicleListingForm({ mode }) {
  const isRental = mode === 'rent';
  const [form, setForm] = useState({
    ...baseFormState,
    prix_vente: '',
    negociable: false,
    prix_par_jour: '',
    caution: '',
  });
  const [message, setMessage] = useState({ error: '', success: '' });

  const title = isRental ? 'Rent a car' : 'Sell a car';
  const subtitle = isRental
    ? 'Create a rental listing with daily price and deposit details.'
    : 'Create a sales listing with the full vehicle profile and price.';

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage({ error: '', success: '' });

    const payload = {
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
      ...(isRental
        ? {
            prix_par_jour: Number(form.prix_par_jour),
            caution: Number(form.caution),
          }
        : {
            prix_vente: Number(form.prix_vente),
            negociable: form.negociable,
          }),
    };

    try {
      if (isRental) {
        await submitRentalVehicle(payload);
      } else {
        await submitSaleVehicle(payload);
      }

      setMessage({
        error: '',
        success: isRental
          ? 'Rental listing submitted successfully.'
          : 'Sales listing submitted successfully.',
      });
      setForm({
        ...baseFormState,
        prix_vente: '',
        negociable: false,
        prix_par_jour: '',
        caution: '',
      });
    } catch (error) {
      setMessage({ error: error.message, success: '' });
    }
  };

  return (
    <section className="vehicle-section">
      <div className="vehicle-shell">
        <article className="vehicle-copy">
          <div className="heroEyebrow">Karhabty {isRental ? 'Rental Form' : 'Sales Form'}</div>
          <h1 className="vehicle-title">{title}</h1>
          <p className="vehicle-text">{subtitle}</p>
          <div className="vehicle-notes">
            <span>English labels</span>
            <span>Backend-ready fields</span>
            <span>Private and secure</span>
          </div>
        </article>

        <article className="vehicle-card">
          <form className="vehicle-form" onSubmit={handleSubmit}>
            <div className="vehicle-form-grid">
              <FormField label="Matricule" name="matricule" value={form.matricule} onChange={handleChange} placeholder="AB-123-CD" />
              <FormField label="Brand" name="marque" value={form.marque} onChange={handleChange} placeholder="Toyota" />
              <FormField label="Model" name="modele" value={form.modele} onChange={handleChange} placeholder="Corolla" />
              <FormField label="Color" name="couleur" value={form.couleur} onChange={handleChange} placeholder="White" />
              <FormField label="Type" name="type" value={form.type} onChange={handleChange} placeholder="Sedan" />
              <FormField label="Year" name="annee" value={form.annee} onChange={handleChange} type="number" placeholder="2022" />
              <FormField label="Fuel" name="carburant" value={form.carburant} onChange={handleChange} placeholder="Diesel" />
              <FormField label="Seats" name="nb_places" value={form.nb_places} onChange={handleChange} type="number" placeholder="5" />
              <FormField label="Doors" name="nb_portes" value={form.nb_portes} onChange={handleChange} type="number" placeholder="4" />
              <FormField label="Cylinders" name="nb_cylindres" value={form.nb_cylindres} onChange={handleChange} type="number" placeholder="4" />
              <FormField label="Mileage" name="kilometrage" value={form.kilometrage} onChange={handleChange} type="number" placeholder="45000" />
              <FormField label="Image URL" name="image" value={form.image} onChange={handleChange} placeholder="https://..." />

              {isRental ? (
                <>
                  <FormField label="Daily price" name="prix_par_jour" value={form.prix_par_jour} onChange={handleChange} type="number" step="0.01" placeholder="55" />
                  <FormField label="Deposit" name="caution" value={form.caution} onChange={handleChange} type="number" step="0.01" placeholder="300" />
                </>
              ) : (
                <>
                  <FormField label="Selling price" name="prix_vente" value={form.prix_vente} onChange={handleChange} type="number" step="0.01" placeholder="12500" />
                  <label className="vehicle-field vehicle-checkbox full-width">
                    <input type="checkbox" name="negociable" checked={form.negociable} onChange={handleChange} />
                    <span>Negotiable price</span>
                  </label>
                </>
              )}

              <label className="vehicle-field full-width">
                <span>Description</span>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder={isRental ? 'Describe rental terms and conditions' : 'Describe the car condition and options'}
                />
              </label>
            </div>

            {message.error && <div className="form-message error">{message.error}</div>}
            {message.success && <div className="form-message success">{message.success}</div>}

            <button className="listing-submit-button" type="submit">
              {isRental ? 'Submit rental form' : 'Submit sales form'}
            </button>
          </form>
        </article>
      </div>
    </section>
  );
}