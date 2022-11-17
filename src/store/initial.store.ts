import { EditorStore } from '../types'

export const initialState: EditorStore = {
	transform: [0, 0, 1],
	wrapperRect: null,
	nodes: new Map(),
	viewportActive: false,
}
