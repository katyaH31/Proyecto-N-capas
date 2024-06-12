import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserPanel from '../pages/Administrator/userPanel';
import VisitHistory from '../pages/Administrator/visitHistory';
import SecurityTeam from '../pages/Administrator/securityTeam';
import Maintenance from '../pages/Administrator/maintenance';

const MainContent = () => {
    return (
        <div className="main-content">
            <Routes>
                <Route path="/userPanel" element={<UserPanel />} />
                <Route path="/visitHistory" element={<VisitHistory />} />
                <Route path="/securityTeam" element={<SecurityTeam />} />
                <Route path="/maintenance" element={<Maintenance />} />
            </Routes>
        </div>
    );
};

export default MainContent;
