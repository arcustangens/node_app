import axios from 'axios'
import { useState, useEffect, useCallback } from 'react'

export const useAxiosGet = (uri) => {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const getData = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const res = await axios.get(uri)
      setData(res?.data)
    } catch ({ response: { data } }) {
      setError(data.message ? data.message : data)
    } finally {
      setLoading(false)
    }
  }, [uri])

  useEffect(() => {
    getData()
  }, [getData])

  return [data, loading, error, getData]
}
