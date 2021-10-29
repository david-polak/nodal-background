import { AbstractNode } from "../nodes/AbstractNode"

export abstract class AbstractLinker {
  context: CanvasRenderingContext2D

  constructor(context: CanvasRenderingContext2D) {
    this.context = context
  }

  abstract renderLink(
    factor: number,
    nodeA: AbstractNode,
    nodeB: AbstractNode
  ): void
}
