import React from 'react'
import SidebarResident from '../../components/sidebarResident'
import QRGeneratorr from './qrgeneratorr'
import Permits from './visitingpermits'

const Resident = () => {
    return (
      <>
        <SidebarResident>
          <QRGeneratorr></QRGeneratorr>
          <Permits></Permits>
        </SidebarResident>
      </>
    )
  }
  
  export default Resident;