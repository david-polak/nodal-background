import { BasicNode } from "./nodes/BasicNode"
import { AbstractNode } from "./nodes/AbstractNode"
import { BasicTicker } from "./tickers/BasicTicker"
import {
  AbstractTicker,
  InstantiableAbstractTicker,
} from "./tickers/AbstractTicker"
import {
  AbstractLinker,
  InstantiableAbstractLinker,
} from "./linkers/AbstractLinker"
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
  linkDash: Array<number>

  nodeColor?: string
  nodeMaxInitialVelocity: number
  nodeInitialMass: number
  nodeAgeFactor: number
  nodeDeAgeFactor: number
  nodeVisualSize: number

  fps?: number
  fpsCounter?: boolean

  ticker?: typeof AbstractTicker
  linker?: typeof AbstractLinker
}

export const defaultNodalBackgroundProps: NodalBackgroundProps = {
  container: null,

  mode: NodalBackgroundMode.Gravity,
  numberOfNodes: 100,
  preserveNumberOfNodes: true,

  linkColor: "#000000",
  linkDash: [],

  nodeColor: "#000000",
  nodeMaxInitialVelocity: 20,
  nodeInitialMass: 1.5,
  nodeAgeFactor: 0.5,
  nodeDeAgeFactor: 2,
  nodeVisualSize: 0.5,

  fps: 30,
  fpsCounter: false,
  ticker: null,
  linker: null,
}

export class NodalBackground {
  public props: NodalBackgroundProps

  public canvas: HTMLCanvasElement
  protected _context: CanvasRenderingContext2D

  protected _resizeListener: any
  protected _alive: boolean

  protected _ticker: AbstractTicker
  protected _linker: AbstractLinker
  protected _fpsCounter: FPSCounter
  protected _mouseHandler: MouseHandler

  protected _tFps: number
  protected _tPrevious: number

  protected _nodes: Array<AbstractNode> = []
  protected _nodesToAdd: Array<AbstractNode> = []
  protected _nodesToRemove: Array<AbstractNode> = []
  protected _nodesToMerge: Array<Array<AbstractNode>> = []
  protected _adjustedNumberOfNodes: number

  drop_distance: number

  factors: Array<Array<number | boolean>> = []

  constructor(props?: NodalBackgroundProps) {
    console.log(props)

    this.props = { ...defaultNodalBackgroundProps }

    this.props.container = props.container
    this.canvas = document.createElement("canvas")
    this.props.container.appendChild(this.canvas)

    this._context = this.canvas.getContext("2d")

    this._resizeListener = this.resize.bind(this)
    window.addEventListener("resize", this._resizeListener)

    this.nodeColor = props.nodeColor ? props.nodeColor : this.props.nodeColor
    this.nodeMaxInitialVelocity = props.nodeMaxInitialVelocity
      ? props.nodeMaxInitialVelocity
      : this.props.nodeMaxInitialVelocity
    this.nodeInitialMass = props.nodeInitialMass
      ? props.nodeInitialMass
      : this.props.nodeInitialMass
    this.nodeAgeFactor = props.nodeAgeFactor
      ? props.nodeAgeFactor
      : this.props.nodeAgeFactor
    this.nodeDeAgeFactor = props.nodeDeAgeFactor
      ? props.nodeDeAgeFactor
      : this.props.nodeDeAgeFactor
    this.nodeVisualSize = props.nodeVisualSize
      ? props.nodeVisualSize
      : this.props.nodeVisualSize

    this.resize()

    this.mode = props.mode ? props.mode : this.props.mode
    this.ticker = props.ticker ? props.ticker : this.props.ticker

    this.linker = props.linker ? props.linker : this.props.linker
    this.linkColor = props.linkColor ? props.linkColor : this.props.linkColor
    this.linkDash = props.linkDash ? props.linkDash : this.props.linkDash

    this.numberOfNodes = props.numberOfNodes
      ? props.numberOfNodes
      : this.props.numberOfNodes
    this.preserveNumberOfNodes = props.preserveNumberOfNodes
      ? props.preserveNumberOfNodes
      : this.preserveNumberOfNodes

    this.fps = props.fps ? props.fps : this.props.fps
    this.fpsCounter = props.fpsCounter
      ? props.fpsCounter
      : this.props.fpsCounter

    this.drop_distance = 0
    this._mouseHandler = new MouseHandler(this.canvas, this.addNode.bind(this))

    this._tPrevious = Date.now()
    this._alive = true
    requestAnimationFrame(this.handleAnimationFrame.bind(this))
  }

  set linkColor(linkColor: string) {
    this.props.linkColor = linkColor
    this._linker.linkColor = linkColor
  }

  set nodeColor(nodeColor: string) {
    this.props.nodeColor = nodeColor
    this._nodes.forEach((node) => (node.nodeColor = nodeColor))
  }

  set nodeMaxInitialVelocity(nodeMaxInitialVelocity: number) {
    this.props.nodeMaxInitialVelocity = nodeMaxInitialVelocity
  }

  set nodeInitialMass(nodeInitialMass: number) {
    this.props.nodeInitialMass = nodeInitialMass
  }

  set nodeAgeFactor(nodeAgeFactor: number) {
    this.props.nodeAgeFactor = nodeAgeFactor
    this._nodes.forEach((node) => (node.ageFactor = nodeAgeFactor))
  }

  set nodeDeAgeFactor(nodeDeAgeFactor: number) {
    this.props.nodeDeAgeFactor = nodeDeAgeFactor
    this._nodes.forEach((node) => (node.deAgeFactor = nodeDeAgeFactor))
  }

  set nodeVisualSize(nodeVisualSize: number) {
    this.props.nodeVisualSize = nodeVisualSize
    this._nodes.forEach((node) => (node.visualSize = nodeVisualSize))
  }

  set ticker(ticker: typeof AbstractTicker) {
    if (!ticker) {
      return
    }
    this.props.ticker = ticker
    const instantiable = ticker as InstantiableAbstractTicker<AbstractTicker>
    this._ticker = new instantiable(150)
  }

  set linker(linker: typeof AbstractLinker) {
    if (!linker) {
      this._linker = new StandardLinker(this._context)
      return
    }
    this.props.linker = linker
    const instantiable = linker as InstantiableAbstractLinker<AbstractLinker>
    this._linker = new instantiable(this._context)
  }

  set linkDash(linkDash: Array<number>) {
    this.props.linkDash = linkDash
    this._linker.linkDash = linkDash
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

    const pixels = this.canvas.width * this.canvas.height
    const pixelTarget = 1200 * 1200
    this._adjustedNumberOfNodes = (pixels / pixelTarget) * numberOfNodes

    while (
      this._adjustedNumberOfNodes >
      this._nodes.length + this._nodesToAdd.length
    ) {
      this.addNode()
    }
  }

  set fps(fps: number) {
    this.props.fps = fps
    this._tFps = (1 / fps) * 1000
  }

  set fpsCounter(fpsCounter: boolean) {
    this.props.fpsCounter = fpsCounter
    this._fpsCounter = new FPSCounter(this._context, fpsCounter)
  }

  set preserveNumberOfNodes(preserveNumberOfNodes: boolean) {
    this.props.preserveNumberOfNodes = preserveNumberOfNodes
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
    this.canvas.width = this.props.container.clientWidth * devicePixelRatio
    this.canvas.height = this.props.container.clientHeight * devicePixelRatio

    // recalculate the _adjustedNumberOfNodes
    this.numberOfNodes = this.props.numberOfNodes
  }

  handleAnimationFrame() {
    if (!this._alive) {
      this.destroy()
      return
    }

    const now = Date.now()
    const tDelta = now - this._tPrevious

    if (tDelta > this._tFps) {
      this.tick(tDelta)
      this._tPrevious = now - (tDelta % this._tFps)
    }

    requestAnimationFrame(this.handleAnimationFrame.bind(this))
  }

  addNode(): AbstractNode {
    const node = new BasicNode(
      this.canvas,
      this.props.nodeMaxInitialVelocity,
      this.props.nodeInitialMass
    )
    node.nodeColor = this.props.nodeColor
    node.visualSize = this.props.nodeVisualSize
    node.ageFactor = this.props.nodeAgeFactor
    node.deAgeFactor = this.props.nodeDeAgeFactor
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

    nodeB.recreate(
      this.props.nodeMaxInitialVelocity,
      this.props.nodeInitialMass
    )
  }

  tick(time: number) {
    /*
     * This tick method should come out to O(nlogn), there are alternative
     * paths which would sacrifice rendering precision at lower fps for less
     * operations per tick.
     */

    this._context.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this._fpsCounter.draw(time)

    while (this._nodesToRemove.length) {
      const node = this._nodesToRemove.pop()
      const index = this._nodes.findIndex((n) => n === node)
      this._nodes.splice(index, 1)
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
      this._mouseHandler.tick()
    }

    for (let i = 0; i < this._nodes.length; i++) {
      for (let j = i + 1; j < this._nodes.length; j++) {
        let factor = this.factors[i][j]

        if (factor === true || factor === false) {
          this._nodesToMerge.push([this._nodes[i], this._nodes[j]])
          factor = 0
        }

        if (factor > 0.01) {
          this._linker.renderLink(factor, this._nodes[i], this._nodes[j])
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
            nodeA.recreate(
              this.props.nodeMaxInitialVelocity,
              this.props.nodeInitialMass
            )
            continue
          }

          if (
            this._nodes.length + this._nodesToRemove.length >
            this._adjustedNumberOfNodes
          ) {
            this._nodesToRemove.push(nodeA)
          } else {
            nodeA.recreate(
              this.props.nodeMaxInitialVelocity,
              this.props.nodeInitialMass
            )
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
