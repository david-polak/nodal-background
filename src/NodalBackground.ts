import { BasicNode } from "./nodes/BasicNode"
import { AbstractNode } from "./nodes/AbstractNode"
import { BasicTicker } from "./tickers/BasicTicker"
import { AbstractTicker } from "./tickers/AbstractTicker"
import { AbstractLinker } from "./linkers/AbstractLinker"
import { StandardLinker } from "./linkers/StandardLinker"
import Vector2 from "./Vector2"
import { MouseHandler } from "./MouseHandler"

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
  linker: AbstractLinker

  max_velocity: number
  drop_distance: number

  mouse_handler: MouseHandler

  newNodes: Array<AbstractNode> = []

  constructor(container: Element) {
    this.container = container

    this.counter = 0
    this.direction = true

    this.nodes = []
    this.ticker = new BasicTicker(200)
    // this.ticker = new EulerTicker()

    const fps = 30
    this.tFps = (1 / fps) * 1000
    this.max_velocity = 20
    this.drop_distance = 20
  }

  resize() {
    this.width = this.container.clientWidth * devicePixelRatio
    this.height = this.container.clientHeight * devicePixelRatio

    this.canvas.width = this.width
    this.canvas.height = this.height
  }

  start() {
    this.canvas = document.createElement("canvas")
    this.container.appendChild(this.canvas)
    this.context = this.canvas.getContext("2d")

    this.mouse_handler = new MouseHandler(this.canvas, this.addNode.bind(this))

    this.resize()

    this.linker = new StandardLinker(this.context)

    for (let fori = 0; fori < 50; fori++) {
      this.nodes.push(new BasicNode(this.canvas, this.max_velocity))
    }

    this.tPrevious = Date.now()

    requestAnimationFrame(this.handleAnimationFrame.bind(this))
  }

  handleAnimationFrame() {
    requestAnimationFrame(this.handleAnimationFrame.bind(this))

    const now = Date.now()
    const tDelta = now - this.tPrevious

    if (tDelta > this.tFps) {
      this.tick(tDelta)
      this.tPrevious = now - (tDelta % this.tFps)
    }
  }

  addNode(): AbstractNode {
    const node = new BasicNode(this.canvas, this.max_velocity)
    this.newNodes.push(node)
    return node
  }

  tick(time: number) {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

    while (this.newNodes.length) {
      this.nodes.push(this.newNodes.pop())
    }

    for (let i = 0; i < this.nodes.length; i++) {
      const nodeA: AbstractNode = this.nodes[i]

      nodeA.tick(time)

      this.ticker.tickSingle(time, nodeA)

      for (let j = i + 1; j < this.nodes.length; j++) {
        const nodeB: AbstractNode = this.nodes[j]
        const factor = this.ticker.tickBoth(time, nodeA, nodeB)

        if (factor > 0.01) {
          this.linker.renderLink(factor, nodeA, nodeB)
        }
      }
    }

    this.nodes.forEach((node: AbstractNode) => {
      node.render()

      if (
        node.position.x < -this.drop_distance ||
        node.position.y < -this.drop_distance ||
        node.position.x > this.canvas.width + this.drop_distance ||
        node.position.y > this.canvas.height + this.drop_distance
      ) {
        node.recreate(this.max_velocity)
      }
    })
  }
}
