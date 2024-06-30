import React, { useContext, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import SidebarVigilant from '../../components/sidebarVigilant';
import { Link, useNavigate } from 'react-router-dom';
import { DataContext } from "../../context/DataContext";
import './vigilant.css';

Modal.setAppElement('#root'); // Asegúrate de que el root coincide con el id del div principal en tu index.html

const AnonymousVisit = () => {
  const { setAnonymousData } = useContext(DataContext);
  const [formValues, setFormValues] = useState({ name: '', descripcion: '' });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(true);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleGenerate = async () => {
    if (!formValues.name || !formValues.descripcion) {
      setIsSuccess(false);
      setModalMessage('Por favor, complete todos los campos.');
      setModalIsOpen(true);
      return;
    }

    try {
      const data = {
        name: formValues.name,
        description: formValues.descripcion
      };
      const response = await axios.post('http://localhost:8080/api/visits/anonymous', data, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      setIsSuccess(true);
      setModalMessage(response.data.message || 'La solicitud ha sido generada con éxito.');
      setModalIsOpen(true);
      setAnonymousData((prevData) => [...prevData, formValues]);
      setTimeout(() => navigate('/AnonymousHistory'), 2000); // Redirige después de 2 segundos
    } catch (error) {
      setIsSuccess(false);
      setModalMessage(error.response ? error.response.data.message : 'Ocurrió un error al añadir la entrada');
      setModalIsOpen(true);
      console.log(error);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
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
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Mensaje del formulario"
          className="custom-modal"
          overlayClassName="custom-overlay"
        >
          <div className="modal-content">
            <div className={`modal-icon ${isSuccess ? 'success' : 'error'}`}>
              <span>{isSuccess ? '✓' : 'X'}</span>
            </div>
            <h2 className="modal-title">{isSuccess ? 'Éxito' : '¡Error!'}</h2>
            <p className="modal-message">{modalMessage}</p>
            <button 
              onClick={closeModal} 
              className={`modal-button ${isSuccess ? '' : 'error'}`}
            >
              Continuar
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default AnonymousVisit;
