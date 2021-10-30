import { BasicNode } from "./nodes/BasicNode"
import Vector2 from "./Vector2"
import { AbstractNode } from "./nodes/AbstractNode"
import { BasicTicker } from "./tickers/BasicTicker"
import { AbstractTicker } from "./tickers/AbstractTicker"
import { AbstractLinker } from "./linkers/AbstractLinker"
import { StandardLinker } from "./linkers/StandardLinker"

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

    this.linker = new StandardLinker(this.context)

    // for (let fori = 0; fori < 2; fori++) {
    //   this.nodes.push(new BasicNode(this.context, this.width, this.height, 100))
    // }
    // this.nodes[0].velocity = new Vector2(0, 20)
    // this.nodes[1].velocity = new Vector2(20, 0)

    for (let fori = 0; fori < 50; fori++) {
      this.nodes.push(
        new BasicNode(this.context, this.width, this.height, this.max_velocity)
      )
    }

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
      this.tPrevious = now - (tDelta % this.tFps)
    }
  }

  tick(time: number) {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

    for (let i = 0; i < this.nodes.length; i++) {
      const nodeA: AbstractNode = this.nodes[i]

      nodeA.tick(time)

      this.ticker.tickSingle(time, nodeA)

      for (let j = i + 1; j < this.nodes.length; j++) {
        const nodeB: AbstractNode = this.nodes[j]
        let factor = this.ticker.tickBoth(time, nodeA, nodeB)

        if (nodeA.age < 1) {
          factor = factor * nodeA.age
        }
        if (nodeB.age < 1) {
          factor = factor * nodeB.age
        }

        if (factor > 0.01) {
          this.linker.renderLink(factor, nodeA, nodeB)
        }
      }
    }

    this.nodes.forEach((node: AbstractNode) => {
      node.render()

      if (
        node.position.x > this.canvas.width + 10 ||
        node.position.y > this.canvas.height + 10 ||
        node.position.x < -10 ||
        node.position.y < -10
      ) {
        node.recreate(
          this.canvas.width,
          this.canvas.height,
          this.max_velocity,
          0
        )
      }
    })

    // console.log("--------------------")
    // console.log(i, j)
    // console.log(nodeA.position)
    // console.log(nodeB.position)
  }
}
