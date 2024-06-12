import React, { useContext, useState } from 'react';
import SidebarVigilant from '../../components/sidebarVigilant';
import { Link, useNavigate } from 'react-router-dom';
import { DataContext } from "../../context/DataContext";
import './vigilant.css';

const AnonymousVisit = () => {
  const { setAnonymousData } = useContext(DataContext);
  const [formValues, setFormValues] = useState({ name: '', descripcion: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleGenerate = () => {
    if (!formValues.name || !formValues.descripcion) {
      setErrorMessage('Por favor, complete todos los campos.');
      return;
    }
    setAnonymousData((prevData) => [...prevData, formValues]);
    navigate('/AnonymousHistory');
  };

  const handleCloseError = () => {
    setErrorMessage('');
  };

  return (
    <>
      <SidebarVigilant />
      <div className="main-containerAno text-sm">
        <aside className="sidebarAno"></aside>
        <div className="table-containerAno">
          <div className="table-containerinfo">
            <div className="visitdata">Datos para la visita anónima</div>
            <div className="form-container">
              <input
                type="text"
                name="name"
                className="form-inputav"
                placeholder="Nombre"
                value={formValues.name}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="descripcion"
                className="form-inputde"
                placeholder="Descripción"
                value={formValues.descripcion}
                onChange={handleInputChange}
              />
            </div>
            <div className="btn-containerge">
              <button onClick={handleGenerate} className="btnAno">
                <span>Generar</span>
              </button>
            </div>
          </div>
          <div className="btn-containerAno">
            <Link to="/homevigilant" className="btnAno">
              <span>Regresar</span>
            </Link>
          </div>
        </div>
        {errorMessage && (
          <div className="error-popup">
            <div className="error-popup-content">
              <p>{errorMessage}</p>
              <button onClick={handleCloseError}>Cerrar</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AnonymousVisit;


