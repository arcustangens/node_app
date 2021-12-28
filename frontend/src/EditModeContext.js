import React, { useContext } from 'react'

export const EditModeContext = React.createContext({
  edit: false,
})
export const useEditModeContext = () => useContext(EditModeContext)
