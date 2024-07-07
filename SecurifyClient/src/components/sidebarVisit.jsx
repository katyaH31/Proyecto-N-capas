import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './aside.css';
import { UserAuth } from '../context/AuthContext';

const SidebarVisitor = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const { logOut } = UserAuth();
    
    const cerrarSesion = async () => {
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
            <button className="sidebar-toggle" onClick={toggleSidebar}>
                ☰
            </button>
            <aside className={`sidebarResidenta ${isSidebarOpen ? 'active' : ''}`}>
                <a href="#">
                    <div className="flex items-center px-12">
                        <img src="/components/icons/logo.png" alt="" />
                        <span className="w-auto mx-3 font-medium text-primary">Security Tech</span>
                    </div>
                </a>

                <hr className="my-6 border-gray-200 dark:primary" />
                <div className="flex flex-col justify-between flex-1">
                    <span className="mx-5 text-sm font-bold text-primary flex items-center justify-center">Acceso Rápido</span>
                    <nav className="-mx-3 space-y-20">
                        <div className="space-y-2">
                           

                            <NavLink to="/invitation" className={({isActive}) => isActive ? activeLink : btnLink}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z" />
                                </svg>
                                <span className="mx-2 text-sm font-medium text-primary">Mis invitaciones</span>
                            </NavLink>
                        </div>

                        <div className="space-y text-sm font-medium">
                            <hr className="border-gray-200 dark:primary " />
                           

                            <div className="flex items-center px-9 py-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-tertiary dark:hover:text-gray-200 hover:text-gray-700">
                                <svg className="h-5 w-5 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
                                    <line x1="12" y1="2" x2="12" y2="12" />
                                </svg>
                                <button onClick={cerrarSesion} className="mx-7 text-sm font-medium">Cerrar sesión</button>
                            </div>
                        </div>
                    </nav>
                </div>
            </aside>
        </div>
    );
};

export default SidebarVisitor;

