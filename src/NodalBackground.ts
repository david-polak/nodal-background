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
  mergeNodes: Array<Array<AbstractNode>> = []

  target_nodes: number

  factors: Array<Array<number | boolean>> = []

  fpsCounter: FPSCounter

  constructor(container: Element) {
    this.container = container

    this.counter = 0
    this.direction = true

    this.nodes = []
    // this.ticker = new BasicTicker(200)
    this.ticker = new EulerTicker(100)

    const target_fps = 50
    this.tFps = (1 / target_fps) * 1000
    this.max_velocity = 20
    this.drop_distance = 20
    this.target_nodes = 100
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

    this.fpsCounter = new FPSCounter(this.context, false)

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

    while (this.mergeNodes.length) {
      const toMerge: Array<AbstractNode> = this.mergeNodes.pop()
      const nodeA: AbstractNode = toMerge[0]
      const nodeB: AbstractNode = toMerge[1]
      if (nodeA.mass > nodeB.mass) {
        nodeA.mass += nodeB.mass
        nodeB.recreate(this.max_velocity)
      } else {
        nodeB.mass += nodeA.mass
        nodeA.recreate(this.max_velocity)
      }
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

      // resetting the mouse node's position
      this.mouse_handler.tick()

      // at this point positions have been updated and we can render
      node.render()
    }

    for (let i = 0; i < this.nodes.length; i++) {
      const nodeA: AbstractNode = this.nodes[i]

      for (let j = i + 1; j < this.nodes.length; j++) {
        let factor = this.factors[i][j]

        if (factor === true || factor === false) {
          this.mergeNodes.push([this.nodes[i], this.nodes[j]])
          factor = 1
        }

        if (factor > 0.01) {
          this.linker.renderLink(factor, this.nodes[i], this.nodes[j])
        }
      }

      if (
        nodeA.position.x < -this.drop_distance ||
        nodeA.position.y < -this.drop_distance ||
        nodeA.position.x > this.canvas.width + this.drop_distance ||
        nodeA.position.y > this.canvas.height + this.drop_distance
      ) {
        nodeA.recreate(this.max_velocity)
      }
    }
  }
}
