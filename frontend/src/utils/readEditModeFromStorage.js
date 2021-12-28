import _ from 'lodash'

export const readEditModeFromStorage = () => {
  const editModeFromStorage = localStorage.getItem('edit')

  if (_.isNull(editModeFromStorage)) {
    return false
  } else if (editModeFromStorage === '0') {
    return false
  } else if (editModeFromStorage === '1') {
    return true
  } else {
    return false
  }
}
