import { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../layouts/NavBar';
import './AuthPages.css';

const url = 'http://127.0.0.1:8000/';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [societes, setSocietes] = useState([]);
  const [error, setError] = useState('');
  const token = localStorage.getItem('admin_token');

  useEffect(() => {
    if (!token) {
      setError('Admin not authenticated');
      return;
    }
    fetchData();
  }, [token]);

  const fetchData = async () => {
    try {
      const [usersRes, societesRes] = await Promise.all([
        axios.get(`${url}api/admin/users`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${url}api/admin/societes`, { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      setUsers(usersRes.data);
      setSocietes(societesRes.data);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to load admin data');
    }
  };

  const toggleSuspend = async (type, id) => {
    try {
      await axios.patch(`${url}api/admin/${type}/${id}/suspend`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
    } catch (err) {
      setError('Unable to update status');
    }
  };

  const deleteEntity = async (type, id) => {
    try {
      await axios.delete(`${url}api/admin/${type}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
    } catch (err) {
      setError('Unable to delete entity');
    }
  };

  return (
    <>
      <NavBar />
      <main className="auth-page">
        <div className="auth-card">
          <h2>Admin Dashboard</h2>
          {error && <div className="error-message">{error}</div>}
          <section>
            <h3>Users</h3>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Suspended</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.user_id}>
                    <td>{user.email}</td>
                    <td>{user.name}</td>
                    <td>{user.role}</td>
                    <td>{user.is_suspended ? 'Yes' : 'No'}</td>
                    <td>
                      <button onClick={() => toggleSuspend('users', user.user_id)}>Toggle Suspend</button>
                      <button onClick={() => deleteEntity('users', user.user_id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section>
            <h3>Companies</h3>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Type</th>
                  <th>Suspended</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {societes.map((societe) => (
                  <tr key={societe.id}>
                    <td>{societe.name}</td>
                    <td>{societe.email}</td>
                    <td>{societe.type}</td>
                    <td>{societe.is_suspended ? 'Yes' : 'No'}</td>
                    <td>
                      <button onClick={() => toggleSuspend('societes', societe.id)}>Toggle Suspend</button>
                      <button onClick={() => deleteEntity('societes', societe.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </main>
    </>
  );
}
