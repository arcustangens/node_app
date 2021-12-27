import React, { useState } from 'react'
import axios from 'axios'
import { Alert, Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import RecordTextField from '../../utils/form/RecordTextField'
import { ContractorSchema } from '../../validation/ContractorSchema'

const CreateContractorForm = ({ handleDialog, fetchContractors }) => {
  const [error, setError] = useState()

  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(ContractorSchema),
  })

  const onSubmit = async (data) => {
    try {
      await axios.post('/contractors', data)
      handleDialog()
      fetchContractors()
    } catch ({ response: { data } }) {
      setError(data.message ? data.message : data)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RecordTextField
        errors={errors}
        register={register}
        name={'contractor'}
        label={'Kontraktor'}
      />
      <RecordTextField
        errors={errors}
        register={register}
        name={'acronym'}
        label={'Akronim'}
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

export default CreateContractorForm
