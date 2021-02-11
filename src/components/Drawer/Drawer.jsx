import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'
import { DrawerFields } from './DrawerFileds'

export const TemporaryDrawer = ({ open, closeDrawer, data, onChangeModel }) => {
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
        <DrawerFields
          data={data}
          onChangeModel={onChangeModel}
          closeDrawer={closeDrawer}
        />
        <Divider />
      </Drawer>
    </div>
  )
}
