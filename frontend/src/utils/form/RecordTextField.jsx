import React from 'react'
import { Input, FormControl, InputLabel, FormHelperText } from '@mui/material'

const RecordTextField = ({ register, errors, name, label, multiline }) => {
  return (
    <FormControl error={!!errors[name]} variant='standard' fullWidth>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Input
        {...register(name)}
        aria-describedby={`${name}-error`}
        multiline={multiline}
        maxRows={4}
      />
      <FormHelperText id={`${name}-error`}>
        {errors[name]?.message}
      </FormHelperText>
    </FormControl>
  )
}

export default RecordTextField
