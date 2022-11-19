import deepEqual from 'react-fast-compare'
import { memo, useDeferredValue } from 'react'
import { NodeExample } from '../../components/Node'
import { useVisibleNodes } from '../../hooks/useVisibleNodes'
import { Node } from '../../types'

type RendererProps = {
	nodes: Node[]
}

const Renderer = memo(({ nodes }: RendererProps) => {
	return (
		<>
			{nodes.map((node) => (
				<NodeExample {...node} key={node.id} />
			))}
		</>
	)
}, deepEqual)

export const NodeRenderer = () => {
	const visibleNodes = useVisibleNodes()
	const deferred = useDeferredValue(visibleNodes)

	return <Renderer nodes={deferred} />
}
