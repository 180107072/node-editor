import { useMemo } from 'react'
import { EditorStore, Node } from '../types'
import { getOverlappingArea, Rect } from '../utils'
import { useStore } from './useStore'

const selector = (s: EditorStore) => ({
	wrapperRect: s.wrapperRect,
	nodes: s.nodes,
	transform: s.transform,
})

const getScaledRect = (rect: Rect, tScale: number) => ({
	x: rect.x / tScale,
	y: rect.y / tScale,
	width: rect.width / tScale,
	height: rect.height / tScale,
})

export function useVisibleNodes() {
	const {
		nodes,
		wrapperRect,
		transform: [tx, ty, tScale],
	} = useStore(selector)

	return useMemo(() => {
		const visibleNodes: Node[] = []
		if (!wrapperRect) return visibleNodes
		let i = 0

		const rect: Rect = getScaledRect(
			{
				x: wrapperRect.x - tx,
				y: wrapperRect.y - ty,
				width: wrapperRect.width,
				height: wrapperRect.height,
			},
			tScale
		)

		for (const [_, v] of nodes) {
			const nodeRect: Rect = {
				x: v.position.x,
				y: v.position.y,
				width: v.width,
				height: v.height,
			}

			const overlappingArea = getOverlappingArea(rect, nodeRect)

			if (overlappingArea > 0) {
				visibleNodes[i] = v
				i++
			}
		}

		return visibleNodes
	}, [nodes, tx, ty, tScale])
}
