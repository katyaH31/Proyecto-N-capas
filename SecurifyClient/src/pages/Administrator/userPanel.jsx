import React, { useState, useRef, useEffect } from 'react';
import './admi.css';
const UserPanel = () => {
  const [filterText, setFilterText] = useState('');
  const [newData, setNewData] = useState([]);
  const [formValues, setFormValues] = useState({
    name: '',
    dui: '',
    casa: '',
    correo: '',
    representante: '',
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
      casa: '',
      correo: '',
      representante: '',
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
      name: 'Casa',
      selector: (row) => row.casa,
      sortable: true,
    },
    {
      name: 'Correo',
      selector: (row) => row.correo,
      sortable: true,
    },
    {
      name: 'Representante',
      selector: (row) => row.representante,
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
      casa: 13,
      correo: 'lisbetherrera98@gmail.com',
      representante: 'SI SOY',
      acciones: 'Acciones',
    },
    {
      name: 'David',
      dui: '060987623-1',
      casa: 13,
      correo: 'lisbeloku98@gmail.com',
      representante: 'SI SOY',
      acciones: 'Acciones',
    },
    {
      name: 'Cardo',
      dui: '060987623-1',
      casa: 13,
      correo: 'lisbeloku98@gmail.com',
      representante: 'HOLI',
      acciones: 'Acciones',
    },
    {
      name: 'Moi',
      dui: '060987623-1',
      casa: 13,
      correo: 'lisbeloku98@gmail.com',
      representante: 'HOLI',
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
    <div className="main-containerpa text-sm">
      <aside className="sidebarpa" style={{ backgroundColor: 'white' }}>
        {/* Contenido del aside */}
      </aside>
      <div className="table-containerpa">
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
            placeholder="Nombre"
            value={formValues.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="dui"
            className="form-input"
            placeholder="N° de DUI"
            value={formValues.dui}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="casa"
            className="form-input"
            placeholder="Casa"
            value={formValues.casa}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="correo"
            className="form-input"
            placeholder="Correo"
            value={formValues.correo}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="representante"
            className="form-input"
            placeholder="Representante"
            value={formValues.representante}
            onChange={handleInputChange}
          />
          <button className="form-button" onClick={handleAddData}>Agregar a la tabla</button>
        </div>
        <div className="custom-table-wrapper text-sm" ref={tableContainerRef}>
          <table className="custom-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>N° de DUI</th>
                <th>Casa</th>
                <th>Correo</th>
                <th>Represenntante</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, index) => (
                <tr key={index}>
                  <td data-label="Nombre">{row.name}</td>
                  <td data-label="N° de DUI">{row.dui}</td>
                  <td data-label="Casa">{row.casa}</td>
                  <td data-label="Correo">{row.casa}</td>
                  <td data-label="Representante">{row.representante}</td>
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

export default UserPanel;