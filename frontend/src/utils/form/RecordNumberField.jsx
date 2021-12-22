import React from 'react'
import { Input, FormControl, InputLabel, FormHelperText } from '@mui/material'
import { Controller } from 'react-hook-form'

const RecordNumberField = ({ errors, control, name, label }) => {
  return (
    <Controller
      render={({ field }) => (
        <FormControl {...field} error={!!errors[name]} variant='standard'>
          <InputLabel htmlFor={name}>{label}</InputLabel>
          <Input id={name} type='number' aria-describedby={`${name}-error`} />
          <FormHelperText id={`${name}-error`}>
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
