import React from 'react'
import {
  FormControl,
  InputLabel,
  FormHelperText,
  Select,
  MenuItem,
} from '@mui/material'
import { Controller } from 'react-hook-form'

const RecordSelect = ({ errors, control, name, label, options }) => {
  return (
    <Controller
      render={({ field }) => (
        <FormControl error={!!errors[name]} variant='standard' fullWidth>
          <InputLabel htmlFor={name}>{label}</InputLabel>
          <Select {...field} aria-describedby={`${name}-error`}>
            <MenuItem value={'Kontrahent 1'}>Kontrahent 1</MenuItem>
            <MenuItem value={'Kontrahent 2'}>Kontrahent 2</MenuItem>
            <MenuItem value={'Kontrahent 3'}>Kontrahent 3</MenuItem>
          </Select>
          <FormHelperText id={`${name}-error`}>
            {errors[name]?.message}
          </FormHelperText>
        </FormControl>
      )}
      control={control}
      name={name}
      defaultValue={'Kontrahent 1'}
    />
  )
}

export default RecordSelect
