import React, { useEffect, useState } from 'react'
import AddIcon from '@material-ui/icons/Add'
import { Button, Fab, Tooltip, Typography } from '@material-ui/core'

import './DiagramConfig.css'

import TemporaryDrawer from '../Drawer'
import { NewConfigFields } from './NewConfigFields'
import { findIndex, head, isEmpty, isNull } from 'lodash'
import { createProperties } from '../../utils/createProperties'

export const DiagramConfig = ({ onSaveChanges, diagramData }) => {
  const [openDrawer, setOpenDrawer] = useState(false)
  const [newProperties, addNewProperties] = useState([])

  useEffect(() => {
    openDrawer && stateInit(head(diagramData).properties)
  }, [openDrawer])

  const stateInit = (currentProps) => {
    if (isEmpty(currentProps)) return

    const existingValues = currentProps.map((item) => {
      // get current object props
      const propArr = Object.entries(item)
      const [name, value] = head(propArr)

      return {
        name,
        value,
        key: Date.now()
      }
    })

    addNewProperties(existingValues)
  }

  const onOpenDrawer = () => {
    setOpenDrawer(true)
  }

  const onCloseDrawer = () => {
    setOpenDrawer(false)
  }

  const handleChange = (key) => (event) => {
    const { name, value } = event.target
    const state = [...newProperties]
    const idx = findIndexByKey(state, key)

    if (isNull(idx)) return

    state[idx] = { ...state[idx], [name]: value }

    addNewProperties(state)
  }

  const onAddProps = () => {
    const state = [...newProperties]
    state.push({ name: '', value: '', key: Date.now() })

    addNewProperties(state)
  }

  const onRemoveProperty = (key) => () => {
    const state = [...newProperties]
    const idx = findIndexByKey(state, key)

    if (isNull(idx)) return

    state.splice(idx, 1)

    addNewProperties(state)
  }

  const onSave = () => {
    const properties = createProperties(newProperties)
    const updatedData = diagramData.map((item) => ({ ...item, properties }))

    onSaveChanges(updatedData, onCloseDrawer)
  }

  const findIndexByKey = (options, key) => {
    const idx = findIndex(options, ['key', key])
    const NOT_FOUND = -1

    if (idx === NOT_FOUND) return null

    return idx
  }

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
              <Fab color="primary" onClick={onAddProps}>
                <AddIcon />
              </Fab>
            </Tooltip>
          </div>
          {!isEmpty(newProperties) &&
            newProperties.map(({ name, value, key }) => (
              <NewConfigFields
                key={key}
                name={name}
                value={value}
                handleChange={handleChange(key)}
                onRemoveProperty={onRemoveProperty(key)}
              />
            ))}
          <Button variant="contained" color="primary" onClick={onSave}>
            Save
          </Button>
        </div>
      </TemporaryDrawer>
    </div>
  )
}
