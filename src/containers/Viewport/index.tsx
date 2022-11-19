import { FC, PropsWithChildren, useEffect, useRef } from 'react'
import { useStore } from '../../hooks/useStore'
import { EditorStore, Transform } from '../../types'

const selector = (s: EditorStore) => ({
	transform: s.transform,
	wrapperRect: s.wrapperRect,
})

const applySelector = (transform: Transform) =>
	`translate3d(${transform[0]}px,${transform[1]}px, 0px) scale3d(${transform[2]}, ${transform[2]}, ${transform[2]})`

export const Viewport: FC<PropsWithChildren> = ({ children }) => {
	const store = useStore(selector)
	const transform = applySelector(store.transform)
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		requestAnimationFrame(() => {
			if (!ref.current) return
			ref.current.style.transform = transform
		})
	}, [transform])

	return (
		<div ref={ref} className="node__editor__viewport">
			{children}
		</div>
	)
}
