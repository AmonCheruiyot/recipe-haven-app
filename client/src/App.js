// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import RecipesPage from './pages/RecipesPage';
import AdminPage from './pages/AdminPage';
import SupportPage from './pages/SupportPage';
import ProfilePopup from './components/ProfilePopup';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/profile" element={<ProfilePopup />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
