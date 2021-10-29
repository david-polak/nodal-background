import { AbstractNode } from "../nodes/AbstractNode"
import { AbstractTicker } from "./AbstractTicker"

export class BasicTicker extends AbstractTicker {
  tickSingle(tDelta: number, node: AbstractNode): void {
    node.position.add(node.velocity.clone().multiplyByFactor(tDelta / 1000))
  }

  tickBoth(tDelta: number, nodeA: AbstractNode, nodeB: AbstractNode): number {
    return (nodeA.position.distance(nodeB.position) - 100) / (0 - 100)
  }
}
