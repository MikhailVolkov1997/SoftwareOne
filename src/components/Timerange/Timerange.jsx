import React, { useState } from 'react'
import { toNumber } from 'lodash'
import { Button, TextField } from '@material-ui/core'

import './Timerange.css'

import { Autocomplete } from '@material-ui/lab'
import periodOptions from './period.options'
import { calculateDate } from '../../utils/calculateDate'

export const Timerange = () => {
  const [ago, setAgo] = useState('')
  const [period, setPeriod] = useState('')

  const changeAgo = (event) => {
    const { value } = event.target

    const droppedZero = value.replace(/^0+/, '')

    setAgo(droppedZero)
  }

  const onChangePeriod = (event, value) => {
    if (!value) return setPeriod('')

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
          type="number"
          value={ago}
          onChange={changeAgo}
          placeholder="Number"
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
            <TextField
              {...params}
              placeholder="Select a Period"
              variant="outlined"
            />
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
