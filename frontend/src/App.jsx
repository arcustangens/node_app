import { Container, TextField, Button, Grid } from '@mui/material'
import RecordTable from './RecordTable'

function App() {
  return (
    <Container maxWidth='xl'>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField id='time' type='text' />
        </Grid>
        <Grid item xs={6}>
          <Button onClick={() => alert('Create record')} variant='contained'>
            Contained
          </Button>
        </Grid>
      </Grid>

      <RecordTable />
      {/* <RecordDialog /> */}
    </Container>
  )
}

export default App
