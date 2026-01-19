import { useReducer } from 'react'
import type  { Device } from '../domain/device'
import {
  deviceEditReducer,
  type EditState,
} from '../reducers/deviceEditReducer'

interface DeviceEditorProps {
  device: Device
}

export function DeviceEditor({ device }: DeviceEditorProps) {
  const [state, dispatch] = useReducer(deviceEditReducer, {
    status: 'view',
  } as EditState)

  if (state.status === 'view') {
    return (
      <button onClick={() => dispatch({ type: 'START_EDIT', device })}>
        Edit Metadata
      </button>
    )
  }

  if (state.status === 'edit') {
    return (
      <div>
        <h3>Edit Metadata</h3>

        {Object.entries(state.draft.metadata).map(([key, value]) => (
          <input
            key={key}
            value={value}
            onChange={e =>
              dispatch({
                type: 'UPDATE_DRAFT',
                field: key,
                value: e.target.value,
              })
            }
          />
        ))}

        <button onClick={() => dispatch({ type: 'SAVE' })}>Save</button>
        <button onClick={() => dispatch({ type: 'CANCEL_EDIT' })}>
          Cancel
        </button>
      </div>
    )
  }

  if (state.status === 'saving') {
    return <p>Saving...</p>
  }

  if (state.status === 'error') {
    return (
      <div>
        <p>Error: {state.message}</p>
        <button onClick={() => dispatch({ type: 'START_EDIT', device })}>
          Retry
        </button>
      </div>
    )
  }

  return null
}
