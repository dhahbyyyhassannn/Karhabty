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
    <section className="auth-page">
      <div className="auth-card">
        <h2>Company Sign In</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Email
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </label>
          <label>
            Password
            <input type="password" name="password" value={form.password} onChange={handleChange} required />
          </label>
          {error && <div className="error-message">{error}</div>}
          <button className="btn btn-primary" type="submit">Sign in as company</button>
        </form>
      </div>
    </section>
  );
}
