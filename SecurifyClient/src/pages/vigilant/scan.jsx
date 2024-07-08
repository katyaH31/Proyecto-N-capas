import React, { useState } from 'react';
import SidebarVigilant from '../../components/sidebarVigilant';
import { Link } from 'react-router-dom';
import QrScanner from 'react-qr-scanner';
import { baseURL } from '../../config/apiConfig'; // Importa baseURL desde config
import './vigilant.css';

const Scan = () => {
  const [scanResult, setScanResult] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [validationResult, setValidationResult] = useState(null);

  const handleScan = data => {
    if (data) {
      console.log(data.text); // Muestra la data escaneada en la consola
      setScanResult(data.text);
      validateToken(data.text); // Llama a la función de validación
      setShowPopup(true);
    }
  };

  const handleError = err => {
    console.error(err);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const validateToken = async (token) => {
    try {
      const response = await fetch(baseURL + 'qr/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token') // Usando el token del almacenamiento local
        },
        body: JSON.stringify({ token })
      });
      const result = await response.json();
      console.log(result); // Muestra el resultado de la validación en la consola
      setValidationResult(result.data);
    } catch (error) {
      console.error('Error al validar el token:', error);
    }
  };

  const previewStyle = {
    height: 360, // Aumenta la altura
    width: 480,  // Aumenta la anchura
  };

  return (
    <>
      <SidebarVigilant />
      <div className="main-containerScan text-sm">
        <aside className="sidebarScan" style={{ backgroundColor: 'white' }}></aside>
        <div className="qr-reader-container">
          <QrScanner
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={previewStyle}
          />
          <div className="btn-containerScan">
            <Link to="/homevigilant" className="btnScan">
              <span>Regresar</span>
            </Link>
          </div>
        </div>
        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <p>Código QR escaneado </p>
              {validationResult !== null && (
                <p>Resultado de la validación: {validationResult ? 'Válido' : 'Inválido'}</p>
              )}
              <button onClick={handleClosePopup} className="btnClosePopup">Cerrar</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Scan;
