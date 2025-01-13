import React from 'react';
import { Link } from 'react-router-dom'; // Asegurándote de que el Link esté importado
import scss from './header.module.scss';
import logo from '../../../assets/pokemonLogo.png';
import { PlayIcon as Pokeball, Book, User, PlusCircle } from 'lucide-react';
import iconpokeball from '../../../assets/pokeicon.png';
import { useUser } from '../user/UserContext'; // Importar el hook del contexto

export default function Header() {
  const { user } = useUser(); // Obtener el estado global del usuario

  return (
    <nav className={scss.header}>
      <div className={scss.div_header}>
        <div className={scss.div_logo}>
          <img src={iconpokeball} alt="icon" />
          <img src={logo} alt="logo" />
        </div>
        <ul className={scss.navbar_menu}>
          <li className={scss.navbar_item}>
            <Link to="/pokemons" className={scss.item}>
              <Pokeball size={20} />
              <span>Pokedex</span>
            </Link>
          </li>
          <li className={scss.navbar_item}>
            <Link to="/biblioteca" className={scss.item}>
              <Book size={20} />
              <span>Biblioteca</span>
            </Link>
          </li>
          <li className={scss.navbar_item}>
            <Link to="/crear" className={scss.item}>
              <PlusCircle size={20} />
              <span>Creación</span>
            </Link>
          </li>
          {user ? (
            <li className={scss.navbar_item}>
              <Link to="/perfil" className={scss.item}>
                <User size={20} />
                <span>Perfil</span>
              </Link>
            </li>
          ) : (
            <>
              <li className={scss.navbar_item}>
                <Link to="/login" className={scss.item}>
                  <User size={20} />
                  <span>Iniciar Sesión</span>
                </Link>
              </li>
              <li className={scss.navbar_item}>
                <Link to="/registro" className={scss.item}>
                  <span>Registrarse</span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
