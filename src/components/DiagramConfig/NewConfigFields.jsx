import React from 'react'
import { Fab, TextField, Tooltip } from '@material-ui/core'
import RemoveIcon from '@material-ui/icons/Remove'

import './NewConfigFields.css'

export const NewConfigFields = ({
  name,
  value,
  handleChange,
  onRemoveProperty
}) => {
  return (
    <div className="new-config-fields">
      <TextField
        id="outlined-multiline-flexible"
        label="Name"
        multiline
        name="name"
        rowsMax={4}
        value={name}
        onChange={handleChange}
        variant="outlined"
      />
      <TextField
        id="outlined-multiline-flexible"
        label="Value"
        multiline
        name="value"
        rowsMax={4}
        value={value}
        onChange={handleChange}
        variant="outlined"
      />
      <Tooltip title="Add" aria-label="add">
        <Fab color="primary" onClick={onRemoveProperty}>
          <RemoveIcon />
        </Fab>
      </Tooltip>
    </div>
  )
}
