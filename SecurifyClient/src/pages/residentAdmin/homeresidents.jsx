import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { baseURL } from '../../config/apiConfig'; // Importa baseURL desde config
import './residenta.css';

Modal.setAppElement('#root'); // Asegúrate de que el root coincide con el id del div principal en tu index.html

const HomeResidents = ({ houseId }) => {
  const [formData, setFormData] = useState({
    username: '',
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(true); // Añadido para controlar el estado del mensaje
  const [residents, setResidents] = useState([]);

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        const response = await axios.get(baseURL + `house/?houseId=${houseId}/residents`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        setResidents(response.data);
      } catch (error) {
        console.error('Error fetching residents:', error);
      }
    };

    fetchResidents();
  }, [houseId]);

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
      setIsSuccess(false); // Error en la validación
      setModalMessage('Por favor, ingrese el nombre de usuario.');
      setModalIsOpen(true);
      return;
    }

    try {
      const response = await axios.post(baseURL + 'house/residenthouse', formData, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      setIsSuccess(true); // Éxito en la validación
      setModalMessage(response.data.message || 'El residente ha sido incorporado.');
      setModalIsOpen(true);
      setResidents((prevResidents) => [...prevResidents, response.data]); // Actualiza la lista de residentes
      // Reset form data
      setFormData({
        username: '',
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
    return formData.username.trim() !== '';
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="home-residents">
      <aside className="sidebar" style={{ backgroundColor: 'white' }}>
        {/* Contenido del aside */}
      </aside>
      <div className="main-container">
        <form onSubmit={handleSubmit} className="space-y-4 p-6 max-w-lg mx-auto content-container">
          <div className="left-content">
            <h1 className="text-2xl font-bold mb-4">Registrar Residente</h1>
            <div>
              <label htmlFor="username" className="block text-gray-700 text-left">Usuario o Correo:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                placeholder="Username or Email"
              />
            </div>
            <div className="button-container">
              <button type="submit" className="generate-button text-left">Registrar Residente</button>
            </div>
          </div>
        </form>
        <div className="residents-list">
          <h2 className="text-xl font-bold mb-4 text-center">Residentes actuales</h2>
          <div className="table-containervisit">
            <div className="custom-table-wrappervisit">
              <table className="custom-tablevisit">
              <thead>
                <tr>
                   <th>Usuario</th>
                   <th>Correo</th>
                   <th>Acciones</th>
                </tr>
             </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {residents.map((resident) => (
                <tr key={resident.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{resident.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{resident.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-indigo-600 hover:text-indigo-900">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          </div>

        </div>
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
