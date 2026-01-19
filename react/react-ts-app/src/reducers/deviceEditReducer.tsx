import type  { Device } from '../domain/device'

export type EditState =
  | { status: 'view' }
  | { status: 'edit'; draft: Device }
  | { status: 'saving'; draft: Device }
  | { status: 'error'; draft: Device; message: string }

export type EditAction =
  | { type: 'START_EDIT'; device: Device }
  | { type: 'CANCEL_EDIT' }
  | { type: 'UPDATE_DRAFT'; field: string; value: string }
  | { type: 'SAVE' }
  | { type: 'SAVE_SUCCESS' }
  | { type: 'SAVE_ERROR'; message: string }

export function deviceEditReducer(
  state: EditState,
  action: EditAction
): EditState {
  switch (state.status) {
    case 'view':
      if (action.type === 'START_EDIT') {
        return { status: 'edit', draft: action.device }
      }
      return state

    case 'edit':
      if (action.type === 'UPDATE_DRAFT') {
        return {
          ...state,
          draft: {
            ...state.draft,
            metadata: {
              ...state.draft.metadata,
              [action.field]: action.value,
            },
          },
        }
      }
      if (action.type === 'SAVE') {
        return { status: 'saving', draft: state.draft }
      }
      if (action.type === 'CANCEL_EDIT') {
        return { status: 'view' }
      }
      return state

    case 'saving':
      if (action.type === 'SAVE_SUCCESS') {
        return { status: 'view' }
      }
      if (action.type === 'SAVE_ERROR') {
        return {
          status: 'error',
          draft: state.draft,
          message: action.message,
        }
      }
      return state

    case 'error':
      if (action.type === 'START_EDIT') {
        return { status: 'edit', draft: action.device }
      }
      return state

    default:
      return state
  }
}
