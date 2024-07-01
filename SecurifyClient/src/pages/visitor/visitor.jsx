import React from 'react'
import SidebarVisit from '../../components/sidebarVisit'
import QRGenerator from "./qrgenerator.jsx";
import Invitation from './invitation'

const Visitor = () => {
    return (
      <>
        <SidebarVisit>
          <QRGenerator></QRGenerator>
        </SidebarVisit>
      </>
    )
  }
  
  export default Visitor;