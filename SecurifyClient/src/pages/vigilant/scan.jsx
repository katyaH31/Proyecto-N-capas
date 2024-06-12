import React, { useState } from 'react';
import SidebarVigilant from '../../components/sidebarVigilant';
import { Link } from 'react-router-dom';
import QrScanner from 'react-qr-scanner';
import './vigilant.css';

const Scan = () => {
  const [scanResult, setScanResult] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleScan = data => {
    if (data) {
      setScanResult(data.text);
      setShowPopup(true);
    }
  };

  const handleError = err => {
    console.error(err);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const previewStyle = {
    height: 240,
    width: 320,
  };

  return (
    <>
      <SidebarVigilant />
      <div className="main-containerScan text-sm">
        <aside className="sidebarScan"></aside>
        <div className="btn-containerScan">
          <Link to="/homevigilant" className="btnScan">
            <span>Regresar</span>
          </Link>
        </div>
        <div className="qr-reader-container">
          <QrScanner
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={previewStyle}
          />
        </div>
        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <p>Código QR escaneado con éxito!</p>
              <button onClick={handleClosePopup} className="btnClosePopup">Cerrar</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Scan;





