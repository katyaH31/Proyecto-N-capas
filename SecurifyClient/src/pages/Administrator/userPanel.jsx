import React, { useState, useRef, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { baseURL } from '../../config/apiConfig'; // Importar baseURL
import './admi.css';

Modal.setAppElement('#root'); // Asegúrate de que el root coincide con el id del div principal en tu index.html

const roleTranslations = {
  Sysadmin: 'Administrador del sistema',
  Admin: 'Administrador',
  Guard: 'Guardia',
  Resident: 'Residente',
  Manager: 'Encargado',
  Visitor: 'Visitante'
};

const UserPanel = () => {
  const [filterText, setFilterText] = useState('');
  const [newData, setNewData] = useState([]);
  const [backendData, setBackendData] = useState([]);
  const [formValues, setFormValues] = useState({
    username: '',
    casa: '',
    role: '',
    acciones: 'Acciones', // Default value for actions
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false); // Nuevo estado para el modal de edición
  const [modalMessage, setModalMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(true);
  const tableContainerRef = useRef(null);

  useEffect(() => {
    // Fetch data from the backend
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}user/allna`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        console.log('Backend response:', response);
        // Añadir campo 'acciones' y 'role' traducido a cada elemento del backend
        const dataWithActions = response.data.data.map((item) => ({
          ...item,
          acciones: 'Acciones',
          role: item.authorities.map(auth => roleTranslations[auth.authority] || auth.authority).join(', '),
          houseId: item.house ? item.house.id : ''
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

  const handleChangeManager = async () => {
    if (!formValues.username || !formValues.casa) {
      setIsSuccess(false);
      setModalMessage('Por favor, complete todos los campos.');
      setModalIsOpen(true);
      return;
    }

    try {
      const data = {
        username: formValues.username,
        houseId: formValues.casa
      };

      const response = await axios.put(`${baseURL}house/changeManager`, data, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });

      console.log('Response:', response.data);

      setIsSuccess(true);
      setModalMessage(response.data.message || 'Manager asignado con éxito.');
      setModalIsOpen(true);
      setFormValues({
        username: '',
        casa: '',
        acciones: 'Acciones',
      });
      // Refrescar los datos
      fetchGuards();
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      setIsSuccess(false);
      setModalMessage(error.response ? error.response.data.message : 'Ocurrió un error al asignar el manager');
      setModalIsOpen(true);
    }
  };

  const fetchGuards = async () => {
    try {
      const response = await axios.get(`${baseURL}user/allna`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const dataWithActions = response.data.data.map((item) => ({
        ...item,
        acciones: 'Acciones',
        role: item.authorities.map(auth => roleTranslations[auth.authority] || auth.authority).join(', '),
        houseId: item.house ? item.house.id : ''
      }));
      setBackendData(dataWithActions);
    } catch (error) {
      console.error('Error fetching data:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollTop = tableContainerRef.current.scrollHeight;
    }
  }, [newData]);

  const closeModal = () => {
    setModalIsOpen(false);
    setEditModalIsOpen(false); // Cerrar el modal de edición
  };

  const handleEdit = (username) => {
    const userToEdit = backendData.find(user => user.username === username);
    setFormValues({
      username: userToEdit.username,
      casa: userToEdit.houseId,
      role: userToEdit.role,
      acciones: 'Acciones'
    });
    setEditModalIsOpen(true);
  };

  const handleDelete = async (username) => {
    try {
      const response = await axios.delete(`${baseURL}user/${username}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });sin
      console.log('Response:', response.data);
      // Actualiza los datos después de eliminar el usuario
      setBackendData(prevData => prevData.filter(user => user.username !== username));
      setNewData(prevData => prevData.filter(user => user.username !== username));
    } catch (error) {
      console.error('Error deleting user:', error.response ? error.response.data : error.message);
    }
  };

  const handleConfirmEdit = async () => {
    try {
      const data = {
        username: formValues.username,
        houseId: formValues.casa,
        role: formValues.role
      };

      const response = await axios.put(`${baseURL}user/${formValues.username}`, data, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });

      console.log('Response:', response.data);

      setIsSuccess(true);
      setModalMessage('Usuario editado con éxito.');
      setEditModalIsOpen(false);
      // Refrescar los datos
      fetchGuards();
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      setIsSuccess(false);
      setModalMessage('Ocurrió un error al editar el usuario');
      setModalIsOpen(true);
    }
  };

  const columns = [
    {
      name: 'Usuario',
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: 'Casa',
      selector: (row) => row.houseId || row.casa,
      sortable: true,
    },
    {
      name: 'Rol',
      selector: (row) => row.role,
      sortable: true,
    },
    {
      name: 'Acciones',
      cell: (row) => (
        <div>
          <button onClick={() => handleEdit(row.username)} className="px-2 py-1 text-white bg-green-700 hover:bg-green-800 rounded-md text-sm">Editar</button>
          <button onClick={() => handleDelete(row.username)} className="px-2 py-1 text-white bg-red-500 hover:bg-red-600 rounded-md text-sm">Eliminar</button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
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
            placeholder="Usuario"
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
            name="role"
            className="form-input"
            placeholder="Rol"
            value={formValues.role}
            onChange={handleInputChange}
          />
          <button className="form-button" onClick={handleChangeManager}>Asignar Manager</button>
        </div>
        <div className="custom-table-wrapper text-sm" ref={tableContainerRef}>
          <table className="custom-table">
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Casa</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, index) => (
                <tr key={index}>
                  <td data-label="Nombre de usuario">{row.username}</td>
                  <td data-label="Casa">{row.houseId || row.casa}</td>
                  <td data-label="Rol">{row.role}</td>
                  <td data-label="Acciones">
                    <button onClick={() => handleEdit(row.username)} className="px-2 py-1 text-white bg-green-700 hover:bg-green-800 rounded-md text-sm">Editar</button>
                    <button onClick={() => handleDelete(row.username)} className="px-2 py-1 text-white bg-red-500 hover:bg-red-600 rounded-md text-sm">Eliminar</button>
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

      <Modal
        isOpen={editModalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Editar Usuario"
        className="custom-modal"
        overlayClassName="custom-overlay"
      >
        <div className="modal-content">
          <h2 className="modal-title">Editar Usuario</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="editUsername" className="block text-gray-700">Usuario:</label>
              <input
                type="text"
                id="editUsername"
                name="username"
                value={formValues.username}
                readOnly
                className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div>
              <label htmlFor="editCasa" className="block text-gray-700">Casa:</label>
              <input
                type="text"
                id="editCasa"
                name="casa"
                value={formValues.casa}
                readOnly
                className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div>
              <label htmlFor="editRole" className="block text-gray-700">Rol:</label>
              <input
                type="text"
                id="editRole"
                name="role"
                value={formValues.role}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleConfirmEdit}
                className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-md"
              >
                Confirmar
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md"
              >
                Regresar
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default UserPanel;
