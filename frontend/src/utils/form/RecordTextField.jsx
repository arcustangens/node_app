import React from 'react'
import { Input, FormControl, InputLabel, FormHelperText } from '@mui/material'
import { Controller } from 'react-hook-form'

const RecordTextField = ({ errors, control, name, label }) => {
  return (
    <Controller
      render={({ field }) => (
        <FormControl
          error={!!errors[name]}
          variant='standard'
          fullWidth
          {...field}
        >
          <InputLabel htmlFor={`${name}-error`}>{label}</InputLabel>
          <Input aria-describedby={`${name}-error-text`} />
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

export default RecordTextField
