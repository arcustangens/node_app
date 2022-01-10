import React from 'react'
import {
  FormControl,
  InputLabel,
  FormHelperText,
  Select,
  MenuItem,
} from '@mui/material'

const RecordSelect = ({
  register,
  errors,
  name,
  label,
  options,
  defaultValue,
}) => {
  return (
    <FormControl error={!!errors[name]} variant='standard' fullWidth>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Select
        {...register(name)}
        aria-describedby={`${name}-error`}
        defaultValue={defaultValue}
      >
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
  )
}

export default RecordSelect
