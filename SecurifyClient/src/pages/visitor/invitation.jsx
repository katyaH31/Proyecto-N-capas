import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { baseURL } from '../../config/apiConfig'; // Importar baseURL
import './visitor.css';

const Invitation = () => {
  const [backendData, setBackendData] = useState([]);
  const navigate = useNavigate();

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

  const handleAcceptInvitation = (permissionId) => {
    navigate(`/qrgeneratorvisit/${permissionId}`);
  };

  return (
    <div className="main-containerinv text-sm">
      <aside className="sidebarinv" style={{ backgroundColor: 'white' }}>
        {/* Contenido del aside */}
      </aside>
      <div className="table-containerinv">
        <div className="custom-table-wrapper text-sm">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Descripción</th>
                <th>Fecha a realizar la visita</th>
                <th>Fecha de petición</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {backendData.map((row, index) => (
                <tr key={index}>
                  <td data-label="Descripción">{row.description}</td>
                  <td data-label="Fecha a realizar la visita">{row.requestedDated}</td>
                  <td data-label="Fecha de petición">{row.makeDate}</td>
                  <td data-label="Estado">{row.state}</td>
                  <td data-label="Acciones">
                    <button
                      onClick={() => handleAcceptInvitation(row.id)}
                      className={`px-2 py-1 text-white bg-green-700 hover:bg-green-800 rounded-md text-sm ${row.state !== 'Aprobado' ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={row.state !== 'Aprobado'}
                    >
                      Aceptar invitación
                    </button>
                  </td>
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
