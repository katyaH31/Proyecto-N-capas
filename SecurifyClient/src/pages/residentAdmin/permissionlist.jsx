import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import axios from 'axios';
import { baseURL } from '../../config/apiConfig'; // Importa baseURL desde config 
import invitationImage from '../../assets/img/invitation.png'; // Importa la imagen

Modal.setAppElement('#root'); // Configurar el elemento raíz

const statusTranslations = {
  APPROVED: 'Aprobado',
  PENDING: 'Pendiente',
  DENIED: 'Denegado',
  USED: 'Usado'
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

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
        const response = await axios.get(baseURL + 'permission/house', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        const dataWithTranslations = response.data.data.map((item) => ({
          ...item,
          status: statusTranslations[item.status] || item.status,
          requestedDated: formatDate(item.requestedDated),
          makeDate: formatDate(item.makeDate)
        }));
        setRequests(dataWithTranslations);
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

  const handleConfirmAccept = async () => {
    try {
      await axios.put( baseURL+  `permission/changeStatus?idPermission=${selectedRequest.id}`, {
        state: 'APPROVED'
      }, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });

      setStatus({ ...status, [selectedRequest.description]: 'Aprobado' });
      setRequests((prevRequests) => 
        prevRequests.map((req) =>
          req.id === selectedRequest.id ? { ...req, status: 'Aprobado' } : req
        )
      );
      setConfirmationModalIsOpen(false);
      navigate('/qrgeneratora'); // Redirige a la página qrgeneratora
    } catch (error) {
      console.error('Error approving request:', error);
    }
  };

  const handleConfirmReject = async () => {
    try {
      await axios.put( baseURL + `permission/changeStatus?idPermission=${selectedRequest.id}`, {
        state: 'DENIED'
      }, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });

      setStatus({ ...status, [selectedRequest.description]: 'Rechazado' });
      setRequests((prevRequests) => 
        prevRequests.map((req) =>
          req.id === selectedRequest.id ? { ...req, status: 'Rechazado' } : req
        )
      );
      setRejectionModalIsOpen(false);
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };

  const handleCloseModal = () => {
    setConfirmationModalIsOpen(false);
    setRejectionModalIsOpen(false);
  };

  return (
    <main className="permission-list-container">
      <aside className="sidebar-permission" style={{ backgroundColor: 'white' }}>
        {/* Contenido del aside */}
      </aside>
      <div id='permission-container'>
        <img src={invitationImage} alt="Invitación" />
        <h1>Solicitud de permiso</h1>
        <div className="table-containervisit">
          <div className="custom-table-wrappervisit">
            <table className="custom-tablevisit">
              <thead>
                <tr>
                  <th>Descripción</th>
                  <th>Fecha a realizar la visita</th>
                  <th>Fecha de petición</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request, index) => (
                  <tr key={index}>
                    <td data-label="Descripción">{request.description}</td>
                    <td data-label="Fecha a realizar la visita">{request.requestedDated}</td>
                    <td data-label="Fecha de petición">{request.makeDate}</td>
                    <td data-label="Estado">{request.status}</td>
                    <td data-label="Acciones">
                      <div className="actions-permission">
                        <button
                          className="accept-permission"
                          onClick={() => handleAccept(request)}
                          disabled={['Aprobado', 'Usado', 'Denegado'].includes(request.status)}
                        >
                          Aceptar
                        </button>
                        <button
                          className="reject-permission"
                          onClick={() => handleReject(request)}
                          disabled={['Aprobado', 'Usado', 'Denegado'].includes(request.status)}
                        >
                          Rechazar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Popup de confirmación de aceptación */}
      <Modal
        isOpen={confirmationModalIsOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Confirmación de Aceptación"
        className="custom-modal-permission"
        overlayClassName="custom-overlay-permission"
      >
        <div className="modal-content-permission">
          <h2 className="modal-title-permission">Confirmación de Aceptación</h2>
          <p className="modal-message-permission">¿Estás seguro de que deseas aceptar la solicitud de {selectedRequest && selectedRequest.description}?</p>
          <div className="modal-buttons-permission">
            <button onClick={handleConfirmAccept} className="modal-button-permission">Aceptar</button>
            <button onClick={handleCloseModal} className="modal-button-error-permission">Cancelar</button>
          </div>
        </div>
      </Modal>

      {/* Popup de confirmación de rechazo */}
      <Modal
        isOpen={rejectionModalIsOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Confirmación de Rechazo"
        className="custom-modal-permission"
        overlayClassName="custom-overlay-permission"
      >
        <div className="modal-content-permission">
          <h2 className="modal-title-permission">Confirmación de Rechazo</h2>
          <p className="modal-message-permission">¿Estás seguro de que deseas rechazar la solicitud de {selectedRequest && selectedRequest.description}?</p>
          <div className="modal-buttons-permission">
            <button onClick={handleConfirmReject} className="modal-button-permission">Rechazar</button>
            <button onClick={handleCloseModal} className="modal-button-error-permission">Cancelar</button>
          </div>
        </div>
      </Modal>
    </main>
  );
};

export default PermissionList;
