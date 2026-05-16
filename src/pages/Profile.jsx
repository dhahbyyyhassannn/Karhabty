import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../layouts/NavBar';

export default function Profile() {
  const userName = localStorage.getItem('userName');
  const navigate = useNavigate();

  if (!localStorage.getItem('token')) {
    navigate('/signin');
    return null;
  }

  return (
    <div>
      <NavBar />
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h1>Profile</h1>
        <p>Welcome back, <strong>{userName || 'User'}</strong>!</p>
        <p>This is your profile page.</p>
      </div>
    </div>
  );
}
