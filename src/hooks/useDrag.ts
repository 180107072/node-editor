import { RefObject, useCallback, useEffect, useRef, useState } from 'react'
import { select } from 'd3-selection'
import { D3DragEvent, drag } from 'd3-drag'
import { useStoreApi } from './useStore'

export function useDrag<Datum>(
	nodeRef: RefObject<HTMLElement>,
	nodeId: string | number
) {
	const [dragging, setDragging] = useState(false)
	const store = useStoreApi()
	const offset = useRef<{ x: number; y: number }>({
		x: 0,
		y: 0,
	})

	const getPointer = ({
		sourceEvent,
	}: D3DragEvent<HTMLElement, Datum, DragEvent>) => {
		const x = sourceEvent.touches
			? sourceEvent.touches[0].clientX
			: sourceEvent.clientX
		const y = sourceEvent.touches
			? sourceEvent.touches[0].clientY
			: sourceEvent.clientY

		return { x, y }
	}

	const getPointerPosition = useCallback(
		(event: D3DragEvent<HTMLElement, Datum, DragEvent>) => {
			const { x, y } = getPointer(event)

			const { transform } = store.getState()
			const pointerPos = {
				x: (x - transform[0]) / transform[2],
				y: (y - transform[1]) / transform[2],
			}

			return {
				xSnapped: pointerPos.x,
				ySnapped: pointerPos.y,
				...pointerPos,
			}
		},
		[]
	)

	useEffect(() => {
		if (!nodeRef.current) return

		const element = nodeRef.current as HTMLElement
		const d3Drag = drag<HTMLElement, Datum>()

		const d3Selection = select<HTMLElement, Datum>(element)

		d3Drag.on('start', (event: D3DragEvent<HTMLElement, Datum, DragEvent>) => {
			setDragging(true)
			if (!nodeRef.current) return
			const nodeRect = nodeRef.current.getBoundingClientRect()
			const { transform } = store.getState()
			const scale = transform[2]
			const { x, y } = getPointer(event)

			offset.current = {
				x: (x - nodeRect.x) / scale,
				y: (y - nodeRect.y) / scale,
			}
		})

		d3Drag.on('drag', (event: D3DragEvent<HTMLElement, Datum, DragEvent>) => {
			if (!offset.current || !nodeRef.current) return

			const { x, y } = getPointerPosition(event)
			nodeRef.current.style.transform = `translate3d(${
				x - offset.current.x
			}px, ${y - offset.current.y}px, 0px)`
		})

		d3Drag.on('end', (event: D3DragEvent<HTMLElement, Datum, DragEvent>) => {
			const { x, y } = getPointerPosition(event)
			const { updateNodePosition } = store.getState()

			updateNodePosition(nodeId, {
				x: x - offset.current.x,
				y: y - offset.current.y,
			})
			setDragging(false)
		})

		d3Selection.call(d3Drag)

		return () => {
			d3Drag.on('start', null)
			d3Drag.on('drag', null)
			d3Drag.on('end', null)
		}
	}, [])

	return dragging
}
