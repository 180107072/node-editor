import {
	FC,
	PropsWithChildren,
	startTransition,
	useEffect,
	useRef,
} from 'react'
import { zoom, D3ZoomEvent } from 'd3-zoom'
import { select } from 'd3-selection'
import { useStoreApi } from '../../hooks/useStore'

export const ZoomPane: FC<PropsWithChildren> = ({ children }) => {
	const zoomWrapper = useRef<HTMLDivElement>(null)
	const store = useStoreApi()

	const handleZoomStart = (event: D3ZoomEvent<HTMLDivElement, WheelEvent>) => {
		store.setState({
			viewportActive: true,
		})
	}
	const handleZoom = (event: D3ZoomEvent<HTMLDivElement, WheelEvent>) => {
		const { x, y, k } = event.transform

		store.setState({
			transform: [x, y, k],
		})
	}
	const handleZoomEnd = (event: D3ZoomEvent<HTMLDivElement, WheelEvent>) => {
		store.setState({
			wrapperRect: zoomWrapper.current!.getBoundingClientRect(),
			viewportActive: false,
		})
	}

	useEffect(() => {
		if (!zoomWrapper.current) return
		store.setState({ wrapperRect: zoomWrapper.current.getBoundingClientRect() })

		const d3Zoom = zoom<HTMLElement, HTMLDivElement>().scaleExtent([0.2, 4])
		const d3Selection = select<HTMLElement, HTMLDivElement>(zoomWrapper.current)

		d3Zoom.on('start', handleZoomStart)
		d3Zoom.on('zoom', handleZoom)
		d3Zoom.on('end', handleZoomEnd)

		d3Selection.call(d3Zoom)

		return () => {
			d3Zoom.on('zoom', null)
			d3Zoom.on('end', null)
			d3Zoom.on('start', null)
		}
	}, [])

	return (
		<div ref={zoomWrapper} className="node__editor__zoom">
			{children}
		</div>
	)
}
