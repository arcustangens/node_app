import React from 'react'
import { Input, FormControl, InputLabel, FormHelperText } from '@mui/material'
import { Controller } from 'react-hook-form'

const RecordTextField = ({ errors, control, name, label, multiline }) => {
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
          <Input
            id={name}
            aria-describedby={`${name}-error`}
            multiline={multiline}
            maxRows={4}
            defaultValue={field.value}
          />
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
