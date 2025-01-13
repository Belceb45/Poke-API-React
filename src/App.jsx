import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LayoutHome from './components/home/layout/LayoutHome';
import Header from './components/home/header/Header';
import Register from './components/home/user/Register';
import Login from './components/home/user/Login';
import PerfilUsuario from './components/home/user/PerfilPoke'; // Componente para el perfil
import { UserProvider } from './components/home/user/UserContext'; // Importa el UserProvider

function App() {
  return (
    <UserProvider>  {/* Envuelve toda la app con el UserProvider */}
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/pokemons" />} />
          <Route path="/pokemons" element={<LayoutHome />} />
          <Route 
            path="/perfil" 
            element={<PerfilUsuario />} 
          />
          <Route path="/registro" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
