import React from 'react'
import { DiagramConfig } from '../DiagramConfig/DiagramConfig'
import { Timerange } from '../Timerange/Timerange'

import './TopPanel.css'

export const TopPanel = ({ onSaveChanges, diagramData }) => {
  return (
    <div className="top-panel">
      <Timerange />
      <DiagramConfig onSaveChanges={onSaveChanges} diagramData={diagramData} />
    </div>
  )
}
