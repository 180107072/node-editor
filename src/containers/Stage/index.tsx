import { Viewport } from '../Viewport'
import { ZoomPane } from '../ZoomPane'
import { useStore } from '../../hooks/useStore'
import { EditorActions, EditorStore } from '../../types'
import { NodeRenderer } from '../NodeRenderer'

const selector = (s: EditorStore & EditorActions) => ({
	transform: s.transform,
	wrapperRect: s.wrapperRect,
	addNode: s.addNode,
	nodes: s.nodes,
})

export const Stage = () => {
	const store = useStore(selector)

	return (
		<div className='node__editor__example_wrapper'>
			<div style={{ position: 'absolute', zIndex: 1000 }}>
				<button
					onClick={() => {
						for (let i = 0; i < 100; i++) {
							for (let k = 0; k < 100; k++) {
								store.addNode({
									x: 150 * i * store.transform[2],
									y: 150 * k * store.transform[2],
								})
							}
						}
					}}
				>
					Add {100 * 100} nodes
				</button>

				<b style={{ color: 'white', marginLeft: 10 }}>
					Nodes: {store.nodes.length}
				</b>
			</div>
			<ZoomPane>
				<Viewport>
					<NodeRenderer />
				</Viewport>
			</ZoomPane>
		</div>
	)
}
