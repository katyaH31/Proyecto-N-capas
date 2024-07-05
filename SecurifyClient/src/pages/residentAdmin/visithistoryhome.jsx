import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseURL } from '../../config/apiConfig';

const VisitHistoryTable = ({ houseId }) => {
  const [visitas, setVisitas] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchVisitas = async () => {
      try {
        const response = await axios.get(baseURL + 'house/history/visits/?houseId=' + houseId, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        setVisitas(response.data);
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
    <div className="py-4 flex flex-col items-center">
      <aside className="sidebar">
        {/* Contenido del aside */}
      </aside>
      <h2 className="text-xl font-bold mb-4 text-center">Historial de visitas</h2>
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
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-200 px-2 py-1 text-center">Nombre del visitante</th>
              <th className="border border-gray-200 px-2 py-1 text-center">Fecha de inicio</th>
              <th className="border border-gray-200 px-2 py-1 text-center">Hora</th>
              <th className="border border-gray-200 px-2 py-1 text-center">Fecha de vencimiento</th>
              <th className="border border-gray-200 px-2 py-1 text-center">Estado</th>
              <th className="border border-gray-200 px-2 py-1 text-center">Acción</th>
            </tr>
          </thead>
          <tbody>
            {filteredVisitas.map((visita, index) => (
              <tr key={index}>
                <td className="border border-gray-200 px-2 py-1 text-center">{visita.nombre}</td>
                <td className="border border-gray-200 px-2 py-1 text-center">{visita.fechaInicio}</td>
                <td className="border border-gray-200 px-2 py-1 text-center">{visita.hora}</td>
                <td className="border border-gray-200 px-2 py-1 text-center">{visita.fechaVencimiento}</td>
                <td className="border border-gray-200 px-2 py-1 text-center">{visita.estado}</td>
                <td className="border border-gray-200 px-2 py-1 text-center">
                  <button onClick={() => handleDelete(visita.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VisitHistoryTable;
