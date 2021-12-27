import { Grid, TextField } from '@mui/material'
import React from 'react'
import { DebounceInput } from 'react-debounce-input'

const NumberRangeFilter = ({
  minValue,
  maxValue,
  setMinValue,
  setMaxValue,
  label,
}) => {
  return (
    <Grid item container direction='column' spacing={1}>
      <Grid item>
        <DebounceInput
          element={TextField}
          id={`min-${label}-filter`}
          label={`min ${label}`}
          value={minValue}
          onChange={({ target: { value } }) => setMinValue(value)}
          debounceTimeout={400}
          sx={{
            width: 75,
          }}
        />
      </Grid>
      <Grid item>
        <DebounceInput
          element={TextField}
          id={`max-${label}-filter`}
          label={`max ${label}`}
          value={maxValue}
          onChange={({ target: { value } }) => setMaxValue(value)}
          debounceTimeout={400}
          sx={{
            width: 75,
          }}
        />
      </Grid>
    </Grid>
  )
}

export default NumberRangeFilter
