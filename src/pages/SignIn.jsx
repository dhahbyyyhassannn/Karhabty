import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../component/auth';
import './AuthPages.css';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await login({ email, password });
      if (res.token) {
        localStorage.setItem('token', res.token);
        navigate('/');
      } else {
        setError('Échec de la connexion');
      }
    } catch (err) {
      setError(err.message || 'Erreur');
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
