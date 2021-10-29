import { BasicNode } from "./nodes/BasicNode"
import Vector2 from "./Vector2"
import { AbstractNode } from "./nodes/AbstractNode"
import { BasicTicker } from "./tickers/BasicTicker"
import { AbstractTicker } from "./tickers/AbstractTicker"

export class NodalBackground {
  container: Element
  width: number
  height: number
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D

  counter: number
  direction: boolean

  tPrevious: number
  tFps: number

  nodes: Array<AbstractNode>

  ticker: AbstractTicker

  constructor(container: Element) {
    this.container = container

    this.counter = 0
    this.direction = true

    this.nodes = []
    this.ticker = new BasicTicker()

    const fps = 1
    this.tFps = (1 / fps) * 1000
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

    for (let fori = 0; fori < 2; fori++) {
      this.nodes.push(new BasicNode(this.context, this.width, this.height, 100))
    }

    this.nodes[0].velocity = new Vector2(0, 20)
    this.nodes[1].velocity = new Vector2(20, 0)

    this.tPrevious = Date.now()

    requestAnimationFrame(this.handleAnimationFrame.bind(this))

    this.container.appendChild(this.canvas)
  }

  handleAnimationFrame() {
    requestAnimationFrame(this.handleAnimationFrame.bind(this))

    const now = Date.now()
    const tDelta = now - this.tPrevious

    if (tDelta > this.tFps) {
      this.tick(tDelta)
      this.render()

      this.tPrevious = now - (tDelta % this.tFps)
    }
  }

  render() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.nodes.forEach((node: AbstractNode) => {
      node.render()
    })
  }

  tick(time: number) {
    // this.tDelta = time - this.tPrevious
    // this.tPrevious = time

    for (let i = 0; i < this.nodes.length; i++) {
      const nodeA: AbstractNode = this.nodes[i]

      for (let j = 0; j < this.nodes.length; j++) {
        const nodeB: AbstractNode = this.nodes[j]

        this.ticker.tick(time, nodeA, nodeB)

        //
        // console.log("--------------------")
        // console.log(i, j)
        // console.log(nodeA.position)
        // console.log(nodeB.position)
      }
    }
  }
}
