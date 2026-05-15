import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../component/auth';

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
    <div style={{padding:20}}>
      <h2>Se connecter</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" />
        </div>
        <div>
          <label>Mot de passe</label>
          <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" />
        </div>
        <button type="submit">Se connecter</button>
        {error && <div style={{color:'red'}}>{error}</div>}
      </form>
    </div>
  );
}
