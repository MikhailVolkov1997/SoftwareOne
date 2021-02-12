import React from 'react'
import Drawer from '@material-ui/core/Drawer'

export const TemporaryDrawer = ({ open, closeDrawer, children }) => {
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
      <Drawer anchor={'right'} open={open} onClose={toggleDrawer}>
        {children}
      </Drawer>
    </div>
  )
}
