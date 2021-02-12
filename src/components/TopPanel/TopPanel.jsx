import { Button } from '@material-ui/core'
import React from 'react'
import { Timerange } from '../Timerange/Timerange'

import './TopPanel.css'

export const TopPanel = () => {
  const openConfig = () => {}
  return (
    <div className="top-panel">
      <Timerange />
      <Button variant="contained" color="primary" onClick={openConfig}>
        Config
      </Button>
    </div>
  )
}
