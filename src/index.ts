import { useEffect, useState } from "react"
import * as Vec2 from "vec2"

function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min
}

class Node {
  ctx: any

  position: Vec2
  velocity: Vec2

  constructor(ctx: any, width: number, height: number, max_velocity: number = 0.5) {
    this.position = new Vec2(getRandomArbitrary(0, width), getRandomArbitrary(0, height))
    this.velocity = new Vec2( getRandomArbitrary(-max_velocity, max_velocity), getRandomArbitrary(-max_velocity, max_velocity) )

    this.ctx = ctx
  }

  render() {
    this.ctx.beginPath()
    this.ctx.arc(this.position.x, this.position.y, 2, 0, 2 * Math.PI)

    this.position.add(this.velocity)

    // if (this.position.x > this.ctx.width || this.position.y > this.ctx.height) {
    //     this.position.negate()
    //     console.log(this.position)
    // }

    this.ctx.fill()
  }
}

class NodalBackground {
  container: any
  width: number
  height: number
  canvas: any
  context: any

  counter: number
  direction: boolean

  tPrevious: number
  tDelta: number

  nodes: any

  constructor(container: any) {
    this.container = container

    this.counter = 0
    this.direction = true

    this.nodes = []
  }

  resize() {
    console.log(devicePixelRatio)
    this.width = this.container.clientWidth * devicePixelRatio
    this.height = this.container.clientHeight * devicePixelRatio

    this.canvas.width = this.width
    this.canvas.height = this.height
  }

  start() {
    this.canvas = document.createElement("canvas")
    this.context = this.canvas.getContext("2d")

    this.resize()

    for (let fori = 0; fori < 50; fori++) {
      this.nodes.push(new Node(this.context, this.width, this.height))
    }

    requestAnimationFrame((time) => {
      this.tPrevious = time
      this.render(time)
    })

    this.container.appendChild(this.canvas)
  }

  render(time: number) {
    this.tDelta = time - this.tPrevious
    this.tPrevious = time

    if (Math.abs(this.counter) > 120) {
      this.direction = !this.direction
    }

    if (this.direction) {
      this.counter = this.counter + 1
    } else {
      this.counter = this.counter - 1
    }

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.nodes.forEach((node: any) => {
      node.render()
    })

    requestAnimationFrame((time) => {
      this.render(time)
    })
  }
}

export function useNodalBackground(props: any) {
  const [container, setContainer] = useState(props.container)

  useEffect(() => {
    if (container) {
      const nodalBackground = new NodalBackground(container)
      nodalBackground.start()
    }
  }, [container])

  return {
    container,
    setContainer,
  }
}
