import React, { useState } from 'react';
import { getDatabase, ref, set } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { app } from '../../../firebase';
import scss from './register.module.scss';
import { useUser } from '../user/UserContext'; // Importar el hook del UserContext

export default function Register() {
  const { setUser } = useUser(); // Acceder al setUser del contexto
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
      
      // Guardar los datos del usuario en la base de datos de Firebase
      await set(ref(db, 'Users/' + userId), {
        name: formData.username,
        pass: formData.password,
      });

      // Guardar el usuario en localStorage
      const user = { username: formData.username };
      localStorage.setItem('user', JSON.stringify(user));

      // Actualizar el estado global del usuario
      setUser(user);

      setMessage('Cuenta creada con éxito');
      
      // Redirigir al login después de crear la cuenta
      navigate('/login');
    } catch (error) {
      console.error(error);
      setMessage('Error al crear la cuenta: ' + error.message);
    }
  };

  return (
    <div className={scss.container}>
      <div className={scss.register}>
        <h1>Crear cuenta</h1>
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
          <button type="submit">Registrar</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}
