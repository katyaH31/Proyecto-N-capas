import React, { useState } from 'react';
import Modal from 'react-modal';
import './residenta.css';

Modal.setAppElement('#root'); // Asegúrate de que el root coincide con el id del div principal en tu index.html

const HomeResidents = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    duiNumber: '',
    email: ''
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(true); // Añadido para controlar el estado del mensaje

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSuccess(true); // Éxito en la validación
      setModalMessage('El residente ha sido incorporado.');
      setModalIsOpen(true);
      // Aquí puedes enviar los datos del formulario o realizar otras acciones
    } else {
      setIsSuccess(false); // Error en la validación
      setModalMessage('¡Lo sentimos! La solicitud no se pudo realizar.');
      setModalIsOpen(true);
    }
  };

  const validateForm = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return (
      formData.firstName.trim() !== '' &&
      formData.lastName.trim() !== '' &&
      /^\d{9}$/.test(formData.duiNumber.replace(/-/g, '')) &&
      emailPattern.test(formData.email)
    );
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="qr-generator-container">
      <div className="main-container">
        <form onSubmit={handleSubmit} className="space-y-4 p-6 max-w-lg mx-auto content-container">
          <div className="left-content">
            <h1 className="text-2xl font-bold mb-4">Rellenar los campos para registrar Residente</h1>
            <div>
              <label htmlFor="firstName" className="block text-gray-700 text-left">Nombre:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-gray-700 text-left">Apellido:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="duiNumber" className="block text-gray-700 text-left">Número de DUI:</label>
              <input
                type="text"
                id="duiNumber"
                name="duiNumber"
                value={formData.duiNumber}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                maxLength="10"
                pattern="\d{8}-\d"
                title="El número de DUI debe contener 9 dígitos en el formato 00000000-0"
                placeholder="00000000-0"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 text-left">Correo electrónico:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            <div className="button-container">
              <button type="submit" className="generate-button text-left">Registrar Residente</button>
            </div>
          </div>
        </form>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Mensaje del formulario"
        className="custom-modal"
        overlayClassName="custom-overlay"
      >
        <div className="modal-content">
          <div className={`modal-icon ${isSuccess ? 'success' : 'error'}`}>
            <span>{isSuccess ? '✓' : 'X'}</span>
          </div>
          <h2 className="modal-title">{isSuccess ? 'Bienvenido' : '¡Lo sentimos!'}</h2>
          <p className="modal-message">{modalMessage}</p>
          <button 
            onClick={closeModal} 
            className={`modal-button ${isSuccess ? '' : 'error'}`}
          >
            Continuar
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default HomeResidents;
