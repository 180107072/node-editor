import { RefObject, useEffect } from 'react'
import { select } from 'd3-selection'
import { D3DragEvent, drag } from 'd3-drag'
import { useStore } from './useStore'
import { EditorStore } from '../types'

const selector = (s: EditorStore) => s.transform[2]

export function useDrag<Datum>(nodeRef: RefObject<Element>) {
	const scale = useStore(selector)
	useEffect(() => {
		if (!nodeRef.current) return

		const element = nodeRef.current as HTMLElement
		const d3Drag = drag<HTMLElement, Datum>()

		const d3Selection = select<HTMLElement, Datum>(element)

		d3Drag.on(
			'drag',
			({ x, y }: D3DragEvent<HTMLElement, Datum, DragEvent>) => {
				element.style.transform = `translate(${x / scale}px, ${y / scale}px)`
			}
		)

		d3Selection.call(d3Drag)

		return () => {
			d3Drag.on('drag', null)
		}
	}, [])
}
