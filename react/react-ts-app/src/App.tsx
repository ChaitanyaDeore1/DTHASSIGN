import { useState } from 'react'
import { useDevices } from './hooks/useDevices'
import { DeviceList } from './components/DeviceList'
import { DeviceDetails } from './components/Devicedetails'

function App() {
  const { devices, loading, error, retry } = useDevices()

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] =
    useState<'all' | 'online' | 'offline' | 'error'>('all')
  const [typeFilter, setTypeFilter] =
    useState<'all' | 'sensor' | 'camera' | 'controller'>('all')
  const [selectedDeviceId, setSelectedDeviceId] =
    useState<string | null>(null)

  const filteredDevices = 
   //search.trim() === ''
   // ? []:
    devices.filter(device => {
    const matchesSearch = device.name
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchesStatus =
      statusFilter === 'all' || device.status === statusFilter

    const matchesType =
      typeFilter === 'all' || device.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const selectedDevice =
    devices.find(d => d.id === selectedDeviceId) || null

  if (loading) return <p>Loading devices...</p>

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={retry}>Retry</button>
      </div>
    )
  }

  return (
    <div className="app-wrapper">
      <div className="app">
        <h1 className="title">Device Dashboard</h1>

        <div className="filters">
          <input
            type="text"
            placeholder="Search devices..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <select
            value={statusFilter}
            onChange={e =>
              setStatusFilter(e.target.value as any)
            }
          >
            <option value="all">All Status</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
            <option value="error">Error</option>
          </select>

          <select
            value={typeFilter}
            onChange={e =>
              setTypeFilter(e.target.value as any)
            }
          >
            <option value="all">All Types</option>
            <option value="sensor">Sensor</option>
            <option value="camera">Camera</option>
            <option value="controller">Controller</option>
          </select>
        </div>

        <div className="content">
          <DeviceList
            devices={filteredDevices}
            selectedDeviceId={selectedDeviceId}
            onSelect={setSelectedDeviceId}
          />

          {selectedDevice && (
            <DeviceDetails device={selectedDevice} />
          )}
        </div>
      </div>
    </div>
  )
}

export default App
