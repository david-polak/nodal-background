import { AbstractNode } from "../nodes/AbstractNode"

export abstract class AbstractTicker {
  abstract tickBoth(
    tDelta: number,
    nodeA: AbstractNode,
    nodeB: AbstractNode
  ): number
  abstract tickSingle(tDelta: number, node: AbstractNode): void
}
