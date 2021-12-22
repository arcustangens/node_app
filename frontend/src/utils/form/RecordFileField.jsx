import React from 'react'
import { Input, FormControl, InputLabel, FormHelperText } from '@mui/material'
import { Controller } from 'react-hook-form'

const RecordFileField = ({ errors, control, name, label }) => {
  return (
    <Controller
      render={({ field }) => (
        <FormControl
          {...field}
          error={!!errors[name]}
          variant='standard'
          fullWidth
        >
          <InputLabel htmlFor='component-error'>{label}</InputLabel>
          <Input type='file' aria-describedby='component-error-text' />
          <FormHelperText id='component-error-text'>
            {errors[name]?.message}
          </FormHelperText>
        </FormControl>
      )}
      control={control}
      name={name}
    />
  )
}

export default RecordFileField
