import React, { useState } from 'react'
import axios from 'axios'
import { RecordSchema } from '../../validation/RecordSchema'
import { Grid, Alert, Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import RecordSelect from '../../utils/form/RecordSelect'
import RecordTextField from '../../utils/form/RecordTextField'
import RecordNumberField from '../../utils/form/RecordNumberField'
import RecordFileField from '../../utils/form/RecordFileField'

const CreateRecordForm = ({ handleDialog, kontrahenci, materialy }) => {
  const [error, setError] = useState()

  const buildRecordBody = (data) => {
    const recordPostFormData = new FormData()
    for (const key in data) {
      recordPostFormData.append(key, data[key])
    }
  }

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(RecordSchema),
  })

  const onSubmit = async (data) => {
    console.log(data)
    setError(null)
    const postBody = buildRecordBody(data)

    try {
      await axios.post('/form', postBody)
      handleDialog()
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RecordSelect
        errors={errors}
        control={control}
        name={'kontrahent'}
        label={'Kontrahent'}
        options={kontrahenci}
      />
      <RecordTextField
        errors={errors}
        control={control}
        name={'numer'}
        label={'Numer'}
      />
      <RecordSelect
        errors={errors}
        control={control}
        name={'typWymiaru'}
        label={'Typ wymiaru'}
        options={kontrahenci}
      />
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <RecordNumberField
            errors={errors}
            control={control}
            name={'a'}
            label={'A'}
          />
        </Grid>
        <Grid item xs={2}>
          <RecordNumberField
            errors={errors}
            control={control}
            name={'b'}
            label={'B'}
          />
        </Grid>
        <Grid item xs={2}>
          <RecordNumberField
            errors={errors}
            control={control}
            name={'c'}
            label={'C'}
          />
        </Grid>
        <Grid item xs={2}>
          <RecordNumberField
            errors={errors}
            control={control}
            name={'d'}
            label={'D'}
          />
        </Grid>
        <Grid item xs={2}>
          <RecordNumberField
            errors={errors}
            control={control}
            name={'e'}
            label={'E'}
          />
        </Grid>
        <Grid item xs={2}>
          <RecordNumberField
            errors={errors}
            control={control}
            name={'f'}
            label={'F'}
          />
        </Grid>
      </Grid>
      <RecordTextField
        errors={errors}
        control={control}
        name={'nazwa'}
        label={'Nazwa'}
      />
      <RecordSelect
        errors={errors}
        control={control}
        name={'material'}
        label={'Materiał'}
        options={materialy}
      />
      <RecordFileField
        errors={errors}
        control={control}
        name={'plik'}
        label={'Plik'}
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

export default CreateRecordForm
