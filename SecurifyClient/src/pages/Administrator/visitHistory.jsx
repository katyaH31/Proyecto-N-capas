import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { baseURL } from '../../config/apiConfig';
import './admi.css';

const VisitHistory = () => {
  const [filterText, setFilterText] = useState('');
  const [backendData, setBackendData] = useState([]);
  const tableContainerRef = useRef(null);

  useEffect(() => {
    // Fetch data from the backend
    const fetchData = async () => {
      try {
        const response = await axios.get(baseURL + 'visits/all', {
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

  const filteredData = backendData.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(filterText.toLowerCase())
    )
  );

  return (
    <div className="main-containervisit text-sm">
      <aside className="sidebar" style={{ backgroundColor: 'white' }}>
        {/* Contenido del aside */}
      </aside>
      <div className="table-containervisit">
        <input
          type="text"
          className="filter-inputvisit"
          placeholder="Filtrar..."
          value={filterText}
          onChange={handleFilterChange}
        />
        <div className="custom-table-wrappervisit text-sm" ref={tableContainerRef}>
          <table className="custom-tablevisit">
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Casa</th>
                <th>Fecha</th>
                <th>Descripcion</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, index) => (
                <tr key={index}>
                  <td data-label="Nombre">{row.user.username}</td>
                  <td data-label="Casa">{row.house.id}</td>
                  <td data-label="Fecha">{row.visitDate}</td>
                  <td data-label="Descripcion">{row.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VisitHistory;
