import React, { useState, useRef } from 'react';
import DataTable from 'react-data-table-component';
import './admi.css';

const VisitHistory = () => {
  const [filterText, setFilterText] = useState('');
  const [newData, setNewData] = useState([]);
  const [formValues, setFormValues] = useState({
    correlativo: '',
    name: '',
    dui: '',
    home: '',
    date: '',
    hour: '',
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
    const allData = [...data, ...newData];

    // Obtener el mayor valor de correlativo actual, asegurando que sea un número válido
    const maxCorrelativo = allData.length > 0 
      ? Math.max(...allData.map(item => parseInt(item.correlativo, 10)).filter(Number.isFinite), 0)
      : 0;

    // Formatear el nuevo correlativo a 4 dígitos
    const newCorrelativo = (maxCorrelativo + 1).toString().padStart(4, '0');

    const newEntry = {
      ...formValues,
      correlativo: newCorrelativo, // Nuevo correlativo formateado
      home: parseInt(formValues.home, 10), // Convert home to number
    };
    setNewData((prevData) => [...prevData, newEntry]);
    setFormValues({
      correlativo: '',
      name: '',
      dui: '',
      home: '',
      date: '',
      hour: '',
      acciones: 'Acciones',
    });
  };

  const columns = [
    {
      name: 'Correlativo',
      selector: (row) => row.correlativo,
      sortable: true,
    },
    {
      name: 'Nombre/Apellido',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'N° de Dui',
      selector: (row) => row.dui,
      sortable: true,
    },
    {
      name: 'N° de casa',
      selector: (row) => row.home,
      sortable: true,
    },
    {
      name: 'Fecha',
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: 'Hora',
      selector: (row) => row.hour,
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
      correlativo: '0001',
      name: 'Katya Avalos',
      dui: '060987623-1',
      home: '13',
      date: '2024-06-12',
      hour: '12:00',
      acciones: 'Acciones',
    },
    {
      correlativo: '0002',
      name: 'Juan cardona',
      dui: '060987623-1',
      home: '31',
      date: '2024-06-12',
      hour: '12:00',
      acciones: 'Acciones',
    },
    {
      correlativo: '0003',
      name: 'David mesa',
      dui: '060987623-1',
      home: '10',
      date: '2024-06-12',
      hour: '12:00',
      acciones: 'Acciones',
    },
    {
      correlativo: '0004',
      name: 'Moises Urbina',
      dui: '060987623-1',
      home: '12',
      date: '2024-06-12',
      hour: '12:00',
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
    <div className="main-containervisit text-sm">
      <aside className="sidebarvisit">
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
        <div className="formvisit">
          <input
            type="text"
            name="name"
            className="form-inputvisit text-sm"
            placeholder="Nombre/apellido"
            value={formValues.name}
            onChange={handleInputChange}
          />

          <input
            type="text"
            name="dui"
            className="form-inputvisit text-sm"
            placeholder="N° de DUI"
            value={formValues.dui}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="home"
            className="form-inputvisit text-sm"
            placeholder="home"
            value={formValues.home}
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="date"
            className="form-inputvisit text-sm"
            placeholder="Fecha"
            value={formValues.date}
            onChange={handleInputChange}
          />
          <div className="formvisitor">
            <input
              type="time"
              name="hour"
              className="form-inputvisit"
              placeholder="Hora"
              value={formValues.hour}
              onChange={handleInputChange}
            />
          </div>
          <button className="form-buttonvisit text-sm" onClick={handleAddData}>Agregar a la tabla</button>
        </div>
        <div className="table-wrappervisit" ref={tableContainerRef}>
          <DataTable columns={columns} data={filteredData} />
        </div>
      </div>
    </div>
  );
};

export default VisitHistory;
