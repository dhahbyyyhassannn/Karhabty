import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createSociete } from '../api/societeAPI';
import './AuthPages.css';

export default function SocieteRegister() {
  const [form, setForm] = useState({ name: '', type: 'rent', email: '', password: '', phone: '', address: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await createSociete(form);
      setSuccess('Company created successfully');
      setTimeout(() => navigate('/societe/signin'), 800);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to create company');
    }
  };

  return (
    <section className="signin-container">
      <div className="signin-box">
        <h2>Register Company</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Company name</label>
            <input name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Type</label>
            <select name="type" value={form.type} onChange={handleChange}>
              <option value="sale">Sale</option>
              <option value="rent">Rent</option>
            </select>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input name="password" type="password" value={form.password} onChange={handleChange} required minLength={6} />
          </div>
          <div className="form-group">
            <label>Phone (optional)</label>
            <input name="phone" value={form.phone} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Address (optional)</label>
            <input name="address" value={form.address} onChange={handleChange} />
          </div>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          <button type="submit">Create company</button>
        </form>
      </div>
    </section>
  );
}
