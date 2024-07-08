import React, { useState, useRef, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { baseURL } from '../../config/apiConfig';
import './admi.css';

Modal.setAppElement('#root'); // Asegúrate de que el root coincide con el id del div principal en tu index.html

const Maintenance = () => {
  const [filterText, setFilterText] = useState('');
  const [newData, setNewData] = useState([]);
  const [backendData, setBackendData] = useState([]);
  const [formValues, setFormValues] = useState({
    casa: '',
    poligono: '',
    residente: '',
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false); // Estado para la ventana emergente de actualización
  const [modalMessage, setModalMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(true);
  const [selectedHouse, setSelectedHouse] = useState(null); // Estado para la casa seleccionada
  const [newResidentsNumber, setNewResidentsNumber] = useState(''); // Estado para el nuevo número de residentes
  const tableContainerRef = useRef(null);

  useEffect(() => {
    // Fetch data from the backend
    const fetchData = async () => {
      try {
        const response = await axios.get(baseURL + 'house/all', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        console.log('Backend response:', response);
        setBackendData(response.data.data);
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
    console.log('Casa:', formValues.casa);
    console.log('Poligono:', formValues.poligono);
    console.log('Residente:', formValues.residente);

    if (!formValues.casa || !formValues.poligono || !formValues.residente) {
      setIsSuccess(false);
      setModalMessage('Por favor, complete todos los campos.');
      setModalIsOpen(true);
      return;
    }

    const casaValue = formValues.casa;
    const residenteValue = parseInt(formValues.residente, 10);
    if (isNaN(residenteValue)) {
      setIsSuccess(false);
      setModalMessage('Número de residentes debe ser un número.');
      setModalIsOpen(true);
      return;
    }

    try {
      const data = {
        houseId: casaValue,
        polygon: formValues.poligono,
        numberOfResidents: residenteValue,
      };

      const response = await axios.post(baseURL + 'house', data, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });

      console.log('Response:', response.data);

      setIsSuccess(true);
      setModalMessage(response.data.message || 'La entrada se ha agregado con éxito.');
      setModalIsOpen(true);
      setNewData((prevData) => [...prevData, data]);
      setFormValues({
        casa: '',
        poligono: '',
        residente: '',
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
    setUpdateModalIsOpen(false);
  };

  const filteredData = [...backendData, ...newData].filter((item) =>
      Object.values(item).some((value) =>
          value.toString().toLowerCase().includes(filterText.toLowerCase())
      )
  );

  const handleUpdate = (row) => {
    setSelectedHouse(row);
    setNewResidentsNumber(row.numberOfResidents);
    setUpdateModalIsOpen(true);
  };

  const handleConfirmUpdate = async () => {
    if (isNaN(newResidentsNumber) || newResidentsNumber === '') {
      setIsSuccess(false);
      setModalMessage('Número de residentes debe ser un número.');
      setModalIsOpen(true);
      return;
    }

    try {
      const response = await axios.put(`${baseURL}house/${selectedHouse.houseId || selectedHouse.id}`, {
        numberOfResidents: newResidentsNumber
      }, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });

      console.log('Response:', response.data);

      setIsSuccess(true);
      setModalMessage(response.data.message || 'Casa actualizada con éxito.');
      setModalIsOpen(true);
      setUpdateModalIsOpen(false);

      setBackendData((prevData) =>
          prevData.map((house) =>
              (house.houseId === selectedHouse.houseId || house.id === selectedHouse.id) ? { ...house, numberOfResidents: newResidentsNumber } : house
          )
      );

      // Recargar la página después de la actualización exitosa
      window.location.reload();
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      setIsSuccess(false);
      setModalMessage(error.response ? error.response.data.message : 'Ocurrió un error al actualizar la entrada');
      setModalIsOpen(true);
    }
  };

  return (
      <div className="main-containerA text-sm">
        <aside className="sidebarA" style={{ backgroundColor: 'white' }}>
          {/* Contenido del aside */}
        </aside>
        <div className="table-containerA">
          <div className="table-container">

          </div>
          <div className="form">
            <input
                type="text"
                name="casa"
                className="form-input"
                placeholder="Número de casa"
                value={formValues.casa}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="poligono"
                className="form-input"
                placeholder="Poligono"
                value={formValues.poligono}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="residente"
                className="form-input"
                placeholder="N° Residentes"
                value={formValues.residente}
                onChange={handleInputChange}
            />
            <button className="form-button" onClick={handleAddData}>Agregar a la tabla</button>
          </div>
          <div className="custom-table-wrapper text-sm" ref={tableContainerRef} style={{ maxHeight: '400px', overflowY: 'auto', overflowX: 'auto' }}>
            <table className="custom-table">
              <thead>
              <tr>
                <th>Número de casa</th>
                <th>Poligono</th>
                <th>N° max de Residentes</th>
                <th>Acciones</th>
              </tr>
              </thead>
              <tbody>
              {filteredData.map((row, index) => (
                  <tr key={index}>
                    <td data-label="Número de casa">{row.houseId || row.id}</td>
                    <td data-label="Poligono">{row.polygon}</td>
                    <td data-label="N° Residentes">{row.numberOfResidents}</td>
                    <td data-label="Acciones">
                      <button
                          className="update-button px-2 py-1 text-white bg-blue-500 hover:bg-blue-600 rounded-md text-sm"
                          onClick={() => handleUpdate(row)}
                      >
                        Actualizar
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
            isOpen={updateModalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Actualizar Número de Residentes"
            className="custom-modal"
            overlayClassName="custom-overlay"
        >
          <div className="modal-content">
            <h2 className="modal-title">Actualizar Número de Residentes</h2>
            <input
                type="text"
                value={newResidentsNumber}
                onChange={(e) => setNewResidentsNumber(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                placeholder="Nuevo número de residentes"
            />
            <div className="modal-buttons">
              <button
                  onClick={handleConfirmUpdate}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
              >
                Actualizar
              </button>
              <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md"
              >
                Cancelar
              </button>
            </div>
          </div>
        </Modal>
      </div>
  );
};

export default Maintenance;
