import { Grid, TextField } from '@mui/material'
import React from 'react'
import { DebounceInput } from 'react-debounce-input'
import NumberRangeFilter from '../utils/NumberRangeFilter'

const RecordFilters = ({
  searchFilter,
  setSearchFilter,
  minAFilter,
  maxAFilter,
  setMinAFilter,
  setMaxAFilter,
  minBFilter,
  maxBFilter,
  setMinBFilter,
  setMaxBFilter,
  minCFilter,
  maxCFilter,
  setMinCFilter,
  setMaxCFilter,
  minDFilter,
  maxDFilter,
  setMinDFilter,
  setMaxDFilter,
  minEFilter,
  maxEFilter,
  setMinEFilter,
  setMaxEFilter,
  minFFilter,
  maxFFilter,
  setMinFFilter,
  setMaxFFilter,
}) => {
  return (
    <Grid item container direction='row' spacing={3}>
      <Grid item>
        <DebounceInput
          element={TextField}
          id='record-filter'
          label='Szukaj'
          value={searchFilter}
          onChange={({ target: { value } }) => setSearchFilter(value)}
          debounceTimeout={400}
        />
      </Grid>
      <Grid item>
        <NumberRangeFilter
          minValue={minAFilter}
          setMinValue={setMinAFilter}
          maxValue={maxAFilter}
          setMaxValue={setMaxAFilter}
          label='A'
        />
      </Grid>
      <Grid item>
        <NumberRangeFilter
          minValue={minBFilter}
          setMinValue={setMinBFilter}
          maxValue={maxBFilter}
          setMaxValue={setMaxBFilter}
          label='B'
        />
      </Grid>
      <Grid item>
        <NumberRangeFilter
          minValue={minCFilter}
          setMinValue={setMinCFilter}
          maxValue={maxCFilter}
          setMaxValue={setMaxCFilter}
          label='C'
        />
      </Grid>
      <Grid item>
        <NumberRangeFilter
          minValue={minDFilter}
          setMinValue={setMinDFilter}
          maxValue={maxDFilter}
          setMaxValue={setMaxDFilter}
          label='D'
        />
      </Grid>
      <Grid item>
        <NumberRangeFilter
          minValue={minEFilter}
          setMinValue={setMinEFilter}
          maxValue={maxEFilter}
          setMaxValue={setMaxEFilter}
          label='E'
        />
      </Grid>
      <Grid item>
        <NumberRangeFilter
          minValue={minFFilter}
          setMinValue={setMinFFilter}
          maxValue={maxFFilter}
          setMaxValue={setMaxFFilter}
          label='F'
        />
      </Grid>
    </Grid>
  )
}

export default RecordFilters
