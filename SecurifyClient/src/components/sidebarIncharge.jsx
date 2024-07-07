import React from 'react';
import { NavLink } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import './aside.css';

const SidebarIncharge = () => {
  const btnLink = 'flex items-center px-7 py-4 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-tertiary dark:hover:text-gray-200 hover:text-gray-700';
  const activeLink = `${btnLink} bg-gray-100 dark:bg-tertiary text-primary`;


  const { logOut } = UserAuth();

  const cerrarSesión = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <aside className="sidebarIncharge">
      <div className='headsider'>
           <div className="flex items-center px-12">
              <span className="w-auto mx-3 font-medium text-primary">Security Tech</span>
           </div>
        </div>
      
      <hr className="my-6 border-gray-200 dark:primary" />

      <div className="flex flex-col justify-between flex-1">
        <nav className="-mx-3 space-y-20">
          <div className="space-y-2">
            <div className="flex items-center justify-center px-3 py-4 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-tertiary dark:hover:text-gray-200 hover:text-gray-700">
              <span className="mx-5 text-sm font-bold">Acceso Rápido</span>
            </div>

            <NavLink to="/permissionList" className={({ isActive }) => isActive ? activeLink : btnLink}>
              <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="8.5" cy="7" r="4" />
                <polyline points="17 11 19 13 23 9" />
              </svg>
              <span className="mx-2 text-sm font-medium">Lista de permisos</span>
            </NavLink>

            <NavLink to="/homeResidents" className={({ isActive }) => isActive ? activeLink : btnLink}>
              <svg className="h-6 w-6 text-primary" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" />
                <polyline points="5 12 3 12 12 3 21 12 19 12" />
                <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                <rect x="10" y="12" width="4" height="4" />
              </svg>
              <span className="mx-2 text-sm font-medium">Residentes del hogar</span>
            </NavLink>

            <NavLink to="/generateQr" className={({ isActive }) => isActive ? activeLink : btnLink}>
              <svg className="h-6 w-6 text-primary" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" />
                <path d="M9 12l2 2l4 -4" />
                <path d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3" />
              </svg>
              <span className="mx-2 text-sm font-medium">Generar QR</span>
            </NavLink>

            <NavLink to="/visitHistoryIncharge" className={({ isActive }) => isActive ? activeLink : btnLink}>
              <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              <span className="mx-2 text-sm font-medium">Historial de visitas</span>
            </NavLink>
          </div>

          <div className="space-y-3">
            <hr className="my-6 border-gray-200 dark:primary" />
            <div className="flex items-center px-9 py-4 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-tertiary dark:hover:text-gray-200 hover:text-gray-700">
              <svg className="h-5 w-5 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
                <line x1="12" y1="2" x2="12" y2="12" />
              </svg>
              <button onClick={cerrarSesión} className="mx-2 text-sm font-medium">Cerrar sesión</button>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default SidebarIncharge;

