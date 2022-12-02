import { createContext, RefObject } from 'react'
import { ElementWithData } from '../types'

const ViewportContext = createContext<RefObject<ElementWithData> | null>(null)

export const ViewportProvider = ViewportContext.Provider
export default ViewportContext
