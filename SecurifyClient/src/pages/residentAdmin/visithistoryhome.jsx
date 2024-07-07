import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseURL } from '../../config/apiConfig';

const VisitHistoryTable = ({ houseId }) => {
  const [visitas, setVisitas] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchVisitas = async () => {
      try {
        const response = await axios.get(baseURL + 'visits/house', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        console.log('Visitas:', response.data.data);
        setVisitas(response.data.data);
      } catch (error) {
        console.error('Error fetching visitas:', error);
      }
    };

    fetchVisitas();
  }, [houseId]);

  const handleDelete = (id) => {
    const nuevasVisitas = visitas.filter((visita) => visita.id !== id);
    console.log(`Eliminar visita con id ${id}`);
    console.log('Nuevas visitas:', nuevasVisitas);
    setVisitas(nuevasVisitas); // Actualiza el estado 'visitas'
  };

  const filteredVisitas = visitas.filter((visita) => {
    if (filter === 'all') return true;
    if (filter === 'approved' && visita.estado === 'Aprobado') return true;
    if (filter === 'denied' && visita.estado === 'Denegado') return true;
    return false;
  });

  return (
    <main className="">
      <div className="py-4 flex flex-col items-center">
        <aside className="sidebar"style={{ backgroundColor: 'white' }}>
        {/* Contenido del aside */}
        </aside>
        <div id='permission-container' >
        <h2 className=" text-xl font-bold mb-4 text-center">Historial de visitas</h2>
        <div className="mb-4">
        <label htmlFor="filter" className="mr-2">Mostrar:</label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="all">Todas</option>
          <option value="approved">Aprobadas</option>
          <option value="denied">Denegadas</option>
        </select>
      </div>
      <div className="table-containervisit" >
      <div className="custom-table-wrappervisit" >
        <table className="custom-tablevisit">
          <thead>
            <tr>
              <th className="border border-gray-200 px-2 py-1 text-center">Fecha de Visita</th>
              <th className="border border-gray-200 px-2 py-1 text-center">Descripción</th>
              <th className="border border-gray-200 px-2 py-1 text-center">ID de Casa</th>
              <th className="border border-gray-200 px-2 py-1 text-center">Usuario</th>
              <th className="border border-gray-200 px-2 py-1 text-center">Acción</th>
            </tr>
          </thead>
          <tbody>
            {filteredVisitas.map((visita, index) => (
              <tr key={index}>
                <td className="border border-gray-200 px-2 py-1 text-center">{new Date(visita.visitDate).toLocaleString()}</td>
                <td className="border border-gray-200 px-2 py-1 text-center">{visita.description}</td>
                <td className="border border-gray-200 px-2 py-1 text-center">{visita.house.id}</td>
                <td className="border border-gray-200 px-2 py-1 text-center">{visita.user.username}</td>
                <td className="border border-gray-200 px-2 py-1 text-center">
                  <button onClick={() => handleDelete(visita.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div> 
    </div>
    </div>
  </main>
  );
};

export default VisitHistoryTable;