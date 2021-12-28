import { Alert, Button, CircularProgress, Container, Grid } from '@mui/material'
import RecordTable from './components/records/RecordTable'
import CreateRecordDialog from './components/records/CreateRecordDialog'
import CreateContractorDialog from './components/contractors/CreateContractorDialog'
import CreateMaterialDialog from './components/materials/CreateMaterialDialog'
import CreateDimensionTypeDialog from './components/dimensionTypes/CreateDimensionTypeDialog'
import { useEffect, useState } from 'react'
import { useAxiosGet } from './utils/useFetch'
import RecordFilters from './components/records/RecordFilters'
import { filterRecords } from './utils/filterRecords'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { EditModeContext } from './EditModeContext'
import { readEditModeFromStorage } from './utils/readEditModeFromStorage'

const App = () => {
  const [edit, setEdit] = useState(readEditModeFromStorage())
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

  //Filters
  const [searchFilter, setSearchFilter] = useState('')

  const [minAFilter, setMinAFilter] = useState('')
  const [maxAFilter, setMaxAFilter] = useState('')

  const [minBFilter, setMinBFilter] = useState('')
  const [maxBFilter, setMaxBFilter] = useState('')

  const [minCFilter, setMinCFilter] = useState('')
  const [maxCFilter, setMaxCFilter] = useState('')

  const [minDFilter, setMinDFilter] = useState('')
  const [maxDFilter, setMaxDFilter] = useState('')

  const [minEFilter, setMinEFilter] = useState('')
  const [maxEFilter, setMaxEFilter] = useState('')

  const [minFFilter, setMinFFilter] = useState('')
  const [maxFFilter, setMaxFFilter] = useState('')

  const toggleEdit = () => {
    edit ? localStorage.setItem('edit', 0) : localStorage.setItem('edit', 1)

    setEdit(!edit)
  }

  useEffect(() => {
    if (records?.length) {
      setFilteredRecords(
        filterRecords(
          records,
          searchFilter,
          contractors,
          dimensionTypes,
          materials,
          minAFilter,
          maxAFilter,
          minBFilter,
          maxBFilter,
          minCFilter,
          maxCFilter,
          minDFilter,
          maxDFilter,
          minEFilter,
          maxEFilter,
          minFFilter,
          maxFFilter
        )
      )
    }
  }, [
    records,
    searchFilter,
    contractors,
    dimensionTypes,
    materials,
    minAFilter,
    maxAFilter,
    minBFilter,
    maxBFilter,
    minCFilter,
    maxCFilter,
    minDFilter,
    maxDFilter,
    minEFilter,
    maxEFilter,
    minFFilter,
    maxFFilter,
  ])

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
    <EditModeContext.Provider value={{ edit }}>
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
            <Grid item>
              <Button
                variant='outlined'
                startIcon={edit ? <EditIcon /> : <VisibilityIcon />}
                onClick={toggleEdit}
              >
                {edit ? 'Edycja włączona' : 'Edycja wyłączona'}
              </Button>
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
          <RecordFilters
            searchFilter={searchFilter}
            setSearchFilter={setSearchFilter}
            minAFilter={minAFilter}
            maxAFilter={maxAFilter}
            setMinAFilter={setMinAFilter}
            setMaxAFilter={setMaxAFilter}
            minBFilter={minBFilter}
            maxBFilter={maxBFilter}
            setMinBFilter={setMinBFilter}
            setMaxBFilter={setMaxBFilter}
            minCFilter={minCFilter}
            maxCFilter={maxCFilter}
            setMinCFilter={setMinCFilter}
            setMaxCFilter={setMaxCFilter}
            minDFilter={minDFilter}
            maxDFilter={maxDFilter}
            setMinDFilter={setMinDFilter}
            setMaxDFilter={setMaxDFilter}
            minEFilter={minEFilter}
            maxEFilter={maxEFilter}
            setMinEFilter={setMinEFilter}
            setMaxEFilter={setMaxEFilter}
            minFFilter={minFFilter}
            maxFFilter={maxFFilter}
            setMinFFilter={setMinFFilter}
            setMaxFFilter={setMaxFFilter}
          />
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
    </EditModeContext.Provider>
  )
}

export default App
