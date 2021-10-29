import Vector2 from "../Vector2"
import getRandomArbitrary from "../utils/getRandomArbitrary"
import { AbstractNode } from "./AbstractNode"

export class BasicNode extends AbstractNode {
  render() {
    this.ctx.beginPath()
    this.ctx.arc(this.position.x, this.position.y, 2, 0, 2 * Math.PI)
    this.ctx.fill()
  }
}
