import React from 'react'
import { Input, InputLabel, FormHelperText } from '@mui/material'

const RecordFileField = ({ register, errors, name, label }) => {
  return (
    <>
      <InputLabel
        htmlFor={name}
        sx={{
          color: !!errors[name] && 'error.main',
        }}
      >
        {label}
      </InputLabel>
      <Input
        {...register(name)}
        type='file'
        aria-describedby={`${name}-error`}
        sx={{
          color: !!errors[name] && 'error.main',
        }}
      />
      <FormHelperText
        id={`${name}-error`}
        sx={{
          color: !!errors[name] && 'error.main',
        }}
      >
        {errors[name]?.message}
      </FormHelperText>
    </>
  )
}

export default RecordFileField
