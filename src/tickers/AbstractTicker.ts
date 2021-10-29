import { AbstractNode } from "../nodes/AbstractNode"

export abstract class AbstractTicker {
  abstract tick(tDelta: number, nodeA: AbstractNode, nodeB: AbstractNode): void
}
