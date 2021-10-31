import { AbstractNode } from "../nodes/AbstractNode"

export type InstantiableAbstractTicker<T extends AbstractTicker> = {
  new (maxDistance: number): T
}

export abstract class AbstractTicker {
  maxDistance: number

  constructor(maxDistance: number) {
    this.maxDistance = maxDistance
  }

  abstract tickBoth(
    tDelta: number,
    nodeA: AbstractNode,
    nodeB: AbstractNode
  ): number | boolean

  abstract tickSingle(tDelta: number, node: AbstractNode): void
}
