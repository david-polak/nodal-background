import { AbstractNode } from "../nodes/AbstractNode"
import { AbstractTicker } from "./AbstractTicker"

export class AntiEulerTicker extends AbstractTicker {
  /* This class originally relied on Vector2 operations, however profiling
   * showed that any function calls or object creation in here is expensive.
   */

  tickSingle(tDelta: number, node: AbstractNode) {
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

    if (
      distance <
      Math.sqrt((nodeA.mass + nodeB.mass) / Math.PI) + nodeA._visualSize * 1.5
    ) {
      return true
    }

    if (distance < this._minDistance) {
      return (nodeA.age < 1 ? nodeA.age : 1) * (nodeB.age < 1 ? nodeB.age : 1)
    }

    if (distance > this._maxDistance) {
      return 0
    }

    const scalar = Math.pow(distance, -3) * this._attraction * tDelta

    const accelerationX = (nodeA.position.x - nodeB.position.x) * scalar
    const accelerationY = (nodeA.position.y - nodeB.position.y) * scalar

    const forceAx = accelerationX * nodeB.mass * this._massFactor
    const forceAy = accelerationY * nodeB.mass * this._massFactor
    const forceBx = -(accelerationX * nodeA.mass * this._massFactor)
    const forceBy = -(accelerationY * nodeA.mass * this._massFactor)

    nodeA.velocity.x += forceAx
    nodeA.velocity.y += forceAy
    nodeB.velocity.x += forceBx
    nodeB.velocity.y += forceBy

    return (
      ((distance - this._maxDistance) / (0 - this._maxDistance)) *
      (nodeA.age < 1 ? nodeA.age : 1) *
      (nodeB.age < 1 ? nodeB.age : 1)
    )
  }
}
