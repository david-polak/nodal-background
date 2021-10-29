import { BasicNode } from "./nodes/BasicNode"

export class NodalBackground {
  container: Element
  width: number
  height: number
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D

  counter: number
  direction: boolean

  tPrevious: number
  tDelta: number

  nodes: Array<BasicNode>

  constructor(container: Element) {
    this.container = container

    this.counter = 0
    this.direction = true

    this.nodes = []
  }

  resize() {
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
      this.nodes.push(new BasicNode(this.context, this.width, this.height, 0.1))
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

    this.nodes.forEach((node: BasicNode) => {
      node.render()
    })

    requestAnimationFrame((time) => {
      this.render(time)
    })
  }
}
