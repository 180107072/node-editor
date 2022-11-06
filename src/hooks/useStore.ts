import { useContext, useMemo } from 'react'
import StoreContext from '../context/EditorStoreContext'
import { EditorActions, EditorStore } from '../types'
import { StoreApi, useStore as useZustandStore } from 'zustand'

type ExtractState = StoreApi<EditorStore & EditorActions> extends { getState: () => infer T }
	? T
	: never

export function useStore<StateSlice = ExtractState>(
	selector: (state: EditorStore & EditorActions) => StateSlice,
	equalityFn?: (a: StateSlice, b: StateSlice) => boolean
) {
	const store = useContext(StoreContext)

	if (store === null) {
		throw new Error('No provider')
	}

	return useZustandStore(store, selector, equalityFn)
}

export const useStoreApi = () => {
	const store = useContext(StoreContext)

	if (!store) {
		throw new Error('No provider')
	}

	return useMemo(
		() => ({
			getState: store.getState,
			setState: store.setState,
			subscribe: store.subscribe,
			destroy: store.destroy,
		}),
		[store]
	)
}
