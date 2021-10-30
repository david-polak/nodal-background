import { AbstractNode } from "./AbstractNode"

export class BasicNode extends AbstractNode {
  render() {
    this.context.beginPath()

    this.context.fillStyle = `rgba(1,1,1,${this.age < 1 ? this.age : 1})`

    this.context.arc(
      this.position.x,
      this.position.y,
      Math.sqrt(this.mass / Math.PI) + 0.5,
      0,
      2 * Math.PI
    )
    this.context.fill()
  }
}
