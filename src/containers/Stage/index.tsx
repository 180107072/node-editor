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
			<button
				style={{ position: 'absolute', zIndex: 1000 }}
				onClick={() => {
					for (let i = 0; i < 50; i++) {
						for (let k = 0; k < 50; k++) {
							store.addNode({ x: 150 * i, y: 150 * k })
						}
					}
				}}
			>
				Add node
			</button>
			<ZoomPane>
				<Viewport>
					<NodeRenderer />
				</Viewport>
			</ZoomPane>
		</div>
	)
}
