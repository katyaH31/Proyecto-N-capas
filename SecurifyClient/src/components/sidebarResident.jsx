import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import QRGeneratorr from '../pages/resident/qrgeneratorr';
import Permits from '../pages/resident/visitingpermits';
import './aside.css';
import { UserAuth } from '../context/AuthContext';

const SidebarResident = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    
    const { logOut } = UserAuth()
    const cerrarSesión = async () => {
        try {
          await logOut();
        } catch (error) {
          console.log(error);
        }
      };
    

    const btnLink = 'flex items-center px-7 py-4 text-primary-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-tertiary dark:hover:bg-tertiary dark:hover:text-gray-200 hover:text-primary-700';
    const activeLink = `${btnLink} bg-tertiary dark:bg-tertiary`;

    return (
        <div>
            <button className="sidebar-togglere" onClick={toggleSidebar}>
                ☰
            </button>
            <aside className={`sidebarResident ${isSidebarOpen ? 'active' : ''}`}>
                <div className="flex items-center px-12 space-y-4">
                    <img src="/components/icons/logo.png" alt="" />
                    <span className="w-auto mx-3 font-medium text-primary">Security Tech</span>
                </div>

                <hr className="my-6 border-gray-200 dark:primary" />
                <div className="flex flex-col justify-between flex-1">
                    <span className="mx-5 mb-4 text-sm font-bold text-primary flex items-center justify-center">Acceso Rápido</span>
                    <nav className="-mx-3 space-y-2">
                        <div className="space-y-2">   
                            <NavLink to="/qrgenerator" className={({isActive}) => isActive ? activeLink : btnLink}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z" />
                                </svg>
                                <span className="mx-2 text-sm font-medium text-primary">Generar QR</span>
                            </NavLink>  

                            <NavLink to="/visitingpermits" className={({isActive}) => isActive ? activeLink : btnLink}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                                </svg>
                                <span className="mx-2 text-sm font-medium text-primary">Permisos para visitas</span>
                            </NavLink>
                        </div>

                        <div className="space-y text-sm font-medium">
            <hr className="border-gray-200 dark:primary " />
            <div className="flex items-center px-9 py-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-tertiary dark:hover:text-gray-200 hover:text-gray-700">
              <svg className="h-5 w-5 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
                <line x1="12" y1="2" x2="12" y2="12" />
              </svg>
              <button onClick={cerrarSesión} className="mx-7 text-sm font-medium">Cerrar sesión</button>
            </div>
          </div>
                    </nav> 
                </div>
            </aside>

            <main className={`main-content ${isSidebarOpen ? 'shifted' : ''}`}>
                {/* Aquí va el contenido principal */}
            </main>
        </div>
    );
};

export default SidebarResident;
