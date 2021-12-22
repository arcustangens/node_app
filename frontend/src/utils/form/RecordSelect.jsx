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
            {options.map(({ value, label }) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText id={`${name}-error`}>
            {errors[name]?.message}
          </FormHelperText>
        </FormControl>
      )}
      control={control}
      name={name}
      defaultValue={options[0].value}
    />
  )
}

export default RecordSelect
