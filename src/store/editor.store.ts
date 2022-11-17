import { createStore } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { enableMapSet } from 'immer'
import { EditorActions, EditorStore, Node } from '../types'
import { initialState } from './initial.store'

enableMapSet()

export const createEditorState = () =>
	createStore<EditorStore & EditorActions, [['zustand/immer', never]]>(
		immer((set, get) => ({
			...initialState,

			setNodes(nodes) {
				set({ nodes })
			},
			addNode(node) {
				set((state) => void state.nodes.set(node.id, node))
			},
		}))
	)
