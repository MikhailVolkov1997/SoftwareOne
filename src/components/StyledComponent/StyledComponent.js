import React from 'react'
import { createStyles, CssBaseline, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      background:
        'linear-gradient(90deg, #ece6f9 21px, transparent 1%) center, linear-gradient(#ece6f9 21px, transparent 1%) center, #1e1c24',
      backgroundSize: '22px 22px'
    }
  })
)

export const StyledComponent = ({ children }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <CssBaseline />
      {children}
    </div>
  )
}
