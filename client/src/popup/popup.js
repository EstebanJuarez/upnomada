import React, { useState } from 'react';

import { library } from '@fortawesome/fontawesome-svg-core'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faUser } from '@fortawesome/free-solid-svg-icons'

library.add(faX)


function Popup({ children }) {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div>
      <div className="user-menu">
        <button className='btn-user' onClick={togglePopup}><FontAwesomeIcon className='user-icon text-bleu' icon={faUser} />

        </button>
      </div>
      {showPopup && (
        <div>
          <div className="popup-overlay" onClick={togglePopup}></div>
          <div className="popup">
            <div onClick={togglePopup}><FontAwesomeIcon icon="fa-solid fa-x" style={{ color: "#666666", }} /></div>
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
export default Popup;