import { Alert, Button, DialogContent, DialogTitle, Grid } from '@mui/material'
import axios from 'axios'
import { useState } from 'react'

const RecordDetails = ({
  record,
  handleOpenEdit,
  handleClose,
  removeRecord,
}) => {
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [deleteError, setDeleteError] = useState()

  if (!record) {
    return <span />
  }

  const deleteRecord = async () => {
    setDeleteLoading(true)
    setDeleteError(null)

    try {
      await axios.delete(`/records/${record.id}`)
      removeRecord(record)
      handleClose()
    } catch (e) {
      setDeleteError(e?.message)
    } finally {
      setDeleteLoading(false)
    }
  }

  const {
    kontrahent,
    nazwa,
    numer,
    typ,
    a,
    b,
    c,
    d,
    e,
    f,
    material,
    uwagi,
    plik,
    plik_thumbnail: plikThumbnail,
  } = record

  return (
    <>
      <DialogTitle>{nazwa}</DialogTitle>
      <DialogContent>
        <Grid container justifyContent='space-between' spacing={6}>
          <Grid item container direction='column' xs={4} spacing={1}>
            <Grid item>
              Kontrahent: <strong>{kontrahent}</strong>
            </Grid>
            <Grid item>
              Numer: <strong>{numer}</strong>
            </Grid>
            <Grid item>
              Typ wymiaru: <strong>{typ}</strong> - ({a}
              {b && `, ${b}`}
              {c && `, ${c}`}
              {d && `, ${d}`}
              {e && `, ${e}`}
              {f && `, ${f}`})
            </Grid>
            <Grid item>
              Materiał: <strong>{material}</strong>
            </Grid>
            <Grid
              item
              sx={{
                inlineSize: 250,
                overflowWrap: 'break-word',
              }}
            >
              Uwagi: <i>{uwagi}</i>
            </Grid>
            <Grid item container spacing={3} sx={{ marginTop: 2 }}>
              <Grid item>
                <Button
                  color='primary'
                  variant='contained'
                  onClick={handleOpenEdit}
                >
                  Edytuj rekord
                </Button>
              </Grid>
              <Grid item>
                <Button
                  color='error'
                  variant='contained'
                  disabled={deleteLoading}
                  onClick={() => {
                    if (
                      window.confirm('Czy na pewno chcesz usunąć ten rekord?')
                    ) {
                      deleteRecord()
                    }
                  }}
                >
                  Usuń rekord
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={8}>
            <a
              href={`http://localhost:3000/uploads/${plik}`}
              target='_blank'
              rel='noreferrer'
            >
              <img
                alt='thumbnail'
                src={`http://localhost:3000/uploads/${plikThumbnail}`}
                style={{ width: 600, height: 'auto', borderRadius: '3%' }}
              />
            </a>
          </Grid>
        </Grid>
        {deleteError && <Alert severity='error'>{deleteError}</Alert>}
      </DialogContent>
    </>
  )
}

export default RecordDetails
