import React, { useState, useRef, useEffect } from 'react';
import './admi.css';

const SecurityTeam= () => {
  const [filterText, setFilterText] = useState('');
  const [newData, setNewData] = useState([]);
  const [formValues, setFormValues] = useState({
    name: '',
    dui: '',
    correo: '',
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
      dui: '',
      correo: '',
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
      name: 'Nombre',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Número de DUI',
      selector: (row) => row.dui,
      sortable: true,
    },
    {
      name: 'Correo',
      selector: (row) => row.correo,
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
      dui: '060987623-1',
      correo: 'lisbetherrera98@gmail.com',
      acciones: 'Acciones',
    },
    {
      name: 'David',
      dui: '060987623-1',
      correo: 'lisbeloku98@gmail.com',
      acciones: 'Acciones',
    },
    {
      name: 'Cardo',
      dui: '060987623-1',
      correo: 'lisbeloku98@gmail.com',
      acciones: 'Acciones',
    },
    {
      name: 'Moi',
      dui: '060987623-1',
      correo: 'lisbeloku98@gmail.com',
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
            name="dui"
            className="form-inputse"
            placeholder="Número de DUI"
            value={formValues.dui}
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
                <th>N° de DUI</th>
                <th>Correo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, index) => (
                <tr key={index}>
                  <td data-label="Nombre">{row.name}</td>
                  <td data-label="N° de DUI">{row.dui}</td>
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