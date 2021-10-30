import { AbstractNode } from "../nodes/AbstractNode"
import { AbstractTicker } from "./AbstractTicker"

export class EulerTicker extends AbstractTicker {
  tickSingle(tDelta: number, node: AbstractNode) {
    node.position.add(node.velocity.clone().multiplyByScalar(tDelta / 1000))
  }

  tickBoth(tDelta: number, nodeA: AbstractNode, nodeB: AbstractNode) {
    const distance = nodeA.position.distance(nodeB.position)

    const attraction = 10

    if (distance > 10) {
      const scalar = Math.pow(distance, -3) * attraction * tDelta

      const difference = nodeA.position.clone().subtract(nodeB.position)
      const acceleration = difference.multiplyByScalar(scalar)

      const forceA = acceleration.clone().multiplyByScalar(nodeA.mass).negate()
      const forceB = acceleration.multiplyByScalar(nodeB.mass)

      nodeA.velocity.add(forceA)
      nodeB.velocity.add(forceB)

      return forceA.magnitude() * 1.5
    }

    return 0
  }
}
