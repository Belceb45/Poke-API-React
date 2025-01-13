import React, { useEffect, useState } from 'react';
import scss from './layout.module.scss';
import { URL_POKEMON } from '../../../api/apiREST';
import axios from 'axios';
import * as FaIcons from 'react-icons/fa';
import Card from '../card/Card';
import Filter from './Filter';
import ModalConfirm from '../card/ModalConfirm';

export default function LayoutHome() {
  const [arrayPokemon, setArrayPokemon] = useState([]);
  const [globalPokemon, setGlobalPokemon] = useState([]);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [types, setTypes] = useState([]);

  const handleTypesChange = (newSelectedTypes) => {
    setSelectedTypes(newSelectedTypes.map(type => type.title));
    setPages(1);
  };

  const handleOpenModal = (pokemon) => {
    setSelectedPokemon(pokemon);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPokemon(null);
  };

  const handleConfirmAdd = () => {
    alert(`¡${selectedPokemon?.name} ha sido agregado!`);
    setShowModal(false);
  };

  useEffect(() => {
    const api = async () => {
      const limit = 15;
      const xp = (pages - 1) * limit;
      const apiPoke = await axios.get(`${URL_POKEMON}/?offset=${xp}&limit=${limit}`);
      setArrayPokemon(apiPoke.data.results);
    };

    api();
    getGlobalPokemons();
    getTypes();
  }, [pages]);

  const getGlobalPokemons = async () => {
    const res = await axios.get(`${URL_POKEMON}?offset=0&limit=1000`);
    setGlobalPokemon(res.data.results);
  };

  const getTypes = async () => {
    const res = await axios.get('https://pokeapi.co/api/v2/type');
    setTypes(res.data.results.map(type => ({ title: type.name })));
  };

  const filterPokemons = search?.length > 0
    ? globalPokemon?.filter(pokemon => pokemon?.name?.includes(search))
    : arrayPokemon;

  const obtenerSearch = (e) => {
    const texto = e.toLowerCase();
    setSearch(texto);
    setPages(1);
  };

  return (
    <div className={scss.layout}>
      <section className={scss.section_pagination}>
        <Filter selectedTypes={selectedTypes.map(type => ({ title: type }))} onTypesChange={handleTypesChange} types={types} />

        <div className={scss.container_search_page}>
          <div className={scss.div_search}>
            <div>
              <FaIcons.FaSearch />
            </div>
            <input type='search' onChange={e => obtenerSearch(e.target.value)} />
          </div>
          <div className={scss.container_pagination}>
            <span className={scss.item_izquierdo} onClick={() => {
              if (pages === 1) {
                return console.log("No es posible retroceder");
              }
              setPages(pages - 1);
            }}>
              <FaIcons.FaAngleLeft />
            </span>
            <span className={scss.item}> {pages} </span>
            <span className={scss.item}> DE </span>
            <span className={scss.item}> {Math.round(globalPokemon?.length / 15)} </span>
            <span className={scss.item_derecho} onClick={() => {
              if (pages === 67) {
                return console.log("Última página");
              }
              setPages(pages + 1);
            }}>
              <FaIcons.FaAngleRight />
            </span>
          </div>
        </div>
      </section>

      {showModal && (
        <ModalConfirm
          onClose={handleCloseModal}
          onConfirm={handleConfirmAdd}
          pokemon={selectedPokemon}
        />
      )}

      <div className={scss.card_content}>
        {filterPokemons.map((card, index) => (
          <Card key={index} card={card} onAddClick={handleOpenModal} />
        ))}
      </div>
    </div>
  );
}
