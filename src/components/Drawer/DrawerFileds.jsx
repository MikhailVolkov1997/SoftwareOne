import React, { useEffect, useState } from 'react'
import { TextField, InputLabel, Typography, Button } from '@material-ui/core'
import { ColorPicker } from 'material-ui-color'

import './DrawerFields.css'

export const DrawerFields = ({ data, onChangeModel, closeDrawer }) => {
  const [state, setState] = useState({
    text: '',
    fill: '',
    stroke: ''
  })

  useEffect(() => {
    if (!data) return

    const { text, fill, stroke } = data

    setState({
      text,
      fill,
      stroke
    })
  }, [])

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

  const handleChangeModel = () => {
    onChangeModel({ ...data, ...state })

    closeDrawer(false)
  }

  return (
    <div className="drawer-fields">
      <Typography variant="h3" component="h2">
        {data.text}
      </Typography>
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
      <Button variant="contained" color="primary" onClick={handleChangeModel}>
        Save
      </Button>
    </div>
  )
}
