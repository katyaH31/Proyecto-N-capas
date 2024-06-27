import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { Home } from "../pages/home";
import { Login } from "../pages/login";
import { Perfil } from "../pages/perfil";
import { ProtectorRuta } from "../components/ProtectorRuta";
import SidebarAdministrator from "../components/sidebarAdministrator";
import Maintenance from "../pages/Administrator/maintenance";
import VisitHistory from "../pages/Administrator/visitHistory";
import UserPanel from "../pages/Administrator/userPanel";
import SecurityTeam from "../pages/Administrator/securityTeam";
import Admin from "../pages/Administrator/admin";
import PermissionList from "../pages/residentAdmin/permissionlist";
import SidebarResidentAdmin from "../components/sidebarResidentAdmin";
import SidebarVigilant from "../components/sidebarVigilant";
import Scan from "../pages/vigilant/scan";
import Homevigilant from "../pages/vigilant/homevigilant";
import AnonymousVisit from "../pages/vigilant/anonymousVisit";
import AnonymousHistory from "../pages/Administrator/anonymousHistory";
import QRGeneratora from "../pages/residentAdmin/qrgeneratora";
import VisitHistoryTable from "../pages/residentAdmin/visithistoryhome";
import QRGeneratorr from "../pages/resident/qrgeneratorr";
import Permits from "../pages/resident/visitingpermits";
import ResidentAdmin from "../pages/residentAdmin/residentadmin";
import Resident from "../pages/resident/resident";
import HomeResidents from "../pages/residentAdmin/homeresidents";
import SidebarResident from "../components/sidebarResident";
import QRGenerator from "../pages/visitor/qrgenerator";
import Invitation from "../pages/visitor/invitation";
import SidebarVisit from "../components/sidebarVisit";
 
const RequiereAuth = ({ children }) => {
  const { user } = UserAuth();
  return user ? children : <Navigate to="/login" />;
};


const Layout = ({ children }) => {
  const { role } = UserAuth();

  return (
    <div className="app-container">
      {role === 'Admin' && <SidebarAdministrator/>}
      {role === 'Manager' && <SidebarResidentAdmin/>}
      {role === 'Resident' && <SidebarResident/>}
      {role === 'Guard' && <SidebarVigilant/>}
      {role === 'Visitor' && <SidebarVisit/>}
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export function MyRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<RequiereAuth><Layout><Home /></Layout></RequiereAuth>} />
        <Route path="/perfil" element={<ProtectorRuta><Layout><Perfil /></Layout></ProtectorRuta>} />
        {/* admi rol */}
        <Route path="/admin" element={<RequiereAuth><Layout><Admin /></Layout></RequiereAuth>} />
        <Route path="/maintenance" element={<RequiereAuth><Layout><Maintenance /></Layout></RequiereAuth>} />
        <Route path="/securityTeam" element={<RequiereAuth><Layout><SecurityTeam /></Layout></RequiereAuth>} />
        <Route path="/userPanel" element={<RequiereAuth><Layout><UserPanel /></Layout></RequiereAuth>} />
        <Route path="/visitHistory" element={<RequiereAuth><Layout><VisitHistory /></Layout></RequiereAuth>} />
        {/*Resident admin*/ }
        <Route path="/residentadmin" element={<RequiereAuth><Layout>< ResidentAdmin/></Layout></RequiereAuth>} />
        <Route path="/qrgeneratora" element={<RequiereAuth><Layout><QRGeneratora /></Layout></RequiereAuth>} />
        <Route path="/homeresidents" element={<RequiereAuth><Layout><HomeResidents /></Layout></RequiereAuth>} />
        <Route path="/permissionlist" element={<RequiereAuth><Layout><PermissionList /></Layout></RequiereAuth>} />
        <Route path="/visithistory" element={<RequiereAuth><Layout>< VisitHistoryTable/></Layout></RequiereAuth>} />
        {/*Resident */}
        <Route path="/resident" element={<RequiereAuth><Layout>< Resident/></Layout></RequiereAuth>} />
        <Route path="/qrgenerator" element={<RequiereAuth><Layout>< QRGeneratorr/></Layout></RequiereAuth>} />
        <Route path="/visitingpermits" element={<RequiereAuth><Layout><Permits/></Layout></RequiereAuth>} />
        {/*Visitor */}
        <Route path="/qrgenerator" element={<RequiereAuth><Layout><QRGenerator/></Layout></RequiereAuth>} />
        <Route path="/invitation" element={<RequiereAuth><Layout><Invitation/></Layout></RequiereAuth>} />
        {/* vigilant rol */}
        <Route path="/scan" element={<RequiereAuth><Layout><Scan /></Layout></RequiereAuth>}/>
        <Route path="/homeVigilant" element={<RequiereAuth><Layout><Homevigilant /></Layout></RequiereAuth>}/>
        <Route path="/anonymousVisit" element={<RequiereAuth><Layout><AnonymousVisit /></Layout></RequiereAuth>}/>
        <Route path="/anonymousHistory" element={<RequiereAuth><Layout><AnonymousHistory /></Layout></RequiereAuth>} />
       
      </Routes>
    </BrowserRouter>
  );
}
