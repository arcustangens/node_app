import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { UpdateRecordSchema } from '../../validation/UpdateRecordSchema'
import { RecordSchema } from '../../validation/RecordSchema'
import { Grid, Alert, Button, CircularProgress } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import RecordSelect from '../../utils/form/RecordSelect'
import RecordTextField from '../../utils/form/RecordTextField'
import RecordFileField from '../../utils/form/RecordFileField'
import _ from 'lodash'

const CreateRecordForm = ({
  handleDialog,
  fetchRecords,
  edit,
  record,
  kontrahenci,
  typyWymiaru,
  materialy,
}) => {
  const [error, setError] = useState()
  const [numerSuggestionLoading, setNumerSuggestionLoading] = useState(false)

  const convertNullToUndef = (x) => (_.isNull(x) ? undefined : x)

  const {
    handleSubmit,
    control,
    register,
    setValue,
    watch,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(edit ? UpdateRecordSchema : RecordSchema),
    defaultValues: edit
      ? {
          ..._.omit(record, ['plik', 'plik_thumbnail', 'typ']),
          a: convertNullToUndef(record.a),
          b: convertNullToUndef(record.b),
          c: convertNullToUndef(record.c),
          d: convertNullToUndef(record.d),
          e: convertNullToUndef(record.e),
          f: convertNullToUndef(record.f),
          kontrahent: kontrahenci.length
            ? kontrahenci.find(({ label }) => label === record.kontrahent).value
            : undefined,
          typWymiaru: typyWymiaru.length
            ? typyWymiaru.find(({ label }) => label === record.typ).value
            : undefined,
          material: materialy.length
            ? materialy.find(({ label }) => label === record.material).value
            : undefined,
        }
      : {
          kontrahent: 1,
          typ: 1,
          material: 1,
        },
  })

  const kontrahent = watch('kontrahent')
  const numer = watch('numer')

  const buildRecordBody = (data) => {
    const recordPostFormData = new FormData()
    for (const key in data) {
      recordPostFormData.append(key, data[key])
    }

    return recordPostFormData
  }

  const onSubmit = async (data) => {
    console.log(data)
    setError(null)

    const { plik, plikThumbnail, ...dataWithoutImages } = data
    const postBody = buildRecordBody(dataWithoutImages)
    if (plik) postBody.append('plik', plik[0])
    if (plikThumbnail) postBody.append('plikThumbnail', plikThumbnail[0])

    try {
      edit
        ? await axios.put(`/records/${record.id}`, postBody)
        : await axios.post('/records', postBody)
      fetchRecords()
      handleDialog()
    } catch (e) {
      setError(e.message)
    }
  }

  const fetchNumerSuggestion = async (idKontrahenta) => {
    if (!numer) setNumerSuggestionLoading(true)
    const { data } = await axios.get(
      `/kontrahenci/next?idKontrahenta=${idKontrahenta}`
    )
    setValue('numer', data.numerSuggestion)
    if (!numer) setNumerSuggestionLoading(false)
  }

  useEffect(() => {
    fetchNumerSuggestion(kontrahent)
  }, [kontrahent])

  if (numerSuggestionLoading) {
    return (
      <Grid
        container
        justifyContent='center'
        sx={{
          paddingTop: 10,
        }}
      >
        <Grid item>
          <CircularProgress />
        </Grid>
      </Grid>
    )
  } else if (
    !kontrahenci?.length ||
    !typyWymiaru?.length ||
    !materialy?.length
  ) {
    return (
      <Alert severity='error'>
        Najpierw dodaj choć jednego kontrahenta, typ wymiaru i materiał!
      </Alert>
    )
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
        register={register}
        errors={errors}
        name={'numer'}
        label={'Numer'}
      />
      <RecordSelect
        errors={errors}
        control={control}
        name={'typWymiaru'}
        label={'Typ wymiaru'}
        options={typyWymiaru}
      />
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <RecordTextField
            register={register}
            errors={errors}
            name={'a'}
            label={'A'}
          />
        </Grid>
        <Grid item xs={2}>
          <RecordTextField
            register={register}
            errors={errors}
            name={'b'}
            label={'B'}
          />
        </Grid>
        <Grid item xs={2}>
          <RecordTextField
            register={register}
            errors={errors}
            name={'c'}
            label={'C'}
          />
        </Grid>
        <Grid item xs={2}>
          <RecordTextField
            register={register}
            errors={errors}
            name={'d'}
            label={'D'}
          />
        </Grid>
        <Grid item xs={2}>
          <RecordTextField
            register={register}
            errors={errors}
            name={'e'}
            label={'E'}
          />
        </Grid>
        <Grid item xs={2}>
          <RecordTextField
            register={register}
            errors={errors}
            name={'f'}
            label={'F'}
          />
        </Grid>
      </Grid>
      <RecordTextField
        register={register}
        errors={errors}
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
      <RecordTextField
        register={register}
        errors={errors}
        name={'uwagi'}
        label={'Uwagi'}
        multiline
      />
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <RecordFileField
            register={register}
            errors={errors}
            name='plik'
            label='Plik'
          />
        </Grid>
        <Grid item xs={6}>
          <RecordFileField
            register={register}
            errors={errors}
            name='plikThumbnail'
            label='Thumbnail'
          />
        </Grid>
      </Grid>

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
