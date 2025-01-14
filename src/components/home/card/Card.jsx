import React, { useState } from "react";
import scss from './card.module.scss'
import { useEffect } from "react";
import { URL_ESPECIES, URL_EVOLICIONES, URL_POKEMON } from "../../../api/apiREST";
import axios from 'axios'
import PortalButton from "./PortalButton";

export default function Card({ card, onAddClick }) {

    const [itemPokemon, setItemPokemon] = useState({});
    const [especiePokemon, setEspeciePokemon] = useState({});
    const [evoluciones, setEvoluciones] = useState([]);


    

    useEffect(() => {
        const dataPokemon = async () => {
            const api = await axios.get(`${URL_POKEMON}/${card.name}`)
            setItemPokemon(api.data)
        }
        dataPokemon()
    }, [card]);



    useEffect(() => {

        const dataEspecie = async () => {
            const URL = card.url.split("/");
            const api = await axios.get(`${URL_ESPECIES}/${URL[6]}`)
            setEspeciePokemon({
                url_especie: api?.data?.evolution_chain,
                data: api?.data,
            });
        };
        dataEspecie();
    }, [card]);


    useEffect(() => {
        async function getPokemonImage(id) {
            const response = await axios.get(`${URL_POKEMON}/${id}`)
            return response?.data?.sprites?.other["official-artwork"]?.front_default;
        }

        if (especiePokemon?.url_especie) {

            const obtenerEvoluciones = async () => {
                const arrayEvoluciones = [];

                try {
                    if (especiePokemon?.url_especie?.url) {
                        const URL = especiePokemon.url_especie.url.split("/");
                        if (URL.length > 6) {
                            const api = await axios.get(`${URL_EVOLICIONES}/${URL[6]}`);

                            const URL2 = api?.data?.chain?.species?.url?.split("/");
                            if (URL2 && URL2.length > 6) {
                                const img1 = await getPokemonImage(URL2[6]);
                                arrayEvoluciones.push({
                                    img: img1,
                                    name: api?.data?.chain?.species?.name,
                                });
                            }

                            if (api?.data?.chain?.evolves_to?.length !== 0) {
                                const DATA2 = api?.data?.chain?.evolves_to[0]?.species;
                                const ID = DATA2?.url?.split("/");
                                if (ID && ID.length > 6) {
                                    const img2 = await getPokemonImage(ID[6]);
                                    arrayEvoluciones.push({
                                        img: img2,
                                        name: DATA2?.name,
                                    });
                                }

                                if (api?.data?.chain?.evolves_to[0]?.evolves_to?.length !== 0) {
                                    const DATA3 = api?.data?.chain?.evolves_to[0]?.evolves_to[0]?.species;
                                    const ID = DATA3?.url?.split("/");
                                    if (ID && ID.length > 6) {
                                        const img3 = await getPokemonImage(ID[6]);
                                        arrayEvoluciones.push({
                                            img: img3,
                                            name: DATA3?.name,
                                        });
                                    }
                                }
                            }

                            setEvoluciones(arrayEvoluciones);
                        } else {
                            console.warn("URL incompleta:", especiePokemon.url_especie.url);
                        }
                    }
                } catch (error) {
                    console.error("Error al obtener evoluciones:", error);
                }
            };


            obtenerEvoluciones()
        }

    }, [especiePokemon]);



    var pokeID = itemPokemon?.id?.toString();
    if (pokeID?.length == 1) {
        pokeID = "00" + pokeID;
    } else if (pokeID?.length == 2) {
        pokeID = "0" + pokeID;
    }

    return (
        <div className={scss.card}>
            <img className={scss.img_pokemon} src={itemPokemon?.sprites?.other["official-artwork"]?.front_default} alt="pokemon"></img>
            <div className={`bg-${especiePokemon?.data?.color?.name} ${scss.sub_card}`}>
                <strong className={scss.id_card}  > #{pokeID} </strong>
                <div className={scss.content_add}>
                    <strong className={scss.name_card}  > {itemPokemon.name} </strong>
                    <PortalButton onClick={() => onAddClick(itemPokemon)} /> {/*Portal*/}

                </div>
                <h4 className={scss.altura_pokemon}  >Altura: {itemPokemon.height}0 cm</h4>
                <h4 className={scss.peso_pokemon}  >Peso: {itemPokemon.weight / 10} kg</h4>
                <h4 className={scss.habitat_pokemon}  >Habitat: {especiePokemon?.data?.habitat?.name}</h4>

                <div className={scss.container_stats}>
                    {itemPokemon?.stats?.map((habilities, index) => {
                        return <h6 key={index} className={scss.items_stats}>
                            <span className={scss.name}>{habilities.stat.name}</span>
                            <progress value={habilities.base_stat} max={110}></progress>
                            <span className={scss.numero}>{habilities.base_stat}</span>

                        </h6>
                    })}
                </div>

                <div className={scss.container_type_color}>
                    {itemPokemon?.types?.map((typ, index) => {
                        return (
                            <h6
                                key={index}
                                className={`color-${typ.type.name} ${scss.color_type}`}
                            >
                                {" "}
                                {typ.type.name}{" "}
                            </h6>
                        );
                    })}
                </div>
                <div className={scss.container_evoluciones}>
                    {evoluciones.map((evo, index) => {
                        return (
                            <div className={scss.item_evo} key={index}>
                                <img src={evo.img} alt={evo.name} className={scss.img_evo}></img>  {/* CORREGIDO */}
                                <h6>{evo.name}</h6>
                            </div>
                        );
                    })}
                </div>

            </div>

        </div>
    )

}