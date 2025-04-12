import React from 'react';
import scss from './modalconfirm.module.scss'; 

export default function ModalConfirm({ onClose, onConfirm, title, message, confirmText, cancelText }) {
  return (
    <div className={scss.modal_overlay}>
      <div className={scss.modal_content}>
        <p><strong>{title}</strong></p>
        <p>{message}</p>
        <button className={scss.confirm_button} onClick={onConfirm}>
          {confirmText || "Confirmar"}
        </button>
        <button className={scss.cancel_button} onClick={onClose}>
          {cancelText || "Cancelar"}
        </button>
      </div>
    </div>
  );
}
