import { AbstractNode } from "../nodes/AbstractNode"
import { AbstractTicker } from "./AbstractTicker"

export class EulerTicker extends AbstractTicker {
  tickSingle(tDelta: number, node: AbstractNode) {
    // noop
  }

  tickBoth(tDelta: number, nodeA: AbstractNode, nodeB: AbstractNode) {
    // node.position.add(node.velocity.clone().multiplyByFactor(tDelta / 1000))
    return 0
  }
}
