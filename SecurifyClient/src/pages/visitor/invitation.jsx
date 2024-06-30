import React, { useState, useRef, useEffect } from 'react';
import './visitor.css';

const Invitation = () => {
  const [filterText, setFilterText] = useState('');
  const [newData, setNewData] = useState([]);
  const [formValues, setFormValues] = useState({
    name: '',
    date: '',
    state: '',
    acciones: 'Acciones', // Valor predeterminado para acciones
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
      casa: parseInt(formValues.casa, 10), // Convertir casa a número
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
    
    <div className="main-containerinv text-sm">
       <aside className="sidebarinv" style={{ backgroundColor: 'white' }}>
        {/* Contenido del aside */}
      </aside>
      <div className="table-containerinv">
      <div className="table-container">
        <input
          type="text"
          className="filter-input"
          placeholder="Filtrar..."
          value={filterText}
          onChange={handleFilterChange}
        />
      </div>
        <div className="custom-table-wrapper text-sm" ref={tableContainerRef}>
          <table className="custom-table">
            <thead>
              <tr>
                <th>Nombre de familia</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, index) => (
                <tr key={index}>
                  <td data-label="Nombre de familia">{row.name}</td>
                  <td data-label="Fecha">{row.date}</td>
                  <td data-label="Estado">{row.state}</td>
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

export default Invitation;