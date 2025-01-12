import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function Filter() {
  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={typesPokemons}
      disableCloseOnSelect
      getOptionLabel={(option) => option.title}
      renderOption={(props, option, { selected }) => {
        const { key, ...optionProps } = props;
        return (
          <li key={key} {...optionProps}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.title}
          </li>
        );
      }}
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label="Ordenar por" placeholder="Filtro" />
      )}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const typesPokemons = [
  { title: 'Planta'},
  { title: 'Fuego'},
  { title: 'Bicho'},
  { title: 'Hada'},
  { title: 'Dragón'},
  { title: 'Fantasma'},
  { title: 'Tierra'},
  { title: 'Normal'},
  { title: 'Psiquico'},
  { title: 'Acero'},
  { title: 'Siniestro'},
  { title: 'Electrico'},
  { title: 'Lucha'},
  { title: 'Volador'},
  { title: 'Hielo'},
  { title: 'Veneno'},
  { title: 'Roca'},
  { title: 'Agua'},

];
