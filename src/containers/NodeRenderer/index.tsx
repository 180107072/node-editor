import { useDeferredValue } from 'react'
import { Node } from '../../components/Node'
import { useVisibleNodes } from '../../hooks/useVisibleNodes'

export const NodeRenderer = () => {
	const visibleNodes = useVisibleNodes()
	const deferred = useDeferredValue(visibleNodes)

	return (
		<>
			{deferred.map((node, key) => (
				<Node {...node} key={key} />
			))}
		</>
	)
}
