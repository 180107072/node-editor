import { memo, useEffect, useRef } from 'react'
import { useDrag } from '../../hooks/useDrag'
import { Node } from '../../types'

export const NodeExample = memo(({ id, position: { x, y } }: Node) => {
	const ref = useRef<HTMLDivElement>(null)

	const dragging = useDrag<HTMLDivElement>(ref, id)

	useEffect(() => {
		if (!ref.current) return

		ref.current.style.transform = `translate3d(${x}px, ${y}px, 0px)`
	}, [])

	return (
		<div ref={ref} className="node__editor__example_node">
			<input placeholder="Some Input" />
			<input />
			<input />
			<button>CLICK</button>
		</div>
	)
})
