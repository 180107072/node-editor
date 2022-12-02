import {
	startTransition,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react'
import ViewportContext from '../context/ViewportContext'
import { EditorStore, Node } from '../types'
import { getOverlappingArea, Rect } from '../utils'
import { useRaf } from './useRaf'
import { useStore } from './useStore'

const selector = (s: EditorStore) => ({
	wrapperRect: s.wrapperRect,
	nodes: s.nodes,
	transform: s.transform,
	shouldRun: s.viewportActive,
})

const getScaledRect = (rect: Rect, tScale: number) => ({
	x: rect.x / tScale,
	y: rect.y / tScale,
	width: rect.width / tScale,
	height: rect.height / tScale,
})

export function useVisibleNodes() {
	const { nodes, wrapperRect, shouldRun } = useStore(selector)

	const viewportRef = useContext(ViewportContext)!

	const [visibleNodes, setVisibleNodes] = useState<Node[]>([])

	useRaf(() => {
		const ns: Node[] = []
		if (!wrapperRect || !viewportRef!.current) return visibleNodes

		let i = 0

		const [tx, ty, tScale] = viewportRef.current.data

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
				ns[i] = v
				i++
			}
		}

		setVisibleNodes(ns)
	}, shouldRun)

	return visibleNodes
}
