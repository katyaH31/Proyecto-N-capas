import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import './visitor.css'; // 

const QRGenerator = () => {
  const [qrValue, setQrValue] = useState(''); // Inicialmente vacío
  const [buttonDisabled, setButtonDisabled] = useState(false); // Controla la deshabilitación del botón

  const generateQR = () => {
    setQrValue('https://new-url.com');
    setButtonDisabled(true); // Deshabilita el botón cuando se genera el código QR
  };

  useEffect(() => {
    if (qrValue !== '') {
      setTimeout(() => {
        setButtonDisabled(false); // Habilita el botón después de 2 minutos
      }, 120000); // 120000 milisegundos = 2 minutos
    }
  }, [qrValue]);

  return (
    <div className="main-container">
      <div className="content-container">
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
        </div>
      </div>
    </div>
  );
};

export default QRGenerator;
