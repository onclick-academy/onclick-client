import { useEffect, useRef } from 'react'

interface PointInterface {
  x: number
  y: number
  lifetime: number
}

class Point implements PointInterface {
  x: number
  y: number
  lifetime: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
    this.lifetime = 0
  }
}

const Cursor = () => {
  const Cursorref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = Cursorref.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const points: Point[] = []

    const addPoint = (x: number, y: number) => {
      const point = new Point(x, y)
      points.push(point)
    }

    const animatePoints = () => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      const duration = (1 * (1 * 1000)) / 60

      for (let i = 0; i < points.length; ++i) {
        const point = points[i]
        let lastPoint

        if (points[i - 1] !== undefined) {
          lastPoint = points[i - 1]
        } else lastPoint = point

        point.lifetime += 1

        if (point.lifetime > duration) {
          points.shift()
        } else {
          const lifePercent = point.lifetime / duration
          const spreadRate = 7 * (1 - lifePercent)

          ctx.lineJoin = 'round'
          ctx.lineWidth = spreadRate

          const red = Math.floor(190 - 190 * lifePercent)
          const green = 0
          const blue = Math.floor(210 + 210 * lifePercent)
          ctx.strokeStyle = `rgb(${red},${green},${blue})`

          ctx.beginPath()

          ctx.moveTo(lastPoint.x, lastPoint.y)
          ctx.lineTo(point.x, point.y)

          ctx.stroke()
          ctx.closePath()
        }
      }
      requestAnimationFrame(animatePoints)
    }

    const handleMouseMove = ({ clientX, clientY }: MouseEvent) => {
      if (!canvas) return
      addPoint(clientX - canvas.offsetLeft, clientY - canvas.offsetTop)
    }

    document.addEventListener('mousemove', handleMouseMove)

    animatePoints()

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={Cursorref}
      width={window.innerWidth}
      height={window.innerHeight}
      style={{
        backgroundColor: 'transparent',
        position: 'absolute',
        zIndex: 99,
        pointerEvents: 'none'
      }}
    />
  )
}

export default Cursor
