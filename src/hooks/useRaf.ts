import { useEffect, useRef } from 'react'

const noop = () => {}

export function useRaf(
	callback: (timeElapsed: number) => void,
	isActive: boolean
): void {
	const savedCallback = useRef<(timeElapsed: number) => void>()

	useEffect(() => {
		savedCallback.current = callback
	}, [callback])

	useEffect(() => {
		let animationFrame: number | undefined
		let startTime: number = Date.now()

		function tick() {
			const timeElapsed = Date.now() - startTime
			startTime = Date.now()
			loop()
			savedCallback.current?.(timeElapsed)
		}

		function loop() {
			animationFrame = requestAnimationFrame(tick)
		}

		if (isActive) {
			startTime = Date.now()
			loop()

			return () => {
				if (animationFrame) {
					cancelAnimationFrame(animationFrame)
				}
			}
		} else {
			return noop
		}
	}, [isActive])
}
