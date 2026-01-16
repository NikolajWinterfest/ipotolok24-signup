// -------------------------------------------- EVENTS -------------------------------------------- //
import type { SignupForm } from './types'
import { createEvent } from 'effector'

// Export event «formChanged»
export const formChanged = createEvent<Partial<SignupForm>>()
export const fieldTouched = createEvent<keyof SignupForm>()
export const touchAll = createEvent()
