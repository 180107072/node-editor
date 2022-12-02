import {
	FC,
	ForwardedRef,
	forwardRef,
	PropsWithChildren,
	RefObject,
	useContext,
	useRef,
} from 'react'
import ViewportContext from '../../context/ViewportContext'
import { useRaf } from '../../hooks/useRaf'
import { useStore } from '../../hooks/useStore'
import { EditorStore, Transform } from '../../types'

const selector = (s: EditorStore) => ({
	transform: s.transform,
	wrapperRect: s.wrapperRect,
	shouldRun: s.viewportActive,
})

const applySelector = (transform: Transform) =>
	`translate(${transform[0]}px,${transform[1]}px) scale3d(${transform[2]}, ${transform[2]}, ${transform[2]})`

export const Viewport = ({ children }: PropsWithChildren) => {
	const ref = useContext(ViewportContext)

	return (
		<div ref={ref} className="node__editor__viewport">
			{children}
		</div>
	)
}
