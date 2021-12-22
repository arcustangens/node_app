import React from 'react'
import { Input, FormControl, InputLabel, FormHelperText } from '@mui/material'
import { Controller } from 'react-hook-form'

const RecordTextField = ({ errors, control, name, label }) => {
  return (
    <Controller
      render={({ field }) => (
        <FormControl
          {...field}
          error={!!errors[name]}
          variant='standard'
          fullWidth
        >
          <InputLabel htmlFor={name}>{label}</InputLabel>
          <Input id={name} aria-describedby={`${name}-error`} />
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

export default RecordTextField
