import { AbstractNode } from "../nodes/AbstractNode"
import { AbstractTicker } from "./AbstractTicker"

export class BasicTicker extends AbstractTicker {
  tick(tDelta: number, nodeA: AbstractNode, nodeB: AbstractNode) {
    // velocity - "px"/s
    nodeA.position.add(nodeA.velocity.clone().multiplyByFactor(tDelta / 1000))
  }
}
