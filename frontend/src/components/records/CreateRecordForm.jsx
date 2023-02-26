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
  contractors,
  dimensionTypes,
  materials,
}) => {
  const [error, setError] = useState()
  const [numberSuggestionLoading, setNumberSuggestionLoading] = useState(false)

  const convertNullToUndef = x => (_.isNull(x) ? undefined : x)

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
          ..._.omit(record, ['mainFile', 'thumbnailFile']),
          a: convertNullToUndef(record.a),
          b: convertNullToUndef(record.b),
          c: convertNullToUndef(record.c),
          d: convertNullToUndef(record.d),
          e: convertNullToUndef(record.e),
          f: convertNullToUndef(record.f),
        }
      : {
          contractor: 1,
          dimensionType: 1,
          material: 1,
        },
  })

  const contractor = watch('contractor')
  const number = watch('number')

  const buildRecordBody = data => {
    const recordPostFormData = new FormData()
    for (const key in data) {
      if (data[key]) recordPostFormData.append(key, data[key])
    }

    return recordPostFormData
  }

  const onSubmit = async data => {
    setError(null)

    const { mainFile, thumbnailFile, ...dataWithoutImages } = data
    const postBody = buildRecordBody(dataWithoutImages)
    if (mainFile && mainFile[0]) postBody.append('mainFile', mainFile[0])
    if (thumbnailFile && thumbnailFile[0])
      postBody.append('thumbnailFile', thumbnailFile[0])

    try {
      edit
        ? await axios.put(`/api/records/${record.id}`, postBody)
        : await axios.post('/api/records', postBody)
      handleDialog()
      fetchRecords()
    } catch ({ response: { data } }) {
      setError(data.message ? data.message : data)
    }
  }

  const fetchNumberSuggestion = async contractorId => {
    if (!number) setNumberSuggestionLoading(true)
    const {
      data: { numberSuggestion },
    } = await axios.get(`/api/contractors/next?contractorId=${contractorId}`)
    setValue('number', numberSuggestion)
    if (!number) setNumberSuggestionLoading(false)
  }

  useEffect(() => {
    if (contractor) fetchNumberSuggestion(contractor)
  }, [contractor])

  if (numberSuggestionLoading) {
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
    !contractors?.length ||
    !dimensionTypes?.length ||
    !materials?.length
  ) {
    return (
      <Alert severity='error'>
        Najpierw dodaj choć jednego klienta, typ wymiaru i materiał!
      </Alert>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RecordSelect
        errors={errors}
        control={control}
        name={'contractor'}
<<<<<<< HEAD
        label={'Klient'}
        options={contractors}
=======
        label={'Kontraktor'}
        options={contractors.sort((a, b) => a.label.localeCompare(b.label))}
>>>>>>> 9571a29db83277a9c26b91cc47d432ccb8fca62d
      />
      <RecordTextField
        register={register}
        errors={errors}
        name={'number'}
        label={'Numer wykrojnika'}
      />
      <RecordSelect
        errors={errors}
        control={control}
        name={'dimensionType'}
        label={'Typ wymiaru'}
        options={dimensionTypes}
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
        name={'name'}
        label={'Nazwa'}
      />
      <RecordSelect
        errors={errors}
        control={control}
        name={'material'}
        label={'Materiał'}
        options={materials}
      />
      <RecordTextField
        register={register}
        errors={errors}
        name={'comments'}
        label={'Uwagi'}
        multiline
      />
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <RecordFileField
            register={register}
            errors={errors}
            name='mainFile'
            label='Plik'
          />
        </Grid>
        <Grid item xs={6}>
          <RecordFileField
            register={register}
            errors={errors}
            name='thumbnailFile'
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
        {edit ? 'Zaktualizuj' : 'Dodaj'}
      </Button>
    </form>
  )
}

export default CreateRecordForm
