import React, { useContext, useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { DataContext } from "../../context/DataContext";
import './admi.css';
import { baseURL } from "../../config/apiConfig.js";

const AnonymousHistory = () => {
  const { anonymousData } = useContext(DataContext);
  const [filterText, setFilterText] = useState('');
  const [backendData, setBackendData] = useState([]);
  const tableContainerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(baseURL + 'anonymous/all', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        const formattedData = response.data.data.map(item => ({
          name: item.name,
          descripcion: item.description,
          fecha: item.visitDate
        }));
        setBackendData(formattedData);
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

  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
  };

  const columns = [
    {
      name: 'Nombre',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Descripción',
      selector: (row) => row.descripcion,
      sortable: true,
    },
    {
      name: 'Fecha',
      selector: (row) => row.fecha,
      sortable: true,
    },
  ];

  const data = [
    ...backendData, // Agregar nuevos datos
  ];

  const filteredData = data.filter((item) =>
      Object.values(item).some((value) =>
          value.toString().toLowerCase().includes(filterText.toLowerCase())
      )
  );

  return (
      <div className="main-containerAno text-sm">
        <aside className="sidebarAno" style={{ backgroundColor: 'white' }}>
          {/* Contenido del aside */}
        </aside>
        <div className="table-container">
          <input
              type="text"
              className="filter-inputan"
              placeholder="Filtrar..."
              value={filterText}
              onChange={handleFilterChange}
          />
          <div className="custom-table-wrapperAno text-sm" ref={tableContainerRef}>
            <table className="custom-tableAno">
              <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Fecha</th>
              </tr>
              </thead>
              <tbody>
              {filteredData.map((row, index) => (
                  <tr key={index}>
                    <td data-label="Nombre">{row.name}</td>
                    <td data-label="Descripción">{row.descripcion}</td>
                    <td data-label="Fecha">{row.fecha}</td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  );
};

export default AnonymousHistory;
