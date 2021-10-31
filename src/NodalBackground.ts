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
import { AntiEulerTicker } from "./tickers/AntiEulerTicker"

export interface NodalBackgroundProps {
  container: Element

  linkColor?: string
}

export const defaultNodalBackgroundProps: NodalBackgroundProps = {
  container: null,

  linkColor: "#000000",
}

export class NodalBackground {
  props: NodalBackgroundProps

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
  toMerge: Array<Array<AbstractNode>> = []

  target_nodes: number

  factors: Array<Array<number | boolean>> = []

  fpsCounter: FPSCounter

  protected _resizeListener: any
  protected _alive: boolean

  constructor(props?: NodalBackgroundProps) {
    this.props = { ...defaultNodalBackgroundProps, ...props }

    this.counter = 0
    this.direction = true

    this.nodes = []
    // this.ticker = new BasicTicker(200)
    this.ticker = new EulerTicker(150)
    this.ticker = new AntiEulerTicker(150)

    const target_fps = 50
    this.tFps = (1 / target_fps) * 1000
    this.max_velocity = 20
    this.drop_distance = 0
    this.target_nodes = 100

    this.canvas = document.createElement("canvas")
    this.props.container.appendChild(this.canvas)
    this.context = this.canvas.getContext("2d")

    this.mouse_handler = new MouseHandler(this.canvas, this.addNode.bind(this))

    this.fpsCounter = new FPSCounter(this.context, false)

    this.resize()

    // this._resizeListener = this.resize.bind(this)
    window.addEventListener("resize", this._resizeListener)

    this.linker = new StandardLinker(this.context)
    this.linker.linkColor = this.props.linkColor

    for (let fori = 0; fori < this.target_nodes; fori++) {
      this.addNode()
    }

    this.tPrevious = Date.now()

    this._alive = true

    requestAnimationFrame(this.handleAnimationFrame.bind(this))
  }

  set linkColor(linkColor: string) {
    this.linker.linkColor = linkColor
  }

  destroy() {
    if (!this._alive) {
      this._alive = false
      return
    }
    // The rest of this method will execute in the next animation frame.

    window.removeEventListener("resize", this._resizeListener)
    this.canvas.remove()
    console.log("TODO: FINISH CLEANUP!")
  }

  protected resize() {
    console.log("resize")
    this.width = this.props.container.clientWidth * devicePixelRatio
    this.height = this.props.container.clientHeight * devicePixelRatio

    this.canvas.width = this.width
    this.canvas.height = this.height
  }

  handleAnimationFrame() {
    if (!this._alive) {
      this.destroy()
      return
    }

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

  mergeNodes(nodeA: AbstractNode, nodeB: AbstractNode) {
    // conservation of momentum
    nodeA.velocity.x =
      (nodeA.mass * nodeA.velocity.x + nodeB.mass * nodeB.velocity.x) /
      (nodeA.mass + nodeB.mass)
    nodeA.velocity.y =
      (nodeA.mass * nodeA.velocity.y + nodeB.mass * nodeB.velocity.y) /
      (nodeA.mass + nodeB.mass)
    nodeA.mass += nodeB.mass

    nodeB.recreate(this.max_velocity)
  }

  tick(time: number) {
    /*
     * This tick method should come out to O(nlogn), there are alternative
     * paths which would sacrifice rendering precision at lower fps for less
     * operations per tick.
     */

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.fpsCounter.draw(time)

    while (this.newNodes.length) {
      this.nodes.push(this.newNodes.pop())
      this.factors.push([])
    }

    for (let i = 0; i < this.nodes.length; i++) {
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
    }

    for (let i = 0; i < this.nodes.length; i++) {
      const nodeA: AbstractNode = this.nodes[i]

      for (let j = i + 1; j < this.nodes.length; j++) {
        let factor = this.factors[i][j]

        if (factor === true || factor === false) {
          this.toMerge.push([this.nodes[i], this.nodes[j]])
          factor = 0
        }

        if (factor > 0.01) {
          this.linker.renderLink(factor, this.nodes[i], this.nodes[j])
        }
      }
    }

    while (this.toMerge.length) {
      const toMerge: Array<AbstractNode> = this.toMerge.pop()
      const nodeA: AbstractNode = toMerge[0]
      const nodeB: AbstractNode = toMerge[1]
      if (nodeA.mass > nodeB.mass) {
        this.mergeNodes(nodeA, nodeB)
      } else {
        this.mergeNodes(nodeB, nodeA)
      }
    }

    for (let i = 0; i < this.nodes.length; i++) {
      const nodeA: AbstractNode = this.nodes[i]

      nodeA.render()

      if (
        nodeA.position.x < -this.drop_distance ||
        nodeA.position.y < -this.drop_distance ||
        nodeA.position.x > this.canvas.width + this.drop_distance ||
        nodeA.position.y > this.canvas.height + this.drop_distance
      ) {
        if (nodeA.age < 0) {
          nodeA.recreate(this.max_velocity)
        } else if (nodeA.age > 1) {
          nodeA.age = 1
        } else {
          nodeA.deAgeNode(time)
        }
      } else {
        nodeA.ageNode(time)
      }
    }
  }
}
