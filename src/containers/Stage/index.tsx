import { Viewport } from '../Viewport'
import { ZoomPane } from '../ZoomPane'
import { useStore } from '../../hooks/useStore'
import { NodeRenderer } from '../NodeRenderer'
import { EditorActions, EditorStore, Node } from '../../types'
import { nanoid } from 'nanoid'
import { useState, useTransition } from 'react'

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
			<div style={{ position: 'absolute', background: '#fff', zIndex: 1000 }}>
				<input
					placeholder="X"
					value={x}
					style={{ maxWidth: 30 }}
					onChange={({ target: { value } }) =>
						!isNaN(+value) && setNodesToGenerate({ ...pos, x: +value })
					}
				/>
				<input
					value={y}
					placeholder="y"
					style={{ maxWidth: 30 }}
					onChange={({ target: { value } }) =>
						!isNaN(+value) && setNodesToGenerate({ ...pos, y: +value })
					}
				/>

				<button
					onClick={() => {
						const generatedNodes = createNodes(x, y)

						store.setNodes(generatedNodes)
					}}
				>
					Add {x * y} nodes
				</button>

				<span style={{ marginLeft: 10 }}>Nodes: {store.nodes.size}</span>

				<span style={{ marginLeft: 10 }}>
					Transform: {JSON.stringify(store.transform, null, 4)}
				</span>
			</div>
			<ZoomPane>
				<Viewport>
					<NodeRenderer />
				</Viewport>
			</ZoomPane>
		</div>
	)
}
