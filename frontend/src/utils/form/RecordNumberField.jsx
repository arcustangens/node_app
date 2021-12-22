import React from 'react'
import { Input, FormControl, InputLabel, FormHelperText } from '@mui/material'
import { Controller } from 'react-hook-form'

const RecordNumberField = ({ errors, control, name, label }) => {
  return (
    <Controller
      render={({ field }) => (
        <FormControl {...field} error={!!errors[name]} variant='standard'>
          <InputLabel htmlFor={`${name}-error`}>{label}</InputLabel>
          <Input type='number' aria-describedby={`${name}-error-text`} />
          <FormHelperText id={`${name}-error-text`}>
            {errors[name]?.message}
          </FormHelperText>
        </FormControl>
      )}
      control={control}
      name={name}
    />
  )
}

export default RecordNumberField
