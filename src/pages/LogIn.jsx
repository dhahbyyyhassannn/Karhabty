import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import login from '../api/authAPI';
import './AuthPages.css';
import Swal from 'sweetalert2';

export default function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await login({ email, password });
      if (response.token) {
        localStorage.setItem('token', response.token);        localStorage.setItem('userName', response.user?.name || 'User');        Swal.fire({
          icon: 'success',
          title: 'Connexion réussie',
          text: 'Vous êtes maintenant connecté.',
        });
        navigate('/');
      } else {
        setError(response.message || 'Échec de la connexion.');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: error.response?.data?.message || 'Échec de la connexion.',
      });
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-box">
        <h2>Se connecter</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input 
              value={email} 
              onChange={(e)=>setEmail(e.target.value)} 
              type="email"
              placeholder="Votre email"
            />
          </div>
          <div className="form-group">
            <label>Mot de passe</label>
            <input 
              value={password} 
              onChange={(e)=>setPassword(e.target.value)} 
              type="password"
              placeholder="Votre mot de passe"
            />
          </div>
          <button type="submit">Se connecter</button>
          {error && <div className="error-message">{error}</div>}
        </form>
        <div className="signin-link">
          Pas encore inscrit? <Link to="/signup">S'inscrire</Link>
        </div>
      </div>
    </div>
  );
}
