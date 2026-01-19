import { mockDevices } from '../data/mockdevices'
import type { Device } from '../domain/device'

export function fetchDevices(): Promise<Device[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldFail = Math.random() < 0.2

      if (shouldFail) {
        reject(new Error('Failed to load devices'))
      } else {
        resolve(mockDevices)
      }
    },1000)
  })
}
