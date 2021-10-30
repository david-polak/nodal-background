import { BasicNode } from "./nodes/BasicNode"
import { AbstractNode } from "./nodes/AbstractNode"
import { BasicTicker } from "./tickers/BasicTicker"
import { AbstractTicker } from "./tickers/AbstractTicker"
import { AbstractLinker } from "./linkers/AbstractLinker"
import { StandardLinker } from "./linkers/StandardLinker"
import Vector2 from "./Vector2"
import { MouseHandler } from "./MouseHandler"
import { EulerTicker } from "./tickers/EulerTicker"
import { FPSCounter } from "./FPSCounter"

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

  target_nodes: number

  factors: Array<Array<number>> = []

  fpsCounter: FPSCounter

  constructor(container: Element) {
    this.container = container

    this.counter = 0
    this.direction = true

    this.nodes = []
    this.ticker = new BasicTicker(200)
    // this.ticker = new EulerTicker(200)

    const target_fps = 10
    this.tFps = (1 / target_fps) * 1000
    this.max_velocity = 20
    this.drop_distance = 20
    this.target_nodes = 2
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

    this.fpsCounter = new FPSCounter(this.context, true)

    this.resize()

    this.linker = new StandardLinker(this.context)

    for (let fori = 0; fori < this.target_nodes; fori++) {
      this.addNode()
    }

    this.tPrevious = Date.now()

    requestAnimationFrame(this.handleAnimationFrame.bind(this))
  }

  handleAnimationFrame() {
    const now = Date.now()
    const tDelta = now - this.tPrevious

    if (tDelta > this.tFps) {
      this.tick(tDelta)
      this.tPrevious = now - (tDelta % this.tFps)
    }

    requestAnimationFrame(this.handleAnimationFrame.bind(this))
  }

  addNode(): AbstractNode {
    const node = new BasicNode(this.canvas, this.max_velocity)
    this.newNodes.push(node)
    return node
  }

  tick(time: number) {
    /* This tick method should come out to O(nlogn), there are alternative
    paths which would sacrifice rendering precision at lower fps for less
    operations per tick. TODO: Performance Testing */

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.fpsCounter.draw(time)

    while (this.newNodes.length) {
      this.nodes.push(this.newNodes.pop())
      this.factors.push([])
    }

    for (let i = 0; i < this.nodes.length; i++) {
      // ageing up the node
      this.nodes[i].tick(time)

      for (let j = i + 1; j < this.nodes.length; j++) {
        // simulation step for both nodes
        this.factors[i][j] = this.ticker.tickBoth(
          time,
          this.nodes[i],
          this.nodes[j]
        )
      }
    }

    for (let i = 0; i < this.nodes.length; i++) {
      const node: AbstractNode = this.nodes[i]

      // simulation step for single node
      this.ticker.tickSingle(time, node)

      // at this point positions have been updated and we can render
      node.render()

      if (
        node.position.x < -this.drop_distance ||
        node.position.y < -this.drop_distance ||
        node.position.x > this.canvas.width + this.drop_distance ||
        node.position.y > this.canvas.height + this.drop_distance
      ) {
        node.recreate(this.max_velocity)
      }
    }

    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = i + 1; j < this.nodes.length; j++) {
        const factor = this.factors[i][j]
        if (factor > 0.01) {
          this.linker.renderLink(factor, this.nodes[i], this.nodes[j])
        }
      }
    }
  }
}
