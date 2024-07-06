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
  const [modalMessage, setModalMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(true);
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
  };

  const filteredData = [...backendData, ...newData].filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(filterText.toLowerCase())
    )
  );

  return (
    <div className="main-containerA text-sm">
      <aside className="sidebarA" style={{ backgroundColor: 'white' }}>
        {/* Contenido del aside */}
      </aside>
      <div className="table-containerA">
        <div className="table-container">
          <input
            type="text"
            className="filter-input"
            placeholder="Filtrar..."
            value={filterText}
            onChange={handleFilterChange}
          />
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
        <div className="custom-table-wrapper text-sm" ref={tableContainerRef}>
          <table className="custom-table">
            <thead>
              <tr>
                <th>Número de casa</th>
                <th>Poligono</th>
                <th>N° max de Residentes</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, index) => (
                <tr key={index}>
                  <td data-label="Número de casa">{row.houseId || row.id}</td>
                  <td data-label="Poligono">{row.polygon}</td>
                  <td data-label="N° Residentes">{row.numberOfResidents}</td>
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

export default Maintenance;
