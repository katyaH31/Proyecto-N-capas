import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import './resident.css'; //

const QRGeneratorr = () => {
  const [qrValue, setQrValue] = useState(''); // Inicialmente vacío
  const [buttonDisabled, setButtonDisabled] = useState(false); // Controla la deshabilitación del botón
  const [timeLeft, setTimeLeft] = useState(0); // Estado para el contador

  const generateQR = () => {
    setQrValue('https://new-url.comaaaaaaaaaa');
    setButtonDisabled(true); // Deshabilita el botón cuando se genera el código QR
    setTimeLeft(120); // Inicializa el contador a 120 segundos (2 minutos)
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
       <aside className="sidebar">
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

export default QRGeneratorr;
