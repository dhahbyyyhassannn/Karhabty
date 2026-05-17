import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AuthPages.css';

const url = 'http://127.0.0.1:8000/';

export default function AdminLogin() {
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
      const response = await axios.post(`${url}api/admin/login`, form, {
        headers: { 'Content-Type': 'application/json' },
      });
      localStorage.setItem('admin_token', response.data.token);
      localStorage.setItem('admin', JSON.stringify(response.data.admin));
      navigate('/admin/dashboard');
      window.location.reload();
    } catch (err) {
      setError(err?.response?.data?.error || 'Unable to sign in.');
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h2>Admin Sign In</h2>
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
          <button className="btn btn-primary" type="submit">Sign in as admin</button>
        </form>
      </div>
    </section>
  );
}
