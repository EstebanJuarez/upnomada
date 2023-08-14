import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faTimes } from '@fortawesome/free-solid-svg-icons';

library.add(faUser, faTimes);

function Popup({ children }) {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Obtén la ubicación actual

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  useEffect(() => {
    setShowPopup(false); // Cierra el popup al cambiar la URL
  }, [location]);

  return (
    <div>
      <div className="user-menu">
        <button className='btn-user' onClick={togglePopup}>
          <FontAwesomeIcon className='user-icon text-bleu' icon={faUser} />
        </button>
      </div>
      {showPopup && (
        <div>
          <div className="popup-overlay" onClick={togglePopup}></div>
          <div className="popup">
            <div onClick={togglePopup}>
              <FontAwesomeIcon icon={faTimes} style={{ color: "#666666" }} />
            </div>
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

export default Popup;
