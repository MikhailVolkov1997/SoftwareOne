import React from 'react'
import { DiagramConfig } from '../DiagramConfig/DiagramConfig'
import { Timerange } from '../Timerange/Timerange'

import './TopPanel.css'

export const TopPanel = () => {
  return (
    <div className="top-panel">
      <Timerange />
      <DiagramConfig />
    </div>
  )
}
