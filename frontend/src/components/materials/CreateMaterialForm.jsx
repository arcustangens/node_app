import React, { useState } from 'react'
import axios from 'axios'
import { Alert, Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import RecordTextField from '../../utils/form/RecordTextField'
import { MaterialSchema } from '../../validation/MaterialSchema'

const CreateMaterialForm = ({ handleDialog, fetchMaterials }) => {
  const [error, setError] = useState()

  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(MaterialSchema),
  })

  const onSubmit = async data => {
    try {
      await axios.post('/api/materials', data)
      handleDialog()
      fetchMaterials()
    } catch ({ response: { data } }) {
      setError(data.message ? data.message : data)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RecordTextField
        errors={errors}
        register={register}
        name={'material'}
        label={'Materiał'}
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

export default CreateMaterialForm
