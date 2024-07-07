import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleNavigate = React.useCallback(() => {
    navigate('/'); // Cambia 'a page base'
  }, [navigate]);

  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-secondary text-3xl sm:text-5xl">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Página no encontrada</h1>
        <p className="mt-6 text-base leading-7 text-gray-600">Lo sentimos, no pudimos encontrar la página que estabas buscando.</p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button
            onClick={handleNavigate}
            className="rounded-md bg-secondary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-tertiary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Volver a la página anterior
          </button>
        </div>
      </div>
    </main>
  );
};

export default ErrorPage;
