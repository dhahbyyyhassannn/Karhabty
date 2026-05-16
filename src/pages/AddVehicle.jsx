import { useState } from 'react';
import NavBar from '../layouts/NavBar';
import styles from './AddVehicle.module.css';
import { addVehicleForSale } from '../api/vehicleAPI';
import Swal from 'sweetalert2';

export default function AddVehicle() {
    const initialFormState = {
        matricule: '',
        marque: '',
        modele: '',
        couleur: '',
        type: '',
        annee: '',
        carburant: 'Excellent',
        nb_places: 'Gasoline',
        nb_portes: 'Automatic',
        nb_cylindres: '',
        kilometrage: '',
        description: '', 
        image: null,
        prix_vente: '',
        negociable: false,
    };

    const [formValues, setFormValues] = useState(initialFormState);

    const  handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) {
            Swal.fire({
                icon: 'error',
                title: 'No file selected',
                text: 'Please select a file to upload.'
            });
        }
        try {
            const buffer = await file.arrayBuffer();
            const byteArray = new Uint8Array(buffer);
            setFormValues((prev) => ({ ...prev, image: byteArray }));
        }
        catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'File upload failed',
                text: 'An error occurred while uploading the file.'
            });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addVehicleForSale(formValues);
            Swal.fire({
                icon: 'success',
                title: 'Vehicle added',
                text: 'Your vehicle listing has been added successfully.'
            });
            setFormValues(initialFormState);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Submission failed',
                text: error.message || 'An error occurred while submitting your listing.'
            });
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormValues((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    }
    return (
        <>
            <NavBar />
            <section className={styles['vehicle-section']}>
        <div className={styles['vehicle-shell']}>
          <aside className={styles['vehicle-copy']}>
            <h1 className={styles['vehicle-title']}>Add a vehicle listing</h1>
            <p className={styles['vehicle-text']}>
              This page is built from `AddVehicle.module.css`. It includes a complete styled form without API calls,
              so you can connect it to your backend when you are ready.
            </p>
            <div className={styles['vehicle-notes']}>
              <span>No API logic</span>
              <span>Responsive layout</span>
              <span>Rent or sale</span>
              <span>Karhabty style</span>
            </div>
          </aside>

          <article className={styles['vehicle-card']}>
            <form className={styles['vehicle-form']} onSubmit={handleSubmit}>
              <div className={styles['vehicle-form-grid']}>
                <label className={styles['vehicle-field']}>
                  Matricule
                  <input
                    name="matricule"
                    type="text"
                    value={formValues.matricule}
                    placeholder="Vehicle registration number"
                    onChange={handleChange}
                  />
                </label>

                <label className={styles['vehicle-field']}>
                  Marque (Make)
                  <input
                    name="marque"
                    type="text"
                    value={formValues.marque}
                    placeholder="Toyota, BMW, etc."
                    onChange={handleChange}
                  />
                </label>

                <label className={styles['vehicle-field']}>
                  Modele (Model)
                  <input
                    name="modele"
                    type="text"
                    value={formValues.modele}
                    placeholder="Corolla, X5, etc."
                    onChange={handleChange}
                  />
                </label>

                <label className={styles['vehicle-field']}>
                  Couleur (Color)
                  <input
                    name="couleur"
                    type="text"
                    value={formValues.couleur}
                    placeholder="Red, Blue, etc."
                    onChange={handleChange}
                  />
                </label>

                <label className={styles['vehicle-field']}>
                  Type
                  <input
                    name="type"
                    type="text"
                    value={formValues.type}
                    placeholder="Sedan, SUV, etc."
                    onChange={handleChange}
                  />
                </label>

                <label className={styles['vehicle-field']}>
                  Annee (Year)
                  <input
                    name="annee"
                    type="number"
                    min="1900"
                    max="2099"
                    value={formValues.annee}
                    placeholder="2024"
                    onChange={handleChange}
                  />
                </label>

                <label className={styles['vehicle-field']}>
                  Carburant (Fuel Type)
                  <input
                    name="carburant"
                    type="text"
                    value={formValues.carburant}
                    placeholder="Gasoline, Diesel, etc."
                    onChange={handleChange}
                  />
                </label>

                <label className={styles['vehicle-field']}>
                  Nombre de Places (Seats)
                  <input
                    name="nb_places"
                    type="number"
                    value={formValues.nb_places}
                    placeholder="5"
                    onChange={handleChange}
                  />
                </label>

                <label className={styles['vehicle-field']}>
                  Nombre de Portes (Doors)
                  <input
                    name="nb_portes"
                    type="number"
                    value={formValues.nb_portes}
                    placeholder="4"
                    onChange={handleChange}
                  />
                </label>

                <label className={styles['vehicle-field']}>
                  Nombre de Cylindres (Cylinders)
                  <input
                    name="nb_cylindres"
                    type="number"
                    value={formValues.nb_cylindres}
                    placeholder="4"
                    onChange={handleChange}
                  />
                </label>

                <label className={styles['vehicle-field']}>
                  Kilometrage (Mileage)
                  <input
                    name="kilometrage"
                    type="text"
                    value={formValues.kilometrage}
                    placeholder="45,000 km"
                    onChange={handleChange}
                  />
                </label>

                <label className={styles['vehicle-field']}>
                  Prix de Vente (Price)
                  <input
                    name="prix_vente"
                    type="text"
                    value={formValues.prix_vente}
                    placeholder="25,000 TND"
                    onChange={handleChange}
                  />
                </label>

                <label className={`${styles['vehicle-field']} ${styles['full-width']}`}>
                  Description
                  <textarea
                    name="description"
                    value={formValues.description}
                    placeholder="Add details like features, maintenance history, and availability."
                    onChange={handleChange}
                  />
                </label>

                <label className={`${styles['vehicle-field']} ${styles['full-width']}`}>
                  Image
                  <input
                    name="image/*"
                    type="file"
                    onChange={handleFileChange}
                  />
                </label>

                <div className={`${styles['vehicle-field']} ${styles['vehicle-checkbox']}`}>
                  <input
                    id="negociable"
                    type="checkbox"
                    name="negociable"
                    checked={formValues.negociable}
                    onChange={handleChange}
                  />
                  <label htmlFor="negociable">Negotiable price</label>
                </div>
              </div>

              <button type="submit" className={styles['listing-submit-button']}>
                Save listing details
              </button>
            </form>

            <p className={styles['vehicle-text']} style={{ marginTop: '18px', color: 'rgba(42, 34, 28, 0.82)' }}>
              When you're ready, connect this form to your backend. The layout and styling are defined in `AddVehicle.module.css`.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
