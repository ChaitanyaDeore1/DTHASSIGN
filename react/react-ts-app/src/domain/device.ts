

export type DeviceType = 'sensor' | 'camera' | 'controller'
export type DeviceStatus = 'online' | 'offline' | 'error'

export interface Device {
  id: string
  name: string
  type: DeviceType
  status: DeviceStatus
  location: string
  metadata: Record<string, string>
}
