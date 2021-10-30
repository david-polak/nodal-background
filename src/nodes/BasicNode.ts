import { AbstractNode } from "./AbstractNode"

export class BasicNode extends AbstractNode {
  render() {
    this.context.beginPath()
    this.context.arc(
      this.position.x,
      this.position.y,
      this.mass,
      0,
      2 * Math.PI
    )
    this.context.fill()
  }
}
