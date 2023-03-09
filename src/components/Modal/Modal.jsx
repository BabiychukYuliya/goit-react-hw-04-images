import { useEffect } from 'react';

const Modal = ({ onModalClose, largeImageURL }) => {

    const hendelKey = e => {
      if (e.code === 'Escape' || e.target === e.currentTarget) {
        onModalClose();
      }
    };

  useEffect(() => {
    window.addEventListener('keydown', hendelKey);
    return () => window.removeEventListener('keydown', hendelKey);
    
  });


  return (
    <div className="Overlay" onClick={hendelKey}>
      <div className="Modal">
        <img src={largeImageURL} alt="" />
      </div>
    </div>
  );
}

export default Modal;