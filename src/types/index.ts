export type Transform = [number, number, number]
export type Node = {
	x: number
	y: number
}

export type EditorStore = {
	transform: Transform
	wrapperRect: DOMRect | null
	nodes: Node[]
}

export type EditorActions = {
	addNode: ({ x, y }: Node) => void
}
