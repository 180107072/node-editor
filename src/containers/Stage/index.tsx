import { Viewport } from '../Viewport'
import { ZoomPane } from '../ZoomPane'
import { useStore } from '../../hooks/useStore'
import { NodeRenderer } from '../NodeRenderer'
import { EditorActions, EditorStore, Node } from '../../types'
import { nanoid } from 'nanoid'
import { useState } from 'react'

const selector = (s: EditorStore & EditorActions) => ({
	transform: s.transform.map((v) => v.toFixed(2)),
	wrapperRect: s.wrapperRect,
	addNode: s.addNode,
	setNodes: s.setNodes,
	nodes: s.nodes,
})

const createNodes = (x = 10, y = 10) => {
	const nodes = new Map<string, Node>()
	for (let i = 0; i < x; i++) {
		for (let k = 0; k < y; k++) {
			const id = nanoid()
			nodes.set(id, {
				type: 'example',
				id,
				width: 100,
				height: 100,
				position: {
					x: 150 * i,
					y: 150 * k,
				},
			})
		}
	}
	return nodes
}

export const Stage = () => {
	const store = useStore(selector)
	const [pos, setNodesToGenerate] = useState({ x: 10, y: 10 })
	const { x, y } = pos

	return (
		<div className="node__editor__example_wrapper">
			<div className="node__editor__example_controls">
				<input
					placeholder="X"
					value={x}
					onChange={({ target: { value } }) =>
						!isNaN(+value) && setNodesToGenerate({ ...pos, x: +value })
					}
				/>
				<input
					placeholder="Y"
					value={y}
					onChange={({ target: { value } }) =>
						!isNaN(+value) && setNodesToGenerate({ ...pos, y: +value })
					}
				/>
				<button onClick={() => store.setNodes(createNodes(x, y))}>
					Add {x * y} nodes
				</button>
				<span>Nodes: {store.nodes.size}</span>
				<span>Transform: {JSON.stringify(store.transform, null, 4)}</span>
			</div>
			<ZoomPane>
				<Viewport>
					<NodeRenderer />
				</Viewport>
			</ZoomPane>
		</div>
	)
}
