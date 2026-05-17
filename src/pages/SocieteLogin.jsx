import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginSociete } from '../api/societeAPI';
import './AuthPages.css';

export default function SocieteLogin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await loginSociete(form);
      const { societe, token } = response;
      localStorage.setItem('societe', JSON.stringify(societe));
      localStorage.setItem('societe_id', societe.id);
      localStorage.setItem('societe_token', token);
      navigate('/societe/dashboard');
      window.location.reload();
    } catch (err) {
      setError(err?.response?.data?.error || 'Unable to sign in.');
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-box">
        <h2>Connexion entreprise</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Votre email"
              required
            />
          </div>
          <div className="form-group">
            <label>Mot de passe</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Votre mot de passe"
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit">Se connecter</button>
        </form>
      </div>
    </div>
  );
}
