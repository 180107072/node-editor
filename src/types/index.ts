export type Transform = [number, number, number]
export type Position = {
	x: number
	y: number
}
export type Node = {
	position: Position
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
}
