import { AbstractNode } from "../nodes/AbstractNode"
import { AbstractTicker } from "./AbstractTicker"

export class BasicTicker extends AbstractTicker {
  tickSingle(tDelta: number, node: AbstractNode): void {
    const scalar = tDelta / 1000
    node.position.x = node.position.x + node.velocity.x * scalar
    node.position.y = node.position.y + node.velocity.y * scalar
  }

  tickBoth(
    tDelta: number,
    nodeA: AbstractNode,
    nodeB: AbstractNode
  ): number | boolean {
    const distanceX = nodeA.position.x - nodeB.position.x
    const distanceY = nodeA.position.y - nodeB.position.y
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)

    if (distance < 10) {
      return (nodeA.age < 1 ? nodeA.age : 1) * (nodeB.age < 1 ? nodeB.age : 1)
    }

    if (distance > this._maxDistance) {
      return 0
    }

    return (
      ((distance - this._maxDistance) / (0 - this._maxDistance)) *
      (nodeA.age < 1 ? nodeA.age : 1) *
      (nodeB.age < 1 ? nodeB.age : 1)
    )
  }
}
