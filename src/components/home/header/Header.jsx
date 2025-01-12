import React from 'react';
import scss from './header.module.scss'
import logo from '../../../assets/pokemonLogo.png'


export default function Header(){
    return(
        <nav className={scss.header}>
            <div className={scss.div_header}>
                <h1 className={scss.navbar_pokemon}>PokeApp</h1>
                <div className={scss.div_logo}>
                    <img src={logo} alt="logo" />
                </div>
                <ul className={scss.navbar_menu}>
                    <li className={scss.navbar_item}>Pokedex</li>
                    <li className={scss.navbar_item}>Biblioteca</li>
                    <li>Creacion</li>
                    <li>Perfil</li>
                </ul>
            </div>
        </nav>
    )
}