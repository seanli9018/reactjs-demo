import { useEffect, useState, useCallback } from 'react'

export default function useFetchHook(apiCallback) {
  const [data, setData] = useState([]);
  const [onError, setOnError] = useState(false);

  const fetchTask = useCallback(async () => {
    setOnError(false);
    try {
      const resp = await apiCallback();
      setData(resp.data);
    } catch (err) {
      setOnError(true);
      console.log(err)
    }
  }, [apiCallback, setData, setOnError])

  useEffect(() => {
    fetchTask();
  }, [fetchTask])

  return {
    data,
    onError
  }
}