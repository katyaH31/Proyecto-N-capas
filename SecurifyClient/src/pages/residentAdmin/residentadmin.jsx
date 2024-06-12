import React, { useState } from 'react';
import SidebarResidentAdmin from '../../components/sidebarResidentAdmin';
import QRGeneratora from './qrgeneratora';
import HomeResidents from './homeresidents';
import VisitHistoryTable from './visithistoryhome';
import PermissionList from './permissionlist';
import './residenta.css';

const ResidentAdmin = () => {
  // Define el estado inicial de las visitas aquí
  const [visitas, setVisitas] = useState([
    {
      nombre: 'Juan Pérez',
      fechaInicio: '05/15/2024',
      hora: '10:30 AM',
      fechaVencimiento: '05/20/2024',
      estado: 'Aprobado',
      id: 1
    },
    {
      nombre: 'María García',
      fechaInicio: '05/20/2024',
      hora: '02:45 PM',
      fechaVencimiento: '05/25/2024',
      estado: 'Denegado',
      id: 2
    }
    // Puedes agregar más objetos de visita según sea necesario
  ]);

  return (
    <>
      <SidebarResidentAdmin>
        <QRGeneratora />
        <HomeResidents />
        <PermissionList />
        {/* Pasa las visitas y la función para establecer visitas como props */}
        <VisitHistoryTable visitas={visitas} setVisitas={setVisitas} />
      </SidebarResidentAdmin>
    </>
  );
};

export default ResidentAdmin;
