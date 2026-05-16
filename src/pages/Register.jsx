import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../api/authAPI';
import './AuthPages.css';
import Swal from 'sweetalert2';

export default function Register() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user,
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register({ name: user.name, email: user.email, password: user.password });
      Swal.fire({
        icon: 'success',
        title: 'Inscription réussie',
        text: 'Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter.',
      });
      navigate('/signin');
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Échec de la création du compte.',
      });
    }
  };



  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>S'inscrire</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nom</label>
            <input 
              value={user.name} 
              onChange={handleChange}
              name="name"
              placeholder="Votre nom complet"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input 
              value={user.email} 
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="Votre email"
            />
          </div>
          <div className="form-group">
            <label>Mot de passe</label>
            <input 
              value={user.password} 
              onChange={handleChange}
              name="password"
              type="password"
              placeholder="Créez un mot de passe"
            />
          </div>
          <button type="submit">S'inscrire</button>
        </form>
        <div className="signup-link">
          Déjà inscrit? <Link to="/signin">Se connecter</Link>
        </div>
      </div>
    </div>
  );
}
