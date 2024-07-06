import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { baseURL } from '../../config/apiConfig'; // Importar baseURL
import './visitor.css';

const Invitation = () => {
  const [backendData, setBackendData] = useState([]);
  const tableContainerRef = useRef(null);

  const statusTranslations = {
    APPROVED: 'Aprobado',
    PENDING: 'Pendiente',
    DENIED: 'Denegado',
    USED: 'Usado'
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(baseURL + 'permission/visitors', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        const dataWithTranslations = response.data.data.map((item) => ({
          ...item,
          state: statusTranslations[item.status] || item.status
        }));
        setBackendData(dataWithTranslations);
      } catch (error) {
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollTop = tableContainerRef.current.scrollHeight;
    }
  }, [backendData]);

  return (
      <div className="main-containerinv text-sm">
        <aside className="sidebarinv" style={{ backgroundColor: 'white' }}>
          {/* Contenido del aside */}
        </aside>
        <div className="table-containerinv">
          <div className="custom-table-wrapper text-sm" ref={tableContainerRef}>
            <table className="custom-table">
              <thead>
              <tr>
                <th>Descripción</th>
                <th>Fecha a realizar la visita</th>
                <th>Fecha de petición</th>
                <th>Estado</th>
              </tr>
              </thead>
              <tbody>
              {backendData.map((row, index) => (
                  <tr key={index}>
                    <td data-label="Descripción">{row.description}</td>
                    <td data-label="Fecha a realizar la visita">{row.requestedDated}</td>
                    <td data-label="Fecha de petición">{row.makeDate}</td>
                    <td data-label="Estado">{row.state}</td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  );
};

export default Invitation;
