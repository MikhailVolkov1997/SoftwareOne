import React from 'react'
import Drawer from '@material-ui/core/Drawer'

import './Drawer.css'

export const TemporaryDrawer = ({
  open,
  closeDrawer,
  side = 'right',
  children
}) => {
  const toggleDrawer = (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    closeDrawer(false)
  }

  return (
    <div>
      <Drawer anchor={side} open={open} onClose={toggleDrawer}>
        {children}
      </Drawer>
    </div>
  )
}
