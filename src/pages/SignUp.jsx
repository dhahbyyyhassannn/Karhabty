import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../component/auth';

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
    <div style={{padding:20}}>
      <h2>S'inscrire</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom</label>
          <input value={name} onChange={(e)=>setName(e.target.value)} />
        </div>
        <div>
          <label>Email</label>
          <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" />
        </div>
        <div>
          <label>Mot de passe</label>
          <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" />
        </div>
        <div>
          <label>Role</label>
          <select value={role} onChange={(e)=>setRole(e.target.value)}>
            <option value="0">Utilisateur</option>
            <option value="1">Entreprise</option>
            <option value="2">Admin</option>
          </select>
        </div>
        <button type="submit">S'inscrire</button>
        {error && <div style={{color:'red'}}>{error}</div>}
      </form>
    </div>
  );
}
