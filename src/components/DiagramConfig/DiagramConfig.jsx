import React, { useState } from 'react'
import AddIcon from '@material-ui/icons/Add'
import { Button, Fab, Tooltip, Typography } from '@material-ui/core'

import './DiagramConfig.css'

import TemporaryDrawer from '../Drawer'
import { NewConfigFields } from './NewConfigFields'
import { findIndex, isEmpty } from 'lodash'

export const DiagramConfig = () => {
  const [openDrawer, setOpenDrawer] = useState(false)
  const [newProperties, addNewProperties] = useState([])

  const onOpenDrawer = () => {
    setOpenDrawer(true)
  }

  const onCloseDrawer = () => {
    setOpenDrawer(false)
  }

  const handleChange = (key) => (event) => {
    const { name, value } = event.target
    const state = [...newProperties]

    const idx = findIndex(state, ['key', key])

    if (idx === -1) return

    state[idx] = { ...state[idx], [name]: value }
    addNewProperties(state)
  }

  const onAddProps = () => {
    const state = [...newProperties]
    state.push({ name: '', value: '', key: state.length + 1 })

    addNewProperties(state)
  }

  const onSaveProperties = () => {}

  return (
    <div className="diagram-config">
      <Button variant="contained" color="primary" onClick={onOpenDrawer}>
        Config
      </Button>
      <TemporaryDrawer
        side={'left'}
        open={openDrawer}
        closeDrawer={onCloseDrawer}
        className="drawer"
      >
        <div className="drawer-content">
          <Typography variant="h3" component="h2">
            Configs
          </Typography>
          <div className="add-new">
            <Typography variant="h6" component="h2">
              Add new property
            </Typography>
            <Tooltip title="Add" aria-label="add">
              <Fab color="primary">
                <AddIcon onClick={onAddProps} />
              </Fab>
            </Tooltip>
          </div>
          {newProperties.map(({ name, value, key }) => (
            <NewConfigFields
              key={key}
              name={name}
              value={value}
              handleChange={handleChange(key)}
            />
          ))}
          {!isEmpty(newProperties) && (
            <Button
              variant="contained"
              color="primary"
              onClick={onSaveProperties}
            >
              Save
            </Button>
          )}
        </div>
      </TemporaryDrawer>
    </div>
  )
}
