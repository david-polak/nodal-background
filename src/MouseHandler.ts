import Vector2 from "./Vector2"
import { AbstractNode } from "./nodes/AbstractNode"

export class MouseHandler {
  canvas: HTMLCanvasElement
  addNode: CallableFunction
  createNode: any

  active: boolean
  node: AbstractNode

  velocity: Vector2

  constructor(canvas: HTMLCanvasElement, addNode: CallableFunction) {
    this.canvas = canvas
    this.addNode = addNode

    this.active = false

    this.canvas.addEventListener("mousedown", this.onMouseDown.bind(this))
    this.canvas.addEventListener("mouseup", this.onMouseUp.bind(this))
    this.canvas.addEventListener("mousemove", this.onMouseMove.bind(this))
  }

  onMouseDown(event: MouseEvent) {
    const rect = this.canvas.getBoundingClientRect()
    const position = new Vector2(
      event.clientX * devicePixelRatio - rect.left,
      event.clientY * devicePixelRatio - rect.top
    )

    this.node = this.addNode()
    this.velocity = this.node.velocity

    this.node.position = position
    this.node.velocity = new Vector2(0, 0)

    this.active = true
  }

  onMouseMove(event: MouseEvent) {
    if (!this.active) {
      return
    }
    const rect = this.canvas.getBoundingClientRect()
    this.node.position = new Vector2(
      event.clientX * devicePixelRatio - rect.left,
      event.clientY * devicePixelRatio - rect.top
    )
  }

  onMouseUp() {
    if (!this.active) {
      return
    }
    this.node.velocity = this.velocity
    this.active = false
  }
}