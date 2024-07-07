import React from 'react';
import { NavLink } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import './aside.css';

const SidebarVigilant = () => {
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
    <aside className="sidebarVigilant">
        <div className='headsider'>
           <div className="flex items-center px-12">
              <span className="w-auto mx-3 font-medium text-primary">Security Tech</span>
           </div>
        </div>
      <hr className="my-6 border-gray-200 dark:primary" />

      <div className="flex flex-col justify-between flex-1">
        <nav className="-mx-3 space-y-20">
          <div className="space-y-2">
            <div className="flex items-center justify-center px-3 py-4 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 ">
              <span className="mx-5 text-sm font-bold">Acceso Rápido</span>
            </div>

          </div>

         
          <div className="space-y-3 ">

          <div className=" my-7 flex items-center px-9 py-20 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 ">
            </div>

            <div className="flex items-center px-9 py-4 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-tertiary dark:hover:text-gray-200 hover:text-gray-700">
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
  );
};

export default SidebarVigilant;

