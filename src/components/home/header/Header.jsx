import React from 'react';
import scss from './header.module.scss'
import logo from '../../../assets/pokemonLogo.png'

export default function Header(){
    return(
        <nav className={scss.header}>
            <div className={scss.div_header}>
                <div className={scss.div_logo}>
                    <img src={logo} alt="logo" />
                </div>
                <div className={scss.div_search}> 
                    <input type='search'></input>
                </div>
            </div>
        </nav>
    )
}