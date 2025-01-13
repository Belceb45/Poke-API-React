import React, { useState } from 'react';
import { getDatabase, ref, get } from 'firebase/database'; // Importa las funciones necesarias de Firebase
import { useNavigate } from 'react-router-dom';
import { useUser } from '../user/UserContext'; // Importar el hook del UserContext
import scss from './login.module.scss';
import { app } from '../../../firebase'; // Asegúrate de que la configuración de Firebase esté correctamente importada

export default function Login() {
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
    setMessage(''); // Restablece el mensaje

    try {
      const db = getDatabase(app);
      const userId = formData.username.toLowerCase().replace(/[^a-zA-Z0-9]/g, ''); // Asegúrate de que el nombre de usuario sea consistente con la base de datos

      // Obtener los datos del usuario desde Firebase
      const userRef = ref(db, 'Users/' + userId);
      const userSnapshot = await get(userRef);

      if (userSnapshot.exists()) {
        const user = userSnapshot.val();

        // Verificar la contraseña
        if (user.pass === formData.password) {
          // Si las credenciales son correctas, almacena el usuario en el contexto global y localStorage
          setUser({ username: formData.username });
          localStorage.setItem('user', JSON.stringify({ username: formData.username }));

          navigate('/perfil'); // Redirige al perfil
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
