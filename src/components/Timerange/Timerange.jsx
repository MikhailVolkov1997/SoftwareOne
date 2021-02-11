import React, { useState } from 'react'
import { Button, TextField } from '@material-ui/core'

import { Autocomplete } from '@material-ui/lab'
import periodOptions from './period.options'

import './Timerange.css'
import { calculateDate } from '../../utils/calculateDate'
import { toNumber } from 'lodash'

export const Timerange = () => {
  const [ago, setAgo] = useState(0)
  const [period, setPeriod] = useState('')

  const changeAgo = (event) => {
    const { value } = event.target

    setAgo(toNumber(value))
  }

  const onChangePeriod = (event, value) => {
    const { key } = value

    setPeriod(key)
  }

  const onCalculateDate = () => {
    console.log(calculateDate(period, ago))
  }

  return (
    <div className="time-range">
      <div className="number-ago">
        <TextField
          id="outlined-number"
          label="Number"
          type="number"
          value={ago}
          onChange={changeAgo}
          InputLabelProps={{
            shrink: true
          }}
          variant="outlined"
        />
      </div>
      <div className="period">
        <Autocomplete
          id="combo-box-demo"
          options={periodOptions}
          getOptionLabel={(option) => option.title}
          onChange={onChangePeriod}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Combo box" variant="outlined" />
          )}
        />
      </div>
      <div className="period">
        <Button variant="contained" color="primary" onClick={onCalculateDate}>
          Calculate
        </Button>
      </div>
    </div>
  )
}
