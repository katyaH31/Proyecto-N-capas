import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import axios from 'axios';
import './visitor.css';

const QRGenerator = () => {
  const [qrValue, setQrValue] = useState(''); // Inicialmente vacío
  const [buttonDisabled, setButtonDisabled] = useState(false); // Controla la deshabilitación del botón
  const [timeLeft, setTimeLeft] = useState(0); // Estado para el contador

  const generateQR = async () => {
    console.log('generateQR function called');
    try {
      console.log("coman mierda");
      const tokenResponse = await axios.post('http://localhost:8080/api/qr/create', {
        permissionId: '367f6946-e8bc-4c95-b4da-2b72c46106ee'
      }, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });

      const token = tokenResponse.data.data;
      setQrValue(token);
      setButtonDisabled(true); // Deshabilita el botón cuando se genera el código QR
      setTimeLeft(120); // Inicializa el contador a 120 segundos (2 minutos)
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
                <button onClick={() => { console.log('Button clicked'); generateQR(); }} className="generate-button" disabled={buttonDisabled}>
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
