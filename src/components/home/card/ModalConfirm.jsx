import React from 'react';
import scss from './modalconfirm.module.scss'; // Asegúrate de importar el archivo CSS

export default function ModalConfirm({ onClose, onConfirm, pokemon }) {
  return (
    <div className={scss.modal_overlay}>
      <div className={scss.modal_content}>
        <p>¿Agregar a <strong>{pokemon?.name}</strong>?</p>
        <button className={scss.confirm_button} onClick={onConfirm}>Confirmar</button>
        <button className={scss.cancel_button} onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
}
