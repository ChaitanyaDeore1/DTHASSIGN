import type { Device } from "../domain/device";

export const mockDevices: Device[] = [
  {
    id: '1',
    name: 'Temperature Sensor A1',
    type: 'sensor',
    status: 'online',
    location: 'Building A - Floor 1',
    metadata: {
      unit: 'celsius',
      range: '0-100',
    },
  },
  {
    id: '2',
    name: 'Security Camera B2',
    type: 'camera',
    status: 'offline',
    location: 'Building B - Entrance',
    metadata: {
      resolution: '1080p',
    },
  },
]
