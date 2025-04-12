import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LayoutHome from './components/home/layout/LayoutHome';
import Header from './components/home/header/Header';
import Register from './components/home/user/Register';
import Login from './components/home/user/Login';
import Biblioteca from './components/home/user/Biblioteca';
import Crear from './components/creacion/Crear';
import PerfilUsuario from './components/home/user/PerfilPoke'; // Componente para el perfil
import { UserProvider, useUser } from './components/home/user/UserContext'; // Proveedor de contexto para el manejo global del usuario

function App() {
  return (
    <UserProvider>  {/* UserProvider envuelve toda la aplicación para gestionar el estado global del usuario */}
      <Router> {/* Router para manejar las rutas de la aplicación */}
        <Header /> {/* Header se mantiene visible en todas las rutas */}

        <Routes> {/* Define las rutas de la aplicación */}
          {/* Redirección de la ruta raíz a "/pokemons" */}
          <Route path="/" element={<Navigate to="/pokemons" />} />

          {/* Ruta para la página principal de la Pokedex */}
          <Route path="/pokemons" element={<LayoutHome />} />

          {/* Ruta protegida para el perfil del usuario */}
          <Route path="/perfil" element={<PerfilUsuario />} />

          {/* Ruta para la página de registro de nuevos usuarios */}
          <Route path="/registro" element={<Register />} />

          {/* Ruta para la página de inicio de sesión */}
          <Route path="/login" element={<Login />} /> 

          {/* Ruta protegida para la biblioteca personal */}
          <Route 
            path="/biblioteca" 
            element={<ProtectedRoute><Biblioteca /></ProtectedRoute>} 
          />

          {/* Ruta protegida para la creación de un Pokémon */}
          <Route 
            path="/crear" 
            element={<ProtectedRoute><Crear /></ProtectedRoute>} 
          />
        </Routes>
      </Router>
    </UserProvider>
  );
}

// Componente que verifica si el usuario está logeado
function ProtectedRoute({ children }) {
  const { user } = useUser(); // Accede al contexto del usuario

  if (!user) {
    // Si no hay usuario, redirige a la página de login
    return <Navigate to="/login" />;
  }

  return children; // Si el usuario está logeado, renderiza los componentes hijos
}

export default App;
