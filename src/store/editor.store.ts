import { createStore } from 'zustand'
import { EditorActions, EditorStore, Node } from '../types'
import { initialState } from './initial.store'

export const createEditorState = () =>
	createStore<EditorStore & EditorActions>((set, get) => ({
		...initialState,

		addNode: ({ x, y }) => {
			const { transform, nodes } = get()
			const scale = transform[2]
			set({
				nodes: [
					...nodes!,
					{
						x: x / scale,
						y: y / scale,
					},
				],
			})
		},
	}))
