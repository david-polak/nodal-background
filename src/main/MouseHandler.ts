import Vector2 from "../utils/Vector2"
import { AbstractNode } from "../nodes/AbstractNode"

export class MouseHandler {
  canvas: HTMLCanvasElement
  addNode: CallableFunction

  active: boolean
  node: AbstractNode

  position: Vector2
  velocity: Vector2

  constructor(canvas: HTMLCanvasElement, addNode: CallableFunction) {
    this.canvas = canvas
    this.addNode = addNode

    this.active = false

    this.canvas.addEventListener("mousedown", this.onMouseDown.bind(this))
    this.canvas.addEventListener("mouseup", this.onMouseUp.bind(this))
    this.canvas.addEventListener("mousemove", this.onMouseMove.bind(this))
    this.canvas.addEventListener("wheel", this.onWheel.bind(this))
  }

  onMouseDown(event: MouseEvent) {
    const rect = this.canvas.getBoundingClientRect()
    this.position = new Vector2(
      ((event.clientX - rect.left) / (rect.right - rect.left)) *
        this.canvas.width,
      ((event.clientY - rect.top) / (rect.bottom - rect.top)) *
        this.canvas.height
    )

    this.node = this.addNode()
    this.velocity = this.node.velocity

    this.node.position = this.position
    this.node.velocity = new Vector2(0, 0)

    this.active = true

    this.tick = () => {
      this.node.position = this.position.clone()
    }
  }

  onMouseMove(event: MouseEvent) {
    if (!this.active) {
      return
    }
    const rect = this.canvas.getBoundingClientRect()
    this.node.position = new Vector2(
      ((event.clientX - rect.left) / (rect.right - rect.left)) *
        this.canvas.width,
      ((event.clientY - rect.top) / (rect.bottom - rect.top)) *
        this.canvas.height
    )
    this.position = this.node.position
  }

  onWheel(event: WheelEvent) {
    if (!this.active) {
      return
    }
    event.preventDefault()
    this.node.mass = this.node.mass + (event.deltaY > 0 ? -5 : 5)
  }

  onMouseUp() {
    if (!this.active) {
      return
    }
    this.node.velocity = this.velocity
    this.active = false

    // eslint-disable-next-line
    this.tick = () => {}
  }

  // eslint-disable-next-line
  tick() {}
}
