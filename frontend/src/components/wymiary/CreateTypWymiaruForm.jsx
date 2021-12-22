import React, { useState } from 'react'
import axios from 'axios'
import { Alert, Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import RecordTextField from '../../utils/form/RecordTextField'
import { MaterialSchema } from '../../validation/MaterialSchema'

const CreateTypWymiaruForm = ({ handleDialog }) => {
  const [error, setError] = useState()

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(MaterialSchema),
  })

  const onSubmit = async (data) => {
    try {
      await axios.post('/typ_wymiaru', data)
      handleDialog()
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RecordTextField
        errors={errors}
        control={control}
        name={'typWymiaru'}
        label={'Typ wymiaru'}
      />

      {error && <Alert severity='error'>{error}</Alert>}
      <Button
        fullWidth
        type='submit'
        disabled={isSubmitting}
        variant='contained'
        color='primary'
      >
        Dodaj
      </Button>
    </form>
  )
}

export default CreateTypWymiaruForm
