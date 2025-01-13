import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import scss from './perfilpoke.module.scss';
import { useUser } from '../user/UserContext'; // Importa el hook del contexto

export default function PerfilUsuario() {
  const { user, setUser } = useUser(); // Obtén el estado global del usuario
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login'); // Si no hay usuario, redirige al login
    }
  }, [user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null); // Actualiza el estado global cuando el usuario cierre sesión
    navigate('/login'); // Redirige al login
  };

  return (
    <div className={scss.container}>
      {user && (
        <div className={scss.profileCard}>
          <h1>Entrenador Pokémon</h1>
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
            alt="Avatar Pokémon"
            className={scss.avatar}
          />
          <h2 className={scss.username}>{user.username}</h2>
          <p className={scss.badge}>¡Listo para la aventura!</p>
          <button onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      )}
    </div>
  );
}
