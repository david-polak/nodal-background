import { BasicNode } from "./nodes/BasicNode"
import { AbstractNode } from "./nodes/AbstractNode"
import { BasicTicker } from "./tickers/BasicTicker"
import {
  AbstractTicker,
  InstantiableAbstractTicker,
} from "./tickers/AbstractTicker"
import { AbstractLinker } from "./linkers/AbstractLinker"
import { StandardLinker } from "./linkers/StandardLinker"
import Vector2 from "./Vector2"
import { MouseHandler } from "./MouseHandler"
import { EulerTicker } from "./tickers/EulerTicker"
import { FPSCounter } from "./FPSCounter"
import { AntiEulerTicker } from "./tickers/AntiEulerTicker"

export enum NodalBackgroundMode {
  Gravity = "Gravity",
  AntiGravity = "AntiGravity",
  Simple = "Simple",
}

export interface NodalBackgroundProps {
  container: Element

  mode?: NodalBackgroundMode
  numberOfNodes?: number
  preserveNumberOfNodes: boolean

  linkColor?: string
  nodeColor?: string

  ticker?: typeof AbstractTicker
}

export const defaultNodalBackgroundProps: NodalBackgroundProps = {
  container: null,

  mode: NodalBackgroundMode.Gravity,
  numberOfNodes: 100,
  preserveNumberOfNodes: true,

  linkColor: "#000000",
  nodeColor: "#000000",

  ticker: null,
}

export class NodalBackground {
  props: NodalBackgroundProps

  protected canvas: HTMLCanvasElement

  protected _resizeListener: any
  protected _alive: boolean

  protected _ticker: AbstractTicker

  protected _nodes: Array<AbstractNode> = []
  protected _nodesToAdd: Array<AbstractNode> = []
  protected _nodesToRemove: Array<AbstractNode> = []
  protected _nodesToMerge: Array<Array<AbstractNode>> = []

  width: number
  height: number
  context: CanvasRenderingContext2D

  counter: number
  direction: boolean

  tPrevious: number
  tFps: number

  linker: AbstractLinker

  max_velocity: number
  drop_distance: number

  mouse_handler: MouseHandler

  factors: Array<Array<number | boolean>> = []

  fpsCounter: FPSCounter

  constructor(props?: NodalBackgroundProps) {
    console.log(props)

    this.props = { ...defaultNodalBackgroundProps }
    this.props.container = props.container

    this.canvas = document.createElement("canvas")
    this.props.container.appendChild(this.canvas)
    this.context = this.canvas.getContext("2d")

    this._resizeListener = this.resize.bind(this)
    window.addEventListener("resize", this._resizeListener)
    this.resize()

    this.mode = props.mode ? props.mode : this.props.mode
    this.ticker = props.ticker ? props.ticker : this.props.ticker

    this.linker = new StandardLinker(this.context)
    this.linkColor = props.linkColor ? props.linkColor : this.props.linkColor

    this.nodeColor = props.nodeColor ? props.nodeColor : this.props.nodeColor
    this.numberOfNodes = props.numberOfNodes
      ? props.numberOfNodes
      : this.props.numberOfNodes

    this.counter = 0
    this.direction = true

    const target_fps = 50
    this.tFps = (1 / target_fps) * 1000
    this.max_velocity = 20
    this.drop_distance = 0
    this.mouse_handler = new MouseHandler(this.canvas, this.addNode.bind(this))
    this.fpsCounter = new FPSCounter(this.context, false)

    this.tPrevious = Date.now()
    this._alive = true
    requestAnimationFrame(this.handleAnimationFrame.bind(this))
  }

  set linkColor(linkColor: string) {
    this.props.linkColor = linkColor
    this.linker.linkColor = linkColor
  }

  set nodeColor(nodeColor: string) {
    this.props.nodeColor = nodeColor
    this._nodes.forEach((node) => (node.nodeColor = nodeColor))
  }

  set ticker(ticker: typeof AbstractTicker) {
    if (!ticker) {
      return
    }
    this.props.ticker = ticker
    const instantiable = ticker as InstantiableAbstractTicker<AbstractTicker>
    this._ticker = new instantiable(150)
  }

  set mode(mode: NodalBackgroundMode) {
    this.props.mode = mode

    if (mode === NodalBackgroundMode.Gravity) {
      this._ticker = new EulerTicker(150)
    } else if (mode === NodalBackgroundMode.AntiGravity) {
      this._ticker = new AntiEulerTicker(150)
    } else if (mode === NodalBackgroundMode.Simple) {
      this._ticker = new BasicTicker(150)
    } else {
      this._ticker = new EulerTicker(150)
    }
  }

  set numberOfNodes(numberOfNodes: number) {
    this.props.numberOfNodes = numberOfNodes
    while (numberOfNodes > this._nodes.length + this._nodesToAdd.length) {
      this.addNode()
    }
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
    node.nodeColor = this.props.nodeColor
    this._nodesToAdd.push(node)
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

    while (this._nodesToRemove.length) {
      const node = this._nodesToRemove.pop()
      const index = this._nodes.findIndex((n) => n === node)
      this._nodes.splice(index, 1)
      console.log("removed node", index, this._nodes.length)
    }

    while (this._nodesToAdd.length) {
      this._nodes.push(this._nodesToAdd.pop())
      this.factors.push([])
    }

    for (let i = 0; i < this._nodes.length; i++) {
      for (let j = i + 1; j < this._nodes.length; j++) {
        // simulation step for both nodes
        this.factors[i][j] = this._ticker.tickBoth(
          time,
          this._nodes[i],
          this._nodes[j]
        )
      }
    }

    for (let i = 0; i < this._nodes.length; i++) {
      const node: AbstractNode = this._nodes[i]

      // simulation step for single node
      this._ticker.tickSingle(time, node)

      // resetting the mouse node's position
      this.mouse_handler.tick()
    }

    for (let i = 0; i < this._nodes.length; i++) {
      for (let j = i + 1; j < this._nodes.length; j++) {
        let factor = this.factors[i][j]

        if (factor === true || factor === false) {
          this._nodesToMerge.push([this._nodes[i], this._nodes[j]])
          factor = 0
        }

        if (factor > 0.01) {
          this.linker.renderLink(factor, this._nodes[i], this._nodes[j])
        }
      }
    }

    while (this._nodesToMerge.length) {
      const toMerge: Array<AbstractNode> = this._nodesToMerge.pop()
      const nodeA: AbstractNode = toMerge[0]
      const nodeB: AbstractNode = toMerge[1]
      if (nodeA.mass > nodeB.mass) {
        this.mergeNodes(nodeA, nodeB)
      } else {
        this.mergeNodes(nodeB, nodeA)
      }
    }

    for (let i = 0; i < this._nodes.length; i++) {
      const nodeA: AbstractNode = this._nodes[i]

      nodeA.render()

      if (
        nodeA.position.x < -this.drop_distance ||
        nodeA.position.y < -this.drop_distance ||
        nodeA.position.x > this.canvas.width + this.drop_distance ||
        nodeA.position.y > this.canvas.height + this.drop_distance
      ) {
        if (nodeA.age < 0) {
          if (!this.props.preserveNumberOfNodes) {
            nodeA.recreate(this.max_velocity)
            continue
          }

          if (
            this._nodes.length + this._nodesToRemove.length >
            this.props.numberOfNodes
          ) {
            this._nodesToRemove.push(nodeA)
          } else {
            nodeA.recreate(this.max_velocity)
          }
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
