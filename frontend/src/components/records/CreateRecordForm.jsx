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

const CreateRecordForm = ({ handleDialog, appendRecord, edit, record }) => {
  const [error, setError] = useState()
  const [kontrahenci, setKontrahenci] = useState([])
  const [kontrahenciLoading, setKontrahenciLoading] = useState(false)
  const [typyWymiaru, setTypyWymiaru] = useState([])
  const [typyWymiaruLoading, setTypyWymiaruLoading] = useState(false)
  const [materialy, setMaterialy] = useState([])
  const [materialyLoading, setMaterialyLoading] = useState(false)

  const convertNullToUndef = (x) => (_.isNull(x) ? undefined : x)

  const {
    handleSubmit,
    control,
    register,
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
      const { data } = edit
        ? await axios.put(`/form/${record.id}`, postBody)
        : await axios.post('/form', postBody)
      appendRecord({
        ...data,
        kontrahent: kontrahenci.find((x) => x.value === +data.kontrahent).label,
        material: materialy.find((x) => x.value === +data.material).label,
        typ: typyWymiaru.find((x) => x.value === +data.typ).label,
      })
      handleDialog()
    } catch (e) {
      setError(e.message)
    }
  }

  const fetchKontrahenci = async () => {
    setKontrahenciLoading(true)
    const { data } = await axios.get('/kontrahenci')
    setKontrahenci(data)
    setKontrahenciLoading(false)
  }

  const fetchTypyWymiaru = async () => {
    setTypyWymiaruLoading(true)
    const { data } = await axios.get('/typ_wymiaru')
    setTypyWymiaru(data)
    setTypyWymiaruLoading(false)
  }

  const fetchMaterialy = async () => {
    setMaterialyLoading(true)
    const { data } = await axios.get('/materialy')
    setMaterialy(data)
    setMaterialyLoading(false)
  }

  const isDataLoading = () => {
    return kontrahenciLoading || typyWymiaruLoading || materialyLoading
  }

  useEffect(() => {
    fetchKontrahenci()
    fetchTypyWymiaru()
    fetchMaterialy()
  }, [])

  if (isDataLoading()) {
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
  } else if (!kontrahenci.length || !typyWymiaru.length || !materialy.length) {
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
        options={typyWymiaru}
      />
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <RecordTextField
            errors={errors}
            control={control}
            name={'a'}
            label={'A'}
          />
        </Grid>
        <Grid item xs={2}>
          <RecordTextField
            errors={errors}
            control={control}
            name={'b'}
            label={'B'}
          />
        </Grid>
        <Grid item xs={2}>
          <RecordTextField
            errors={errors}
            control={control}
            name={'c'}
            label={'C'}
          />
        </Grid>
        <Grid item xs={2}>
          <RecordTextField
            errors={errors}
            control={control}
            name={'d'}
            label={'D'}
          />
        </Grid>
        <Grid item xs={2}>
          <RecordTextField
            errors={errors}
            control={control}
            name={'e'}
            label={'E'}
          />
        </Grid>
        <Grid item xs={2}>
          <RecordTextField
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
      <RecordTextField
        errors={errors}
        control={control}
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
