import React, { useState, useRef, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import './admi.css';

const Maintenance = () => {
  const [filterText, setFilterText] = useState('');
  const [newData, setNewData] = useState([]);
  const [formValues, setFormValues] = useState({
    name: '',
    casa: '',
    poligono: '',
    residente: '',
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
      casa: '',
      poligono: '',
      residente: '',
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
      name: 'Nombre encargado',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Número de casa',
      selector: (row) => row.casa,
      sortable: true,
    },
    {
      name: 'Poligono',
      selector: (row) => row.poligono,
      sortable: true,
    },
    {
      name: 'N° Residentes',
      selector: (row) => row.residente,
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
      casa: 12,
      poligono: 'poligono a',
      residente: 5,
      acciones: 'Acciones',
    },
    {
      name: 'Cardona',
      casa: 10,
      poligono: 'poligono b',
      residente: 2,
      acciones: 'Acciones',
    },
    {
      name: 'David',
      casa: 1,
      poligono: 'poligono d',
      residente: 3,
      acciones: 'Acciones',
    },
    {
      name: 'Moises',
      casa: 19,
      poligono: 'poligono c',
      residente: 4,
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
      <aside className="sidebar">
        {/* if it was necessary*/}
      </aside>
      <div className="table-container">
        <input
          type="text"
          className="filter-input"
          placeholder="Filtrar..."
          value={filterText}
          onChange={handleFilterChange}
        />
        <div className="form">
          <input
            type="text"
            name="name"
            className="form-input"
            placeholder="Nombre residente"
            value={formValues.name}
            onChange={handleInputChange}
          />
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
            placeholder="poligono"
            value={formValues.poligono}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="residente"
            className="form-input"
            placeholder="residentes"
            value={formValues.residente}
            onChange={handleInputChange}
          />
          <button className="form-button" onClick={handleAddData}>Agregar a la tabla</button>
        </div>
        <div className="table-wrapper" ref={tableContainerRef}>
          <DataTable columns={columns} data={filteredData} />
        </div>
      </div>
    </div>
  );
};

export default Maintenance;
