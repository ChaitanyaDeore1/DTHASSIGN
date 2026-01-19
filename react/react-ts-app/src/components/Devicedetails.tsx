import { useReducer } from 'react'
import type { Device } from '../domain/device'
import {
  deviceEditReducer,
  type EditState,
} from '../reducers/deviceEditReducer'


interface DeviceDetailsProps {
  device: Device
}

export function DeviceDetails({ device }: DeviceDetailsProps) {
  const [state, dispatch] = useReducer(deviceEditReducer, {
    status: 'view',
  } as EditState)

  // ---- VIEW MODE ----
  if (state.status === 'view') {
    return (
      <div className="details">
        <h2>Device Details</h2>

        <p><strong>Name:</strong> {device.name}</p>
        <p><strong>Type:</strong> {device.type}</p>
        <p><strong>Status:</strong> {device.status}</p>
        <p><strong>Location:</strong> {device.location}</p>

        <h3>Metadata</h3>
        {Object.entries(device.metadata).map(([key, value]) => (
          <p key={key}>
            <strong>{key}:</strong> {value}
          </p>
        ))}

        <button
          onClick={() =>
            dispatch({ type: 'START_EDIT', device })
          }
        >
          Edit Metadata
        </button>
      </div>
    )
  }

  // ---- EDIT / SAVING / ERROR ----
  const draft = state.draft

  return (
    <div className="details">
      <h2>Edit Metadata</h2>

      {Object.entries(draft.metadata).map(([key, value]) => (
        <div key={key}>
          <label>{key}</label>
          <input
            value={value}
            disabled={state.status === 'saving'}
            onChange={e =>
              dispatch({
                type: 'UPDATE_DRAFT',
                field: key,
                value: e.target.value,
              })
            }
          />
        </div>
      ))}

      {state.status === 'error' && (
        <p style={{ color: 'red' }}>
          {state.message}
        </p>
      )}

      <div style={{ marginTop: 12 }}>
        <button
          onClick={() => dispatch({ type: 'SAVE' })}
          disabled={state.status === 'saving'}
        >
          Save
        </button>

        <button
          onClick={() =>
            dispatch({ type: 'CANCEL_EDIT' })
          }
          disabled={state.status === 'saving'}
        >
          Cancel
        </button>
      </div>

      {state.status === 'saving' && (
        <p>Saving changes…</p>
      )}
    </div>
  )
}
