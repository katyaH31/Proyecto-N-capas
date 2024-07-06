import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './admi.css';
import { baseURL } from "../../config/apiConfig.js";

Modal.setAppElement('#root'); // Asegúrate de que este ID coincide con el ID de tu elemento raíz en index.html

const SecurityTeam = () => {
  const [filterText, setFilterText] = useState('');
  const [backendData, setBackendData] = useState([]);
  const [formValues, setFormValues] = useState({
    name: '',
    correo: '',
    acciones: 'Acciones', // Default value for actions
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(true);
  const tableContainerRef = useRef(null);

  const fetchGuards = async () => {
    try {
      const response = await axios.get(baseURL + 'user/guards', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      setBackendData(response.data.data.map(item => ({
        name: item.username,
        correo: item.email,
        acciones: 'Acciones'
      })));
    } catch (error) {
      console.error('Error fetching data:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    fetchGuards();
  }, []);

  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleAddData = async () => {
    if (!formValues.name) {
      setIsSuccess(false);
      setModalMessage('Por favor, complete todos los campos.');
      setModalIsOpen(true);
      return;
    }

    try {
      const response = await axios.put(baseURL + 'user/assignGuard', {
        username: formValues.name
      }, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      setIsSuccess(true);
      setModalMessage('Guard created successfully');
      setModalIsOpen(true);
      fetchGuards(); // Actualizar la tabla después de agregar el guardia
      setFormValues({
        name: '',
        correo: '',
        acciones: 'Acciones',
      });
    } catch (error) {
      setIsSuccess(false);
      setModalMessage(`Error creating guard: ${error.response ? error.response.data.message : error.message}`);
      setModalIsOpen(true);
    }
  };

  const handleDelete = async (username) => {
    try {
      const response = await axios.delete(baseURL + `user/${username}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      console.log('Response:', response.data);
      setBackendData(prevData => prevData.filter(user => user.name !== username));
    } catch (error) {
      setIsSuccess(false);
      setModalMessage(`Error deleting guard: ${error.response ? error.response.data.message : error.message}`);
      setModalIsOpen(true);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollTop = tableContainerRef.current.scrollHeight;
    }
  }, [backendData]);

  const filteredData = backendData.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(filterText.toLowerCase())
    )
  );

  return (
    <div className="main-containerse text-sm">
      <aside className="sidebar" style={{ backgroundColor: 'white' }}>
        {/* Contenido del aside */}
      </aside>
      <div className="table-containerse">
        <input
          type="text"
          className="filter-inputse"
          placeholder="Filtrar..."
          value={filterText}
          onChange={handleFilterChange}
        />
        <div className="form">
          <input
            type="text"
            name="name"
            className="form-inputse"
            placeholder="Username"
            value={formValues.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="correo"
            className="form-inputse"
            placeholder="Correo"
            value={formValues.correo}
            onChange={handleInputChange}
          />
          <button className="form-buttonse" onClick={handleAddData}>Agregar a la tabla</button>
        </div>
        <div className="custom-table-wrapperse text-sm" ref={tableContainerRef}>
          <table className="custom-tablese">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, index) => (
                <tr key={index}>
                  <td data-label="Nombre">{row.name}</td>
                  <td data-label="Correo">{row.correo}</td>
                  <td data-label="Acciones">
                    <button
                      onClick={() => handleDelete(row.name)}
                      className="px-2 py-1 text-white bg-red-500 hover:bg-red-600 rounded-md text-sm"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Notification"
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

export default SecurityTeam;
