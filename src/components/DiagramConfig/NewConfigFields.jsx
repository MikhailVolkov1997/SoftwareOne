import React from 'react'
import { TextField } from '@material-ui/core'

import './NewConfigFields.css'

export const NewConfigFields = ({ name, value, handleChange }) => {
  return (
    <div>
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
    </div>
  )
}
