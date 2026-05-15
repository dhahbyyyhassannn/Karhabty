import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signup } from '../component/auth';
import './AuthPages.css';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('0');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await signup({ name, email, password, role: Number(role) });
      if (res.message) {
        navigate('/signin');
      } else {
        setError('Échec de la création');
      }
    } catch (err) {
      setError(err.message || 'Erreur');
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
              value={name} 
              onChange={(e)=>setName(e.target.value)}
              placeholder="Votre nom complet"
            />
          </div>
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
              placeholder="Créez un mot de passe"
            />
          </div>
          <div className="form-group">
            <label>Rôle</label>
            <select value={role} onChange={(e)=>setRole(e.target.value)}>
              <option value="0">Utilisateur</option>
              <option value="1">Entreprise</option>
              <option value="2">Admin</option>
            </select>
          </div>
          <button type="submit">S'inscrire</button>
          {error && <div className="error-message">{error}</div>}
        </form>
        <div className="signup-link">
          Déjà inscrit? <Link to="/signin">Se connecter</Link>
        </div>
      </div>
    </div>
  );
}
