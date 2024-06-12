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
