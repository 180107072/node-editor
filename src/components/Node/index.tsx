import { memo, useRef } from 'react'
import { useDrag } from '../../hooks/useDrag'

type NodeProps = {
	x: number
	y: number
}

export const Node = memo(({ x, y }: NodeProps) => {
	const ref = useRef<HTMLDivElement>(null)

	useDrag<HTMLDivElement>(ref)

	return (
		<div
			ref={ref}
			className='node__editor__example_node'
			style={{ transform: `translate3d(${x}px, ${y}px, 0px)` }}
		></div>
	)
})
