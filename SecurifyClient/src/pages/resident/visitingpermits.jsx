import React, { useState } from 'react';
import Modal from 'react-modal';
import './resident.css';

Modal.setAppElement('#root'); // Asegúrate de que el root coincide con el id del div principal en tu index.html

const Permits = () => {      
  const [formData, setFormData] = useState({
    visitorUser: '',
    house: '',
    entryType: '',
    startDate: '',     
    endDate: ''
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
      setModalMessage('La solicitud ha sido generada con éxito.');
      setModalIsOpen(true);
      // Aquí puedes enviar los datos del formulario o realizar otras acciones
    } else {
      setIsSuccess(false); // Error en la validación
      setModalMessage('La solicitud no se ha podido generar, complete los datos.');
      setModalIsOpen(true);
    }
  };

  const validateForm = () => {
    return (
      formData.visitorUser.trim() !== '' &&
      formData.house.trim() !== '' &&
      formData.entryType.trim() !== '' &&
      formData.startDate.trim() !== '' &&
      formData.endDate.trim() !== ''
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
            <h1 className="text-2xl font-bold mb-4">Rellenar los campos para solicitud de visita</h1>
            <div className="mb-4">
              <label htmlFor="visitorUser" className="block text-gray-700 text-left">Usuario del visitante:</label>
              <input
                type="text"
                id="visitorUser"
                name="visitorUser"
                value={formData.visitorUser}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="house" className="block text-gray-700 text-left">Casa:</label>
              <select
                id="house"
                name="house"
                value={formData.house}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              >
                <option value="" disabled hidden>Selecciona una casa</option>
                <option value="A-01">Casa A-01</option>
                <option value="A-02">Casa A-02</option>
                {/* Agrega más opciones según sea necesario */}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="entryType" className="block text-gray-700 text-left">Tipo de entrada:</label>
              <select
                id="entryType"
                name="entryType"
                value={formData.entryType}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              >
                <option value="" disabled hidden>Selecciona un tipo de entrada</option>
                <option value="Unica">Única</option>
                <option value="Otra">Otra</option>
                {/* Agrega más opciones según sea necesario */}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="startDate" className="block text-gray-700 text-left">Fecha de inicio:</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="endDate" className="block text-gray-700 text-left">Fecha de fin:</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            <div className="button-container flex justify-end">
              <button type="submit" className="generate-button">Enviar solicitud</button>
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
          <h2 className="modal-title">{isSuccess ? 'Éxito' : '¡Error!'}</h2>
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

export default Permits;
