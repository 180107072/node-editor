import { memo, useRef } from 'react'
import { useDrag } from '../../hooks/useDrag'
import { Node } from '../../types'

export const NodeExample = memo(({ position: { x, y } }: Node) => {
	const ref = useRef<HTMLDivElement>(null)

	// useDrag<HTMLDivElement>(ref)

	return (
		<div
			ref={ref}
			className="node__editor__example_node"
			style={{ transform: `translate3d(${x}px, ${y}px, 0px)` }}
		>
			<input placeholder="Some Input" />
			<input />
			<input />
			<button>CLICK</button>
		</div>
	)
})
