import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { baseURL } from '../../config/apiConfig'; // Importar baseURL
import './visitor.css';

const QRGenerator = () => {
  const { permissionId } = useParams(); // Obtener el permissionId de los parámetros de la URL
  const [qrValue, setQrValue] = useState(''); // Inicialmente vacío
  const [buttonDisabled, setButtonDisabled] = useState(false); // Controla la deshabilitación del botón
  const [timeLeft, setTimeLeft] = useState(0); // Estado para el contador

  const generateQR = async () => {
    try {
      const tokenResponse = await axios.post(baseURL + 'qr/create-visitor', {
        permissionId: permissionId // Usar el permissionId de los parámetros
      }, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });

      const token = tokenResponse.data.data;
      setQrValue(token);
      setButtonDisabled(true);
      setTimeLeft(120); // Inicia el temporizador de 120 segundos
    } catch (error) {
      console.error('Error generating QR token:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    let timer;
    if (buttonDisabled && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setButtonDisabled(false); // Habilita el botón cuando el contador llega a cero
    }
    return () => clearInterval(timer);
  }, [buttonDisabled, timeLeft]);

  return (
    <div className="qr-generator-container">
      <aside className="sidebar" style={{ backgroundColor: 'white' }}>
        {/* Contenido del aside */}
      </aside>
      <div className="main-container">
        <div className="content-container">
          <div className="left-content">
            {/* Contenido izquierdo */}
          </div>
          <div className="right-content">
            {/* Renderiza el código QR solo si qrValue no está vacío */}
            {qrValue && (
              <div className="qr-code">
                <QRCode value={qrValue} size={256} />
              </div>
            )}
            <div className="button-container">
              <button onClick={generateQR} className="generate-button" disabled={buttonDisabled}>
                Generar QR
              </button>
              {buttonDisabled && (
                <div className="timer">
                  Tiempo restante para generar un nuevo código: {`${Math.floor(timeLeft / 60)}:${('0' + (timeLeft % 60)).slice(-2)}`}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRGenerator;
