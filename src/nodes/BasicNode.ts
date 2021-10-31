import { AbstractNode } from "./AbstractNode"

export class BasicNode extends AbstractNode {
  render() {
    this._context.beginPath()

    this._context.fillStyle = `rgba(${this._nodeColor.red},${
      this._nodeColor.green
    },${this._nodeColor.blue},${this.age < 1 ? this.age : 1})`

    this._context.arc(
      this.position.x,
      this.position.y,
      Math.sqrt(this.mass / Math.PI) + 0.5,
      0,
      2 * Math.PI
    )
    this._context.fill()
  }
}
