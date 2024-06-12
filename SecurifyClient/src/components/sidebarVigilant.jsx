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
            
            <div className="text-sm font-medium flex items-center px-9 py-4 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-tertiary dark:hover:text-gray-200 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className={btnLink}>Configuración</span>
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

