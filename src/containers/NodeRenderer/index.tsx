import { Node } from '../../components/Node'
import { useVisibleNodes } from '../../hooks/useVisibleNodes'

export const NodeRenderer = () => {
	const visibleNodes = useVisibleNodes()

	return (
		<>
			{visibleNodes.map((node, key) => (
				<Node {...node} key={key} />
			))}
		</>
	)
}
