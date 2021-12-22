import React, { useState } from 'react'
import axios from 'axios'
import { KontrahentSchema } from '../../validation/KontrahentSchema'
import {
  Input,
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

const CreateKontrahentDialog = () => {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState()

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(KontrahentSchema),
  })

  const onSubmit = async (data) => {
    setError(null)

    try {
      await axios.post('/kontrahenci', data)
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
          <FormControl
            error={!!errors[name]}
            variant='standard'
            fullWidth
            {...field}
          >
            <InputLabel htmlFor={`${name}-error`}>{label}</InputLabel>
            <Input aria-describedby={`${name}-error-text`} />
            <FormHelperText id={`${name}-error-text`}>
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
        Dodaj kontrahenta
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Dodaj kontrahenta</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            {RecordTextField('kontrahent', 'Kontrahent')}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Wróć</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default CreateKontrahentDialog
