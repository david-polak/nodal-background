import { AbstractNode } from "../nodes/AbstractNode"
import { AbstractTicker } from "./AbstractTicker"

export class EulerTicker extends AbstractTicker {
  /* This class originally relied on Vector2 operations, however profiling
  showed that any function calls or object creation in here is expensive. */

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

    if (distance < 10) {
      if (distance < 10) {
        return true
      }
      return 1
    }
    if (distance > 100) {
      return 0
    }

    const scalar = Math.pow(distance, -3) * attraction * tDelta

    const accelerationX = (nodeA.position.x - nodeB.position.x) * scalar
    const accelerationY = (nodeA.position.y - nodeB.position.y) * scalar

    const forceAx = -(accelerationX * nodeA.mass)
    const forceAy = -(accelerationY * nodeA.mass)

    const forceBx = accelerationX * nodeB.mass
    const forceBy = accelerationY * nodeB.mass

    nodeA.velocity.x += forceAx
    nodeA.velocity.y += forceAy
    nodeB.velocity.x += forceBx
    nodeB.velocity.y += forceBy

    return Math.sqrt(forceAx * forceAx + forceAy * forceAy) * 1.5
  }
}
