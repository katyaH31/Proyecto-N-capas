import React, { useState, useRef, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { baseURL } from '../../config/apiConfig'; // Importar baseURL
import './admi.css';

Modal.setAppElement('#root'); // Asegúrate de que el root coincide con el id del div principal en tu index.html

const UserPanel = () => {
  const [filterText, setFilterText] = useState('');
  const [newData, setNewData] = useState([]);
  const [backendData, setBackendData] = useState([]);
  const [formValues, setFormValues] = useState({
    username: '',
    casa: '',
    correo: '',
    acciones: 'Acciones', // Default value for actions
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(true);
  const tableContainerRef = useRef(null);

  useEffect(() => {
    // Fetch data from the backend
    const fetchData = async () => {
      try {
        const response = await axios.get(baseURL + 'user/allna', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        console.log('Backend response:', response);
        // Añadir campo 'acciones' a cada elemento del backend
        const dataWithActions = response.data.data.map((item) => ({
          ...item,
          acciones: 'Acciones'
        }));
        setBackendData(dataWithActions);
      } catch (error) {
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
      }
    };

    fetchData();
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
    console.log('Nombre de usuario:', formValues.username);
    console.log('Casa:', formValues.casa);
    console.log('Correo:', formValues.correo);

    if (!formValues.username || !formValues.casa || !formValues.correo) {
      setIsSuccess(false);
      setModalMessage('Por favor, complete todos los campos.');
      setModalIsOpen(true);
      return;
    }

    const casaValue = parseInt(formValues.casa, 10);
    if (isNaN(casaValue)) {
      setIsSuccess(false);
      setModalMessage('Número de casa debe ser un número.');
      setModalIsOpen(true);
      return;
    }

    try {
      const data = {
        username: formValues.username,
        houseId: casaValue,
        email: formValues.correo,
        acciones: 'Acciones',
      };

      const response = await axios.post(baseURL + 'user', data, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });

      console.log('Response:', response.data);

      setIsSuccess(true);
      setModalMessage(response.data.message || 'La entrada se ha agregado con éxito.');
      setModalIsOpen(true);
      setNewData((prevData) => [...prevData, data]);
      setFormValues({
        username: '',
        casa: '',
        correo: '',
        acciones: 'Acciones',
      });
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      setIsSuccess(false);
      setModalMessage(error.response ? error.response.data.message : 'Ocurrió un error al agregar la entrada');
      setModalIsOpen(true);
    }
  };

  useEffect(() => {
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollTop = tableContainerRef.current.scrollHeight;
    }
  }, [newData]);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const columns = [
    {
      name: 'Nombre de usuario',
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: 'Casa',
      selector: (row) => row.houseId || row.casa,
      sortable: true,
    },
    {
      name: 'Correo',
      selector: (row) => row.email || row.correo,
      sortable: true,
    },
    {
      name: 'Acciones',
      selector: (row) => row.acciones,
      sortable: true,
    },
  ];

  const filteredData = [...backendData, ...newData].filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(filterText.toLowerCase())
    )
  );

  return (
    <div className="main-containerpa text-sm">
      <aside className="sidebarpa" style={{ backgroundColor: 'white' }}>
        {/* Contenido del aside */}
      </aside>
      <div className="table-containerpa">
        <input
          type="text"
          className="filter-input"
          placeholder="Filtrar..."
          value={filterText}
          onChange={handleFilterChange}
        />
        <div className="form">
          <input
            type="text"
            name="username"
            className="form-input"
            placeholder="Nombre de usuario"
            value={formValues.username}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="casa"
            className="form-input"
            placeholder="Casa"
            value={formValues.casa}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="correo"
            className="form-input"
            placeholder="Correo"
            value={formValues.correo}
            onChange={handleInputChange}
          />
          <button className="form-button" onClick={handleAddData}>Agregar a la tabla</button>
        </div>
        <div className="custom-table-wrapper text-sm" ref={tableContainerRef}>
          <table className="custom-table">
            <thead>
              <tr>
                <th>Nombre de usuario</th>
                <th>Casa</th>
                <th>Correo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, index) => (
                <tr key={index}>
                  <td data-label="Nombre de usuario">{row.username}</td>
                  <td data-label="Casa">{row.houseId || row.casa}</td>
                  <td data-label="Correo">{row.email || row.correo}</td>
                  <td data-label="Acciones">{row.acciones}</td>
                </tr>
              ))}
            </tbody>
          </table>
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

export default UserPanel;
