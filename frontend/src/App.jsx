import {
  Alert,
  CircularProgress,
  Container,
  Grid,
  TextField,
} from '@mui/material'
import RecordTable from './components/records/RecordTable'
import CreateRecordDialog from './components/records/CreateRecordDialog'
import CreateContractorDialog from './components/contractors/CreateContractorDialog'
import CreateMaterialDialog from './components/materials/CreateMaterialDialog'
import CreateDimensionTypeDialog from './components/dimensionTypes/CreateDimensionTypeDialog'
import { useEffect, useState } from 'react'
import { DebounceInput } from 'react-debounce-input'
import { useAxiosGet } from './utils/useFetch'

const App = () => {
  const [contractors, contractorsLoading, contractorsError, fetchContractors] =
    useAxiosGet('/contractors')
  const [
    dimensionTypes,
    dimensionTypesLoading,
    dimensionTypesError,
    fetchDimensionTypes,
  ] = useAxiosGet('/dimensionTypes')
  const [materials, materialsLoading, materialsError, fetchMaterials] =
    useAxiosGet('/materials')
  const [records, recordsLoading, recordsError, fetchRecords] =
    useAxiosGet('/records')
  const [filteredRecords, setFilteredRecords] = useState(records)
  const [searchFilter, setSearchFilter] = useState('')

  useEffect(() => {
    if (records?.length) {
      setFilteredRecords([
        ...records.filter(({ name }) =>
          name.toLowerCase().includes(String(searchFilter).toLowerCase())
        ),
      ])
    }
  }, [records, searchFilter])

  const isDataLoading =
    contractorsLoading ||
    dimensionTypesLoading ||
    materialsLoading ||
    recordsLoading

  if (isDataLoading) {
    return (
      <CircularProgress
        sx={{
          position: 'absolute',
          left: '50%',
          top: '50%',
        }}
      />
    )
  }

  return (
    <Container
      maxWidth='xl'
      sx={{
        padding: 2,
      }}
    >
      <Grid container spacing={2} direction='column'>
        <Grid item container direction='row' spacing={3}>
          <Grid item>
            <CreateRecordDialog
              fetchRecords={fetchRecords}
              contractors={contractors}
              dimensionTypes={dimensionTypes}
              materials={materials}
            />
          </Grid>
          <Grid item>
            <CreateContractorDialog fetchContractors={fetchContractors} />
          </Grid>
          <Grid item>
            <CreateDimensionTypeDialog
              fetchDimensionTypes={fetchDimensionTypes}
            />
          </Grid>
          <Grid item>
            <CreateMaterialDialog fetchMaterials={fetchMaterials} />
          </Grid>
        </Grid>
        {[
          contractorsError,
          dimensionTypesError,
          materialsError,
          recordsError,
        ].map((e, i) =>
          e ? (
            <Grid item key={i}>
              <Alert severity='error'>{e}</Alert>
            </Grid>
          ) : null
        )}
        <Grid item>
          <DebounceInput
            element={TextField}
            id='record-filter'
            label='Szukaj'
            value={searchFilter}
            onChange={({ target: { value } }) => setSearchFilter(value)}
            debounceTimeout={400}
          />
        </Grid>
        <Grid item>
          <RecordTable
            records={filteredRecords}
            fetchRecords={fetchRecords}
            contractors={contractors}
            dimensionTypes={dimensionTypes}
            materials={materials}
          />
        </Grid>
      </Grid>
    </Container>
  )
}

export default App
