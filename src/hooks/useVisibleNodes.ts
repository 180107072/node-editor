import { useMemo } from 'react'
import { EditorStore } from '../types'
import { getOverlappingArea, Rect } from '../utils'
import { useStore } from './useStore'

const selector = (s: EditorStore) => ({
	wrapperRect: s.wrapperRect,
	nodes: s.nodes,
	transform: s.transform,
})

export function useVisibleNodes() {
	const {
		nodes,
		wrapperRect,
		transform: [tx, ty, tScale],
	} = useStore(selector)
	return useMemo(() => {
		let i = 0
		const visibleNodes = []
		while (i < nodes.length) {
			if (!wrapperRect) break
			const rect: Rect = {
				x: (wrapperRect.x - tx) / tScale,
				y: (wrapperRect.y - ty) / tScale,
				width: wrapperRect.width / tScale,
				height: wrapperRect.height / tScale,
			}
			const nodeRect: Rect = {
				x: nodes[i].x,
				y: nodes[i].y,
				width: 100,
				height: 100,
			}
			const overlappingArea = getOverlappingArea(rect, nodeRect)

			if (overlappingArea > 100) visibleNodes.push(nodes[i])

			i++
		}

		return visibleNodes
	}, [nodes, tx, ty, tScale])
}
