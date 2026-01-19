import type { Device } from '../domain/device'

interface DeviceListProps {
  devices: Device[]
  selectedDeviceId: string | null
  onSelect: (id: string) => void
}



export function DeviceList({
  devices,
  selectedDeviceId,
  onSelect,
}: DeviceListProps) {
  return (
    <div className="device-list">
      {devices.map(device => (
        <div
          key={device.id}
          className={`device-card ${
            device.id === selectedDeviceId ? 'active' : ''
          }`}
          onClick={() => onSelect(device.id)}
        >
          <h3>{device.name}</h3>
          <p className={`status ${device.status}`}>
            {device.status.toUpperCase()}
          </p>
          <p className="type">{device.type}</p>
        </div>
      ))}
    </div>
  )
}
