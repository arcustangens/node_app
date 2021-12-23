import { Button, DialogContent, DialogTitle, Grid } from '@mui/material'

const RecordDetails = ({ record, handleOpenEdit }) => {
  if (!record) {
    return <span />
  }

  const { kontrahent, nazwa, numer, typ, a, b, c, d, e, f, material } = record

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
                <Button color='error' variant='contained'>
                  Usuń rekord
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={8}>
            <img
              alt='thumbnail'
              src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fe-hortico.pl%2Fuserdata%2Fgfx%2Fd7b6765ceecab4ad10703f28553ee41f.jpg'
              style={{ width: 600, height: 'auto', borderRadious: '3%' }}
            />
          </Grid>
        </Grid>
      </DialogContent>
    </>
  )
}

export default RecordDetails
