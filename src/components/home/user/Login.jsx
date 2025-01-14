import React, { useState } from 'react';
import { getDatabase, ref, get } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../user/UserContext';
import scss from './login.module.scss';
import { app } from '../../../firebase';

export default function Login() {
  const { setUser } = useUser(); // Contexto del usuario
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const db = getDatabase(app);
      const userId = formData.username.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
      const userRef = ref(db, 'Users/' + userId);
      const userSnapshot = await get(userRef);

      if (userSnapshot.exists()) {
        const user = userSnapshot.val();

        if (user.pass === formData.password) {
          const userData = { username: formData.username };

          //  Guarda primero en el contexto
          setUser(userData);

          //  Luego sincroniza con localStorage
          localStorage.setItem('user', JSON.stringify(userData));

          //  Finalmente, redirige al perfil
          navigate('/perfil');
        } else {
          setMessage('Contraseña incorrecta');
        }
      } else {
        setMessage('Usuario no encontrado');
      }
    } catch (error) {
      console.error(error);
      setMessage('Error al iniciar sesión: ' + error.message);
    }
  };

  return (
    <div className={scss.container}>
      <div className={scss.login}>
        <h1>Iniciar sesión</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Nombre de usuario</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Iniciar sesión</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}
