import { FC, PropsWithChildren, useRef } from 'react'
import { StoreApi } from 'zustand'
import { createEditorState } from '../../store/editor.store'
import { Provider } from '../../context/EditorStoreContext'
import { EditorActions, EditorStore } from '../../types'

export const EditorProvider: FC<PropsWithChildren> = ({ children }) => {
	const storeRef = useRef<StoreApi<EditorStore & EditorActions> | null>(null)

	if (!storeRef.current) {
		storeRef.current = createEditorState()
	}
	return <Provider value={storeRef.current}>{children}</Provider>
}
