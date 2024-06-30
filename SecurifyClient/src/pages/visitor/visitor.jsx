import React from 'react'
import SidebarVisit from '../../components/sidebarVisit'
import QRgenerator from '../visitor/qrgenerator'
import Invitation from './invitation'

const Visitor = () => {
    return (
      <>
        <SidebarVisit>
          <QRgenerator></QRgenerator>
          
        </SidebarVisit>
      </>
    )
  }
  
  export default Visitor;