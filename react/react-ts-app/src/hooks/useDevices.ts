import { useEffect, useState } from 'react'
import { fetchDevices } from '../Services/deviceservices'
import type { Device } from '../domain/device'

export function useDevices() {
  const [devices, setDevices] = useState<Device[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadDevices = () => {
    setLoading(true)
    setError(null)

    fetchDevices()
      .then(setDevices)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false)) 
  }   

  useEffect(() => {
    loadDevices()
  }, [])

  return { devices, loading, error, retry: loadDevices }
}
