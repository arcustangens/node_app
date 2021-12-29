import { Alert, Button, DialogContent, DialogTitle, Grid } from '@mui/material'
import axios from 'axios'
import { useState } from 'react'
import { buildDimension } from '../../utils/buildDimension'
import { useEditModeContext } from '../../EditModeContext'

const RecordDetails = ({
  record,
  handleOpenEdit,
  handleClose,
  fetchRecords,
  contractors,
  dimensionTypes,
  materials,
}) => {
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [deleteError, setDeleteError] = useState()
  const { edit } = useEditModeContext()

  if (!record) {
    return <span />
  }

  const deleteRecord = async () => {
    setDeleteLoading(true)
    setDeleteError(null)

    try {
      await axios.delete(`/api/records/${record.id}`)
      handleClose()
      fetchRecords()
    } catch ({ response: { data } }) {
      setDeleteError(data.message ? data.message : data)
      setDeleteLoading(false)
    }
  }

  const {
    contractorId,
    name,
    number,
    dimensionTypeId,
    a,
    b,
    c,
    d,
    e,
    f,
    materialId,
    comments,
    mainFile,
    thumbnailFile,
  } = record

  return (
    <>
      <DialogTitle>{name}</DialogTitle>
      <DialogContent>
        <Grid container justifyContent='space-between' spacing={6}>
          <Grid item container direction='column' xs={4} spacing={1}>
            <Grid item>
              Kontraktor:{' '}
              <strong>
                {contractors.find(({ value }) => value === contractorId)?.label}
              </strong>
            </Grid>
            <Grid item>
              Numer: <strong>{number}</strong>
            </Grid>
            <Grid item>
              Typ wymiaru:{' '}
              <strong>
                {
                  dimensionTypes.find(({ value }) => value === dimensionTypeId)
                    ?.label
                }
              </strong>
            </Grid>
            <Grid item>{buildDimension({ a, b, c, d, e, f })}</Grid>
            <Grid item>
              Materiał:{' '}
              <strong>
                {materials.find(({ value }) => value === materialId)?.label}
              </strong>
            </Grid>
            <Grid
              item
              sx={{
                inlineSize: 250,
                overflowWrap: 'break-word',
              }}
            >
              Uwagi: <i>{comments}</i>
            </Grid>
            <Grid item container spacing={3} sx={{ marginTop: 2 }}>
              <Grid item>
                <Button
                  color='primary'
                  variant='contained'
                  onClick={handleOpenEdit}
                  disabled={!edit}
                >
                  Edytuj rekord
                </Button>
              </Grid>
              <Grid item>
                <Button
                  color='error'
                  variant='contained'
                  disabled={deleteLoading || !edit}
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
              href={`http://localhost:3000/uploads/${mainFile}`}
              target='_blank'
              rel='noreferrer'
            >
              <img
                alt='thumbnail'
                src={`http://localhost:3000/uploads/${thumbnailFile}`}
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
