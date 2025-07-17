import React from "react";
import './Modal.css';

export default function Modal({ isOpen, title, children }) {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {title && <h2 className="modal-title">{title}</h2>}
        {children}
      </div>
    </div>
  );
} 