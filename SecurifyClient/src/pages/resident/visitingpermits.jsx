import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { baseURL } from '../../config/apiConfig'; // Importar baseURL
import './resident.css';

Modal.setAppElement('#root'); // Asegúrate de que el root coincide con el id del div principal en tu index.html

const Permits = () => {
  const [formData, setFormData] = useState({
    visitorUser: '',
    description: '',
    date: '',
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setIsSuccess(false);
      setModalMessage('Por favor, complete todos los campos.');
      setModalIsOpen(true);
      return;
    }

    try {
      const url = baseURL + 'permission/create';
      const response = await axios.post(url, formData, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      setIsSuccess(true);
      setModalMessage(response.data.message || 'La solicitud ha sido generada con éxito.');
      setModalIsOpen(true);
      // Reset form data
      setFormData({
        visitorUser: '',
        description: '',
        date: '',
      });
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : 'Ocurrió un error al añadir la entrada';
      setIsSuccess(false);
      setModalMessage(errorMessage);
      setModalIsOpen(true);
      console.log('Error:', error);
    }
  };

  const validateForm = () => {
    return (
      formData.visitorUser.trim() !== '' &&
      formData.description.trim() !== '' &&
      formData.date.trim() !== ''
    );
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="visit-permits">
      <aside className="sidebar">
        {/* Contenido del aside */}
      </aside>
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
              <label htmlFor="description" className="block text-gray-700 text-left">Descripción:</label>
              <input
                type="text"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="date" className="block text-gray-700 text-left">Fecha:</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
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
