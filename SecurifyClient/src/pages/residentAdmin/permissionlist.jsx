import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import axios from 'axios';
import { baseURL } from '../../config/apiConfig'; // Importa baseURL desde config
import './residenta.css';
import invitationImage from '../../assets/img/invitation.png'; // Importa la imagen

const PermissionList = ({ idHouse }) => {
  const [confirmationModalIsOpen, setConfirmationModalIsOpen] = useState(false);
  const [rejectionModalIsOpen, setRejectionModalIsOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [status, setStatus] = useState({}); // Estado para el mensaje de aceptación o rechazo
  const [requests, setRequests] = useState([]); // Estado para almacenar las solicitudes
  const navigate = useNavigate(); // Hook para la navegación

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(baseURL + 'permission/house?idHouse=' + idHouse, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    fetchRequests();
  }, [idHouse]);

  const handleAccept = (request) => {
    setSelectedRequest(request);
    setConfirmationModalIsOpen(true);
  };

  const handleReject = (request) => {
    setSelectedRequest(request);
    setRejectionModalIsOpen(true);
  };

  const handleConfirmAccept = () => {
    // Aquí puedes manejar la lógica de aceptación
    setStatus({ ...status, [selectedRequest.name]: 'Aprobado' });
    setConfirmationModalIsOpen(false);
    navigate('/qrgeneratora'); // Redirige a la página qrgeneratora
  };

  const handleConfirmReject = () => {
    // Aquí puedes manejar la lógica de rechazo
    setStatus({ ...status, [selectedRequest.name]: 'Rechazado' });
    setRejectionModalIsOpen(false);
  };

  const handleCloseModal = () => {
    setConfirmationModalIsOpen(false);
    setRejectionModalIsOpen(false);
  };

  return (
    <main className="content-container1">
      <aside className="sidebar" style={{ backgroundColor: 'white' }}>
        {/* Contenido del aside */}
      </aside>
      <img src={invitationImage} alt="Invitación" />
      <h1>Solicitud de permiso</h1>
      {requests.map((request, index) => (
        <div key={index} className="request">
          <div className="request-info">
            <p>{request.name}</p>
            <p>{request.time}</p>
          </div>
          <div className="status">{request.status}</div>
          {!status[request.name] && (
            <div className="actions">
              <button className="accept" onClick={() => handleAccept(request)}>Aceptar</button>
              <button className="reject" onClick={() => handleReject(request)}>Rechazar</button>
            </div>
          )}
        </div>
      ))}

      {/* Popup de confirmación de aceptación */}
      <Modal
        isOpen={confirmationModalIsOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Confirmación de Aceptación"
        className="custom-modal"
        overlayClassName="custom-overlay"
      >
        <div className="modal-content">
          <h2 className="modal-title">Confirmación de Aceptación</h2>
          <p className="modal-message">¿Estás seguro de que deseas aceptar la solicitud de {selectedRequest && selectedRequest.name}?</p>
          <div className="modal-buttons">
            <button onClick={handleConfirmAccept} className="modal-button">Aceptar</button>
            <button onClick={handleCloseModal} className="modal-button error">Cancelar</button>
          </div>
        </div>
      </Modal>

      {/* Popup de confirmación de rechazo */}
      <Modal
        isOpen={rejectionModalIsOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Confirmación de Rechazo"
        className="custom-modal"
        overlayClassName="custom-overlay"
      >
        <div className="modal-content">
          <h2 className="modal-title">Confirmación de Rechazo</h2>
          <p className="modal-message">¿Estás seguro de que deseas rechazar la solicitud de {selectedRequest && selectedRequest.name}?</p>
          <div className="modal-buttons">
            <button onClick={handleConfirmReject} className="modal-button">Rechazar</button>
            <button onClick={handleCloseModal} className="modal-button error">Cancelar</button>
          </div>
        </div>
      </Modal>
    </main>
  );
};

export default PermissionList;
