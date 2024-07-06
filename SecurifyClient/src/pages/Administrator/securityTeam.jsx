import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './admi.css';
import { baseURL } from "../../config/apiConfig.js";

const SecurityTeam = () => {
  const [filterText, setFilterText] = useState('');
  const [backendData, setBackendData] = useState([]);
  const [formValues, setFormValues] = useState({
    name: '',
    correo: '',
    acciones: 'Acciones', // Default value for actions
  });

  useEffect(() => {
    const fetchData = async () => {
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
    fetchData();
  }, []);

  const tableContainerRef = useRef(null);

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

  const handleAddData = () => {
    const newEntry = {
      ...formValues,
      acciones: 'Acciones'
    };
    setBackendData((prevData) => [...prevData, newEntry]);
    setFormValues({
      name: '',
      correo: '',
      acciones: 'Acciones',
    });
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
                placeholder="Nombre"
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
                    <td data-label="Acciones">{row.acciones}</td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  );
};

export default SecurityTeam;
