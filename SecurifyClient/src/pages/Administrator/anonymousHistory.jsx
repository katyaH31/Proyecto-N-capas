import React, { useContext, useState, useRef, useEffect } from 'react';
import { DataContext } from "../../context/DataContext";
import './admi.css';

const AnonymousHistory = () => {
  const { anonymousData } = useContext(DataContext);
  const [filterText, setFilterText] = useState('');
  const tableContainerRef = useRef(null);

  useEffect(() => {
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollTop = tableContainerRef.current.scrollHeight;
    }
  }, [anonymousData]);

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
  ];

  const data = [
    {
      name: 'Katya',
      descripcion: 'Entregas de pedidos ya!',
    },
    {
      name: 'David',
      descripcion: 'Consultorio DR. Hernandez',
    },
    ...anonymousData, // Agregar nuevos datos
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
                
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, index) => (
                <tr key={index}>
                  <td data-label="Nombre">{row.name}</td>
                  <td data-label="Descripción">{row.descripcion}</td>
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
