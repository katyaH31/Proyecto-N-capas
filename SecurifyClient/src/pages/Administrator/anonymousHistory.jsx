import React, { useContext, useState, useRef, useEffect } from 'react';
import DataTable from 'react-data-table-component';
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
    <div className="main-containeran text-sm">
      <aside className="sidebaran">
        {/* Contenido del aside */}
      </aside>
      <div className="table-containeran">
        <input
          type="text"
          className="filter-inputan"
          placeholder="Filtrar..."
          value={filterText}
          onChange={handleFilterChange}
        />
        <div className="table-wrapperan" ref={tableContainerRef}>
          <DataTable columns={columns} data={filteredData} />
        </div>
      </div>
    </div>
  );
};

export default AnonymousHistory;
