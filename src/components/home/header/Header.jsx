import React from 'react';
import scss from './header.module.scss'
import logo from '../../../assets/pokemonLogo.png'
import { PlayIcon as Pokeball, Book, User, PlusCircle } from 'lucide-react'
import iconpokeball from '../../../assets/pokeicon.png';

export default function Header() {
    return (
        <nav className={scss.header}>
            <div className={scss.div_header}>
                <div className={scss.div_logo}>
                    <img src={iconpokeball} alt="icon"></img>
                    <img src={logo} alt="logo" />
                </div>
                <ul className={scss.navbar_menu}>
                    <li className={scss.navbar_item}>
                        <Pokeball size={20} />
                        <span>Pokedex</span>
                    </li>
                    <li className={scss.navbar_item}>
                        <Book size={20} />
                        <span>Biblioteca</span>
                    </li>
                    <li className={scss.navbar_item}>
                        <PlusCircle size={20} />
                        <span>Creación</span>
                    </li>
                    <li className={scss.navbar_item}>
                        <User size={20} />
                        <span>Perfil</span>
                    </li>
                </ul>
            </div>
        </nav>
    );
}