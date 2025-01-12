import React, { useEffect, useState } from 'react'
import scss from './layout.module.scss'
import Header from '../Header/Header'
import { URL_POKEMON } from '../../../api/apiREST'
import axios from 'axios'
import * as FaIcons from 'react-icons/fa'
import Card from '../card/Card'
import Filter from './Filter'


export default function LayoutHome() {

    const [arrayPokemon, setArrayPokemon] = useState([]);
    const [globalPokemon, setGlobalPokemon] = useState([]);
    const [pages, setPages] = useState(1);
    const [search, setSearch] = useState("");

    useEffect(() => {

        const api = async () => {
            const limit = 15;
            const xp = (pages - 1) * limit;
            const apiPoke = await axios.get(
                `${URL_POKEMON}/?offset=${xp}&limit=${limit}`);


            setArrayPokemon(apiPoke.data.results);
        };


        api();
        getGlobalPokemons();
    }, [pages])


    const getGlobalPokemons = async () => {
        const res = await axios.get(`${URL_POKEMON}?offset=0&limit=1000`);
        const promises = res.data.results.map(pokemon => {
            return pokemon;
        });
        const results = await Promise.all(promises);
        setGlobalPokemon(results);

    };

    const filterPokemons = search?.length > 0
        ? globalPokemon?.filter(pokemon => pokemon?.name?.includes(search))
        : arrayPokemon


    const obtenerSearch = (e) => {
        const texto = e.toLowerCase()
        setSearch(texto)
        setPages(1)
    }


    return (
        <div className={scss.layout}>
            <Header/>

            <section className={scss.section_pagination}>

                <Filter></Filter>
                <div className={scss.div_search}>
                    <div>
                        <FaIcons.FaSearch></FaIcons.FaSearch>
                    </div>
                    <input type='search' onChange={e => obtenerSearch(e.target.value)}
                    ></input>
                </div>
                <div className={scss.container_pagination}>
                    <span className={scss.item_izquierdo} onClick={() => {
                        if (pages == 1) {
                            return console.log("no es posible retroceder");
                        }
                        setPages(pages - 1);

                    }}
                    ><FaIcons.FaAngleLeft></FaIcons.FaAngleLeft>
                    </span>
                    <span className={scss.item}> {pages} </span>
                    <span className={scss.item}> DE</span>
                    <span className={scss.item}> {Math.round(globalPokemon?.length / 15)}</span>
                    <span className={scss.item_derecho} onClick={() => {
                        if (pages === 67) {
                            return console.log("Ultima pagina");
                        }
                        setPages(pages + 1);

                    }}>
                        {""}
                        <FaIcons.FaAngleRight></FaIcons.FaAngleRight>{""}
                    </span>



                </div>
            </section>

            <div className={scss.card_content}>
                {filterPokemons.map((card, index) => {
                    return <Card key={index} card={card} />;
                })}
            </div>
        </div>
    )
}