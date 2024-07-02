import React from 'react';
import SidebarAdministrator from '../../components/sidebarAdministrator';
import UserPanel  from './userPanel';
import Maintenance from './maintenance'; 
import SecurityTeam  from './securityTeam';
import VisitHistory  from './visitHistory';
import AnonymousHistory from './anonymousHistory';

const Admin = () => {
  console.log("Admin");
  return (
    <>
    <div className="main-containerpa text-sm">
    <aside className="sidebar" style={{ backgroundColor: 'white' }}>
        {/* Contenido del aside */}
      </aside>
      
     <h2 className="modal-title">¡Bienvenido a su aliado en la gestión residencial!</h2>
     </div>
      <SidebarAdministrator>
        <UserPanel />
        <Maintenance />  {/* Uso del componente */}
        <SecurityTeam />
        <VisitHistory />
        <AnonymousHistory/>
      </SidebarAdministrator>
    </>
  );
}

export default Admin;
