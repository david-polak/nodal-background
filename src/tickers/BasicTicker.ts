import { AbstractNode } from "../nodes/AbstractNode"
import { AbstractTicker } from "./AbstractTicker"

export class BasicTicker extends AbstractTicker {
  tickSingle(tDelta: number, node: AbstractNode): void {
    node.position.add(node.velocity.clone().multiplyByFactor(tDelta / 1000))
  }

  tickBoth(tDelta: number, nodeA: AbstractNode, nodeB: AbstractNode): number {
    let factor =
      (nodeA.position.distance(nodeB.position) - this.max_distance) /
      (0 - this.max_distance)

    if (nodeA.age < 1) {
      factor = factor * nodeA.age
    }
    if (nodeB.age < 1) {
      factor = factor * nodeB.age
    }

    return factor
  }
}
