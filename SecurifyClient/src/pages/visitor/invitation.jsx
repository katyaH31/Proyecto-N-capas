import React, { useState, useRef, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import './visitor.css';
const Invitation = () => {
  const [filterText, setFilterText] = useState('');
  const [newData, setNewData] = useState([]);
  const [formValues, setFormValues] = useState({
    name: '',
    date: '',
    state: '',
    acciones: 'Acciones', // Default value for actions
  });

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
      casa: parseInt(formValues.casa, 10), // Convert casa to number
    };
    setNewData((prevData) => [...prevData, newEntry]);
    setFormValues({
      name: '',
      date: '',
      state: '',
      acciones: 'Acciones',
    });
  };

  useEffect(() => {
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollTop = tableContainerRef.current.scrollHeight;
    }
  }, [newData]);

  const columns = [
    {
      name: 'Nombre de familia',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Fecha',
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: 'Estado',
      selector: (row) => row.state,
      sortable: true,
    },
    {
      name: 'Acciones',
      selector: (row) => row.acciones,
      sortable: true,
    },
  ];

  const data = [
    {
      name: 'Katya',
      date: '2024-02-12',
      state: 'Activo',
      acciones: 'Acciones',
    },
    {
      name: 'Moises',
      date: '2024-02-12',
      state: 'Activo',
      acciones: 'Acciones',
    },
    {
      name: 'Cardo',
      date: '2024-02-12',
      state: 'Activo',
      acciones: 'Acciones',
    },
    {
      name: 'David',
      date: '2024-02-12',
      state: 'Activo',
      acciones: 'Acciones',
    },
    ...newData, // Agregar nuevos datos
  ];

  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(filterText.toLowerCase())
    )
  );

  return (
    <div className="main-container text-sm">
      <aside className="sidebar" style={{ backgroundColor: 'white' }}>
        {/* Contenido del aside */}
      </aside>
      <div className="table-container">
        <input
          type="text"
          className="filter-input"
          placeholder="Filtrar..."
          value={filterText}
          onChange={handleFilterChange}
        />
        <div className="table-wrapper" ref={tableContainerRef}>
          <DataTable columns={columns} data={filteredData} />
        </div>
      </div>
    </div>
  );
};

export default Invitation;