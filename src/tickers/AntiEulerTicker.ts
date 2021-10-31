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

    const attraction = 10
    const massFactor = 1

    if (distance < Math.sqrt((nodeA.mass + nodeB.mass) / Math.PI)) {
      return true
    }

    if (distance < 1) {
      return (nodeA.age < 1 ? nodeA.age : 1) * (nodeB.age < 1 ? nodeB.age : 1)
    }

    if (distance > this.maxDistance) {
      return 0
    }

    const scalar = Math.pow(distance, -3) * attraction * tDelta

    const accelerationX = (nodeA.position.x - nodeB.position.x) * scalar
    const accelerationY = (nodeA.position.y - nodeB.position.y) * scalar

    const forceAx = accelerationX * nodeB.mass * massFactor
    const forceAy = accelerationY * nodeB.mass * massFactor
    const forceBx = -(accelerationX * nodeA.mass * massFactor)
    const forceBy = -(accelerationY * nodeA.mass * massFactor)

    nodeA.velocity.x += forceAx
    nodeA.velocity.y += forceAy
    nodeB.velocity.x += forceBx
    nodeB.velocity.y += forceBy

    return (
      ((distance - this.maxDistance) / (0 - this.maxDistance)) *
      (nodeA.age < 1 ? nodeA.age : 1) *
      (nodeB.age < 1 ? nodeB.age : 1)
    )
  }
}
