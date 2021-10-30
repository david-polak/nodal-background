import { AbstractNode } from "../nodes/AbstractNode"

export abstract class AbstractTicker {
  max_distance: number
  constructor(max_distance: number) {
    this.max_distance = max_distance
  }

  abstract tickBoth(
    tDelta: number,
    nodeA: AbstractNode,
    nodeB: AbstractNode
  ): number
  abstract tickSingle(tDelta: number, node: AbstractNode): void
}
