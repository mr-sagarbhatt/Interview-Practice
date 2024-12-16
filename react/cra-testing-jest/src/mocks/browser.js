// Before 2.x: import { setupWorker } from 'msw'
// After 2.x: import { setupWorker } from 'msw/browser'

// TODO: Browser/Client/React Testing
import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

export const worker = setupWorker(...handlers)
