import React, { useEffect, useState } from 'react'
import scss from './layout.module.scss'
import Header from '../Header/Header'
import { URL_POKEMON } from '../../../api/apiREST'
import axios from 'axios'

export default function LayoutHome(){

    const [arrayPokemon,setArrayPokemon]=useState([])

    useEffect(()=>{

        const api=async()=>{
            const apiPoke=await axios.get(`${URL_POKEMON}`)
            console.log(apiPoke);
            
        }
        api()
    })
    return(
        <div className={scss.layuot}> 
            <Header></Header>
        </div>
    )
}