import React, { useState } from 'react'
import axios from 'axios'
import { RecordSchema } from './RecordSchema'
import {
  Input,
  Grid,
  FormControl,
  InputLabel,
  FormHelperText,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

const CreateRecordDialog = () => {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState()

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(RecordSchema),
  })

  const buildRecordBody = (data) => {
    const recordPostFormData = new FormData()
    for (const key in data) {
      recordPostFormData.append(key, data[key])
    }
  }

  const onSubmit = async (data) => {
    setError(null)
    const postBody = buildRecordBody(data)

    try {
      await axios.post('/form', postBody)
      setOpen(false)
    } catch (e) {
      setError(e.message)
    }
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const RecordTextField = (name, label) => {
    return (
      <Controller
        render={({ field }) => (
          <FormControl error={errors[name]} variant='standard' fullWidth>
            <InputLabel htmlFor='component-error'>{label}</InputLabel>
            <Input {...field} aria-describedby='component-error-text' />
            <FormHelperText id='component-error-text'>
              {errors[name]?.message}
            </FormHelperText>
          </FormControl>
        )}
        control={control}
        name={name}
      />
    )
  }

  const RecordNumberField = (name, label) => {
    return (
      <Controller
        render={({ field }) => (
          <FormControl error={errors[name]} variant='standard'>
            <InputLabel htmlFor='component-error'>{label}</InputLabel>
            <Input
              {...field}
              type='number'
              aria-describedby='component-error-text'
            />
            <FormHelperText id='component-error-text'>
              {errors[name]?.message}
            </FormHelperText>
          </FormControl>
        )}
        control={control}
        name={name}
      />
    )
  }

  return (
    <div>
      <Button variant='outlined' onClick={handleClickOpen}>
        Dodaj
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Dodaj rekord</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            {RecordTextField('kontrahent', 'Kontrahent')}
            {RecordTextField('numer', 'Numer')}
            {RecordTextField('typWymiaru', 'Typ wymiaru')}
            <Grid container spacing={1}>
              <Grid item xs={2}>
                {RecordNumberField('a', 'A')}
              </Grid>
              <Grid item xs={2}>
                {RecordNumberField('b', 'B')}
              </Grid>
              <Grid item xs={2}>
                {RecordNumberField('c', 'C')}
              </Grid>
              <Grid item xs={2}>
                {RecordNumberField('d', 'D')}
              </Grid>
              <Grid item xs={2}>
                {RecordNumberField('e', 'E')}
              </Grid>
              <Grid item xs={2}>
                {RecordNumberField('f', 'F')}
              </Grid>
            </Grid>
            {RecordTextField('nazwa', 'Nazwa')}
            {RecordTextField('material', 'Materiał')}
            {error && <Alert severity='error'>{error}</Alert>}
            <Button
              type='submit'
              disabled={isSubmitting}
              variant='contained'
              color='primary'
            >
              Dodaj
            </Button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Wróć</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default CreateRecordDialog
