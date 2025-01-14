import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LayoutHome from './components/home/layout/LayoutHome';
import Header from './components/home/header/Header';
import Register from './components/home/user/Register';
import Login from './components/home/user/Login';
import PerfilUsuario from './components/home/user/PerfilPoke'; // Componente para el perfil
import { UserProvider } from './components/home/user/UserContext'; // Proveedor de contexto para el manejo global del usuario


function App() {
  return (
    // UserProvider envuelve toda la aplicación para gestionar el estado global del usuario
    <UserProvider>  
      <Router> {/* Router para manejar las rutas de la aplicación */}
        <Header /> {/* Header se mantiene visible en todas las rutas */}

        <Routes> {/* Define las rutas de la aplicación */}
          {/* Redirección de la ruta raíz a "/pokemons" */}
          <Route path="/" element={<Navigate to="/pokemons" />} />

          {/* Ruta para la página principal de la Pokedex */}
          <Route path="/pokemons" element={<LayoutHome />} />

          {/* Ruta protegida para el perfil del usuario */}
          <Route 
            path="/perfil" 
            element={<PerfilUsuario />} 
          />

          {/* Ruta para la página de registro de nuevos usuarios */}
          <Route path="/registro" element={<Register />} />

          {/* Ruta para la página de inicio de sesión */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
