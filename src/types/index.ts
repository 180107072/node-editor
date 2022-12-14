import { RefObject } from 'react'

export type Transform = [number, number, number]
export type PositionXY = {
	x: number
	y: number
}
export type Node = {
	position: PositionXY
	type?: string
	id: number | string
	width: number
	height: number
	draggable?: boolean
	selectable?: boolean
}

export type Nodes = Map<number | string, Node>

export type EditorStore = {
	transform: Transform
	wrapperRect: DOMRect | null
	nodes: Nodes
	viewportActive: boolean
}

export type EditorActions = {
	setNodes: (nodes: Nodes) => void
	addNode: (node: Node) => void
	updateNodePosition: (nodeId: string | number, position: PositionXY) => void
}

export interface ElementWithData extends HTMLDivElement {
	data: Transform
}
