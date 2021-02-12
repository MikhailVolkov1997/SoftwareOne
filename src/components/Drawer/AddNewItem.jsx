import React, { useState } from 'react'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { TextField, InputLabel, Button } from '@material-ui/core'
import { ColorPicker } from 'material-ui-color'

import './AddNewItem.css'

export const AddNewItem = ({ closeDrawer, data, addNewItem }) => {
  const [state, setState] = useState({
    text: '',
    fill: '',
    stroke: ''
  })

  const handleChange = (event) => {
    const { name, value } = event.target

    setState({ ...state, [name]: value })
  }

  const onChangeColor = (name) => (color) => {
    const {
      css: { backgroundColor }
    } = color

    setState({ ...state, [name]: backgroundColor })
  }

  const addItem = () => {
    const newItem = {
      ...state,
      parent: data.key
    }

    addNewItem(newItem)
    closeDrawer()
  }

  return (
    <Accordion className="add-item">
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Add new child</Typography>
      </AccordionSummary>
      <AccordionDetails className="item-details">
        <TextField
          id="outlined-multiline-flexible"
          label="Text"
          multiline
          name="text"
          rowsMax={4}
          value={state.text}
          onChange={handleChange}
          variant="outlined"
        />
        <div>
          <InputLabel shrink htmlFor="bootstrap-input">
            Fill
          </InputLabel>
          <ColorPicker
            defaultValue="transparent"
            onChange={onChangeColor('fill')}
            value={state.fill}
            name="fill"
          />
        </div>
        <div>
          <InputLabel shrink htmlFor="bootstrap-input">
            Stroke
          </InputLabel>
          <ColorPicker
            defaultValue="transparent"
            value={state.stroke}
            onChange={onChangeColor('stroke')}
            name="stroke"
          />
        </div>
        <Button variant="contained" color="primary" onClick={addItem}>
          Add new
        </Button>
      </AccordionDetails>
    </Accordion>
  )
}
