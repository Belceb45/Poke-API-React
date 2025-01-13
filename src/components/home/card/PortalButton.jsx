// src/components/card/PortalButton.jsx
import React from 'react';
import Icon from '@mui/material/Icon';
import scss from './portalbutton.module.scss';

export default function PortalButton({ onClick }) {
  return (
    <button className={scss.button} onClick={onClick}>
      <Icon className={scss.add}>add_circle</Icon>
    </button>
  );
}
